(() => {
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);
  const SAVE_KEY = "capitalist-spiral-v1";
  const CARD_INTERVAL = 12;      // giây giữa các thẻ (ở tốc độ 1×)
  const FIRST_CARD = 6;
  const MAX_OFFLINE = 8 * 3600;
  const LOAN_PENALTY = 8;        // thiếu m khi chọn phương án tốn m -> vay nóng, z+r giảm thêm
  const MAX_MULT = 2.5;          // trần hệ số gia sản thừa kế

  // ---------- Lưu trữ an toàn ----------
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } },
    set(o) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(o)); } catch {} },
  };

  // ---------- Trạng thái ----------
  let legacy = 0, bestCards = 0, muted = false, musicOff = false;
  let seen = new Set();          // các mục học thuật đã mở
  let endSeen = {};              // kết cục đã đạt: { key: số lần }
  let gen = 0;                   // số đời thừa kế đã bắt đầu
  let S = null;                  // trạng thái ván hiện tại
  let running = false, cardOpen = false, current = null, opts = null, last = 0;
  let speed = 1, paused = false, modalOpen = false;

  // room: { code, seed, id, name } khi chơi theo phòng; cùng hạt giống → cùng thứ tự thẻ và mục tiêu
  function fresh(room) {
    if (!room) gen++;
    const seed = room ? room.seed : 1 + Math.floor(Math.random() * 2147483646);
    const goal = GOALS[Math.floor(Online.rng(seed ^ 0x2545F491)() * GOALS.length)].id;
    return { m: 0, total: 0, meters: { cv: 50, v: 50, zr: 50, td: 50 }, levels: {}, cards: 0, cardTimer: FIRST_CARD, t: 0,
      gen: room ? 1 : gen, heir: room ? "" : HEIRS[(gen - 1) % HEIRS.length], goal, goalState: "", pending: [],
      seed, drawn: 0, room: room || null };
  }
  const goalOf = () => GOALS.find(g => g.id === S.goal);
  const heirName = (s) => s.room ? s.room.name : `${s.heir || HEIRS[0]} ${FAMILY}`;
  const genLabel = (s) => s.room ? `Phòng ${s.room.code} · ${s.room.name}` : `Đời thứ ${s.gen || 1} · ${heirName(s)}`;
  // Mục tiêu của đời này: kiểm tra mỗi khung hình, chốt khi đạt hoặc trượt
  function checkGoal() {
    const g = goalOf();
    if (!g || S.goalState) return;
    if (g.check(S, mult())) {
      S.goalState = "done";
      sfx.good();
      showNote(`Đạt mục tiêu đời ${S.gen}: ${g.text}. ${g.hint}. Gia sản thừa kế +2 khi kết thúc ván.`);
    } else if (g.fail && g.fail(S)) S.goalState = "fail";
  }
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  // Chơi theo phòng: bỏ qua gia sản thừa kế để mọi người xuất phát như nhau
  const mult = () => S && S.room ? 1 : Math.min(MAX_MULT, 1 + 0.1 * legacy);
  const incomeBonus = () => UPGRADES.reduce((a, u) => a + (S.levels[u.id] || 0) * u.income, 0);

  // Năng suất theo c/v: tăng đến ~70 rồi giảm (máy thừa, thiếu lao động sống)
  const productivity = (cv) => { cv = clamp(cv, 0, 100); return Math.max(0.2, 0.5 + cv / 50 - Math.max(0, cv - 70) ** 2 / 450); };
  // Hệ số bóc lột theo v: lương càng cao, phần thặng dư càng mỏng; v = 100 -> 0
  const wageFactor = (v) => { v = clamp(v, 0, 100); return clamp(1.5 * (100 - v) / (v + 25), 0, 2.5); };
  // Tỷ suất giá trị thặng dư hiển thị m' = m/v (v = 50 -> 100%)
  const exploitation = (v) => { v = clamp(v, 0, 100); return v <= 0 ? Infinity : 100 * (100 - v) / v; };
  function rate() {
    return 2 * productivity(S.meters.cv) * wageFactor(S.meters.v) * (1 + incomeBonus()) * mult();
  }
  const cost = (u) => Math.ceil(u.base * Math.pow(u.grow, S.levels[u.id] || 0));
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e4 ? (n / 1e3).toFixed(1) + "k" : Math.floor(n).toString();
  const sgn = (n) => (n > 0 ? "+" : "−") + Math.abs(n);

  function save() {
    store.set({ legacy, bestCards, muted, musicOff, gen, seen: [...seen], endSeen, lastSeen: Date.now(), S: running ? S : null });
  }

  // ---------- Âm thanh hiệu ứng (WebAudio) ----------
  let ac = null;
  function beep(freq, dur = 0.08, type = "square", vol = 0.05, slide = 0) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = freq;
      if (slide) o.frequency.linearRampToValueAtTime(freq + slide, ac.currentTime + dur);
      g.gain.value = vol; g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
      o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + dur);
    } catch {}
  }
  const sfx = {
    buy: () => { beep(660, .06, "triangle"); setTimeout(() => beep(990, .08, "triangle"), 60); },
    hammer: () => beep(120, .15, "sawtooth", .09, -60),
    bad: () => beep(90, .5, "sawtooth", .08, -40),
    good: () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, .15, "triangle"), i * 110)),
    learn: () => { beep(1318, .12, "sine", .04); setTimeout(() => beep(1760, .18, "sine", .04), 90); },
  };

  // ---------- Giao diện chỉ số ----------
  function buildMeters() {
    $("meters").innerHTML = Object.entries(METERS).map(([k, m]) =>
      `<div class="meter" id="mt-${k}" style="--c:${m.color}"><div class="name"><span class="badge">${m.icon}</span><span class="nm">${m.name}</span><b class="num" id="mv-${k}">50</b></div>
       <div class="bar"><div class="fill" id="mf-${k}"></div></div><div class="delta" id="md-${k}"></div></div>`).join("");
  }
  function buildShop() {
    $("shop").innerHTML = UPGRADES.map(u =>
      `<button class="up" id="up-${u.id}" style="--c:${METERS[u.meter].color}"><div class="ib">${METERS[u.meter].icon}</div>
       <div class="t">${u.name}</div><div class="d">${u.desc}</div>
       <div class="tags"><span class="price" id="uc-${u.id}"></span><span class="lvl" id="ul-${u.id}"></span></div>
       <div class="th">${u.theory}</div></button>`).join("");
    UPGRADES.forEach(u => $("up-" + u.id).onclick = () => buy(u));
  }
  function refreshMeters() {
    let danger = false;
    for (const k in METERS) {
      const v = S.meters[k], d = v <= 12 || v >= 88;
      danger = danger || v <= 15 || v >= 85;
      $("mf-" + k).style.width = clamp(v, 0, 100) + "%";
      $("mv-" + k).textContent = Math.round(clamp(v, 0, 100));
      $("mt-" + k).classList.toggle("danger", d);
    }
    Scene.render(S.meters.cv, S.meters.v);
    Factory.setState(S.meters.cv, S.meters.v);
    Music.setTension(danger);
  }
  function refreshTop() {
    $("m-val").textContent = fmt(S.m);
    const r = rate(), ex = exploitation(S.meters.v);
    $("m-rate").textContent = r.toFixed(1);
    $("st-rate").classList.toggle("low", wageFactor(S.meters.v) < 0.45);
    $("m-ex").textContent = ex > 999 ? ">999%" : Math.round(ex) + "%";
    $("st-ex").classList.toggle("hot", ex >= 250);
    $("st-ex").classList.toggle("low", ex <= 45);
    $("card-count").textContent = S.cards;
    $("year").textContent = "· năm " + (START_YEAR + S.cards);
    const g = goalOf();
    $("gen-lbl").textContent = genLabel(S);
    $("goal-txt").textContent = g ? (S.goalState === "done" ? "✓ " : S.goalState === "fail" ? "✗ " : "◎ ") + g.text : "";
    $("goal-txt").title = g ? `Mục tiêu đời này (thưởng +2 gia sản): ${g.hint}` : "";
    $("st-goal").className = "stat goal " + (S.goalState || "");
    // Ngày lao động 12 giờ: phần cần thiết tỷ lệ với v, còn lại là thặng dư (m' = thặng dư / cần thiết)
    const nec = 12 * clamp(S.meters.v, 0, 100) / 100, h = (x) => (Math.round(x * 2) / 2).toString().replace(".", ",") + "h";
    $("m-day").innerHTML = `<i style="width:${100 * nec / 12}%"></i>`;
    $("m-day").title = `Ngày lao động 12h: ${h(nec)} cần thiết (v) · ${h(12 - nec)} thặng dư (m)`;
    $("m-day-t").textContent = `${h(nec)} cần thiết · ${h(12 - nec)} thặng dư`;
    UPGRADES.forEach(u => {
      const c = cost(u), b = $("up-" + u.id), ok = S.m >= c;
      $("uc-" + u.id).textContent = ok ? `Giá ${fmt(c)} m` : `Giá ${fmt(c)} m · thiếu ${fmt(c - S.m)}`;
      $("uc-" + u.id).classList.toggle("short", !ok);
      $("ul-" + u.id).textContent = `Cấp ${S.levels[u.id] || 0}`;
      b.disabled = !ok || cardOpen;
    });
    const tLeft = Math.max(0, Math.ceil(S.cardTimer));
    $("card-timer-fill").style.width = cardOpen ? "100%" : Math.min(100, 100 * (1 - S.cardTimer / (S.cards ? CARD_INTERVAL : FIRST_CARD))) + "%";
    $("card-timer-txt").textContent = cardOpen ? "Đang diễn ra" : paused ? `Tạm dừng · còn ${tLeft}s` : `Còn ${tLeft}s`;
    $("timer-row").classList.toggle("soon", !cardOpen && !paused && S.cardTimer <= 3);
    $("pause-banner").classList.toggle("hidden", !(paused && !cardOpen));
    document.body.classList.toggle("card-open", cardOpen && running);
  }

  function floatText(text, color) {
    const el = document.createElement("div");
    el.className = "float"; el.textContent = text; el.style.color = color;
    el.style.left = (20 + Math.random() * 60) + "%"; el.style.top = (35 + Math.random() * 15) + "%";
    $("float-layer").appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }

  // ---------- Sổ tay học thuật ----------
  const ALL_CARDS = CARDS.concat(FOLLOWUPS);
  const TOTAL_NOTES = ALL_CARDS.length * 2 + UPGRADES.length;
  function learn(id) {
    if (seen.has(id)) return false;
    seen.add(id); updateCounts(); return true;
  }
  function updateCounts() {
    $$('[data-cnt="codex"]').forEach(e => e.textContent = `${seen.size}/${TOTAL_NOTES}`);
    $$('[data-cnt="endings"]').forEach(e => e.textContent = `${Object.keys(endSeen).length}/${ENDING_ORDER.length}`);
  }

  // ---------- Hành động ----------
  function buy(u) {
    if (cardOpen || !running) return;
    const c = cost(u);
    if (S.m < c) return;
    S.m -= c;
    S.levels[u.id] = (S.levels[u.id] || 0) + 1;
    S.meters[u.meter] += u.amt;
    sfx.buy();
    floatText(`${METERS[u.meter].short} +${u.amt}`, METERS[u.meter].color);
    if (learn("u-" + u.id)) showNote(`${u.theory}. ${u.more}`, true);
    checkGoal();
    refreshMeters(); refreshTop();
    checkEnd();
  }

  function applyFx(fx) {
    for (const k in fx) {
      S.meters[k] += fx[k];
      floatText(`${METERS[k].short} ${sgn(fx[k])}`, METERS[k].color);
    }
  }

  function checkEnd() {
    if (!running) return;
    const M = S.meters;
    for (const k of ["v", "cv", "zr", "td"]) {
      if (M[k] <= 0) return endGame(k + "-low");
      if (M[k] >= 100) return endGame(k + "-high");
    }
    if (S.cards >= WIN_CARDS && !cardOpen) return endGame("win");
  }

  // ---------- Thẻ tình huống ----------
  // Tính trước hậu quả cụ thể của một phương án (số m theo thu nhập hiện tại, vay nóng nếu thiếu)
  function prep(o) {
    const fx = { ...o.fx };
    let m = 0, loan = false;
    if (o.m) {
      m = Math.round(o.m * Math.max(1, rate()));
      if (m < 0 && S.m < -m) { loan = true; fx.zr = (fx.zr || 0) - LOAN_PENALTY; }
    }
    return { ...o, fx, m, loan };
  }
  function chips(o) {
    let h = Object.entries(o.fx).map(([k, d]) =>
      `<span class="chip ${d > 0 ? "pos" : "neg"}" style="--c:${METERS[k].color}">${METERS[k].short} ${sgn(d)}</span>`).join("");
    if (o.m) h += `<span class="chip money ${o.m > 0 ? "pos" : "neg"}">${o.m > 0 ? "+" : "−"}${fmt(Math.abs(o.m))} m</span>`;
    if (o.loan) h += `<span class="chip warn" title="Không đủ m: trả hết số đang có, phần thiếu vay nóng ngân hàng">thiếu m → vay nóng</span>`;
    if (o.later) h += `<span class="chip later" title="Lựa chọn này sẽ quay lại sau vài tình huống">⏳ có hệ quả về sau</span>`;
    return h;
  }
  const hintText = (o) => Object.entries(o.fx).map(([k, d]) => `${METERS[k].short} ${sgn(d)}`).join(" · ");

  // Thẻ hệ quả đến hạn được ưu tiên; nó thay cho thẻ thường nên ván không dài thêm
  const laterFor = (id, side) => FOLLOWUPS.some(f => f.from[0] === id && f.from[1] === side);
  // Thứ tự thẻ suy ra từ hạt giống: mỗi vòng 13 thẻ xáo lại, không lặp thẻ ở chỗ nối hai vòng
  function cycleOrder(cyc) {
    const r = Online.rng(S.seed + cyc * 7919), a = CARDS.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (cyc > 0) { const prev = cycleOrder(cyc - 1); if (a[0].id === prev[prev.length - 1].id) [a[0], a[a.length - 1]] = [a[a.length - 1], a[0]]; }
    return a;
  }
  function drawCard() {
    const i = S.drawn || 0, n = CARDS.length;
    S.drawn = i + 1;
    return cycleOrder(Math.floor(i / n))[i % n];
  }
  function nextCard() {
    S.pending = S.pending || [];
    const due = S.pending.findIndex(p => p.at <= S.cards);
    if (due >= 0) {
      current = FOLLOWUPS.find(f => f.id === S.pending[due].id);
      S.pending.splice(due, 1);
    } else {
      current = drawCard();
    }
    const fu = current.from;
    opts = { left: { ...prep(current.left), later: !fu && laterFor(current.id, "L") },
             right: { ...prep(current.right), later: !fu && laterFor(current.id, "R") } };
    cardOpen = true;
    $("card-portrait").innerHTML = portrait(current.pic || current.id);
    $("card-tag").textContent = fu ? "Hệ quả: " + CARDS.find(c => c.id === fu[0]).topic : "";
    $("card").classList.toggle("followup", !!fu);
    $("card-who").textContent = current.who;
    $("card-text").textContent = current.text;
    $("lbl-l").innerHTML = `<div class="ol"><b>A</b> ${current.left.label}</div><div class="chips">${chips(opts.left)}</div>`;
    $("lbl-r").innerHTML = `<div class="ol"><b>B</b> ${current.right.label}</div><div class="chips">${chips(opts.right)}</div>`;
    $("card-hint-l").textContent = "← " + hintText(opts.left);
    $("card-hint-r").textContent = hintText(opts.right) + " →";
    $("card-overlay").classList.remove("hidden");
    $("note-toast").classList.add("hidden");   // ô học thuật đã lưu trong Sổ tay, không che nhãn phương án
    resetCard(true);
    refreshTop();
    layoutCard();
  }

  // Thẻ chỉ chiếm phần màn hình phía trên 4 chỉ số, để vẫn thấy chỉ số thay đổi khi kéo thẻ
  function layoutCard() {
    const top = $("meters").getBoundingClientRect().top, ov = $("card-overlay");
    const fits = top >= 320 && innerWidth > 640; // điện thoại / màn hình thấp: thẻ phủ toàn màn hình như cũ
    document.body.classList.toggle("card-above", fits);
    ov.style.setProperty("--avail", fits ? top - 8 + "px" : "100vh");
    ov.style.setProperty("--below", fits ? innerHeight - top + 12 + "px" : "12px");
  }
  addEventListener("resize", () => { if (cardOpen) layoutCard(); });

  // Khi kéo thẻ: hiện số thay đổi ngay trên từng chỉ số
  function setDots(fx) {
    for (const k in METERS) {
      const el = $("md-" + k), d = fx && fx[k];
      el.classList.toggle("show", !!d);
      el.classList.toggle("neg", d < 0);
      if (d) el.textContent = sgn(d);
    }
  }
  function focusOpt(side) {
    $("lbl-l").classList.toggle("focus", side === "left");
    $("lbl-r").classList.toggle("focus", side === "right");
    setDots(side ? opts[side].fx : null);
  }

  function resetCard(instant) {
    const c = $("card");
    c.classList.toggle("drag", !!instant);
    c.style.transform = "";
    c.querySelector(".stamp.left").style.opacity = 0;
    c.querySelector(".stamp.right").style.opacity = 0;
    focusOpt(null);
  }

  function choose(side) {
    if (!cardOpen || modalOpen) return;
    const opt = opts[side];
    const c = $("card");
    c.classList.remove("drag");
    c.style.transform = `translateX(${side === "left" ? -140 : 140}vw) rotate(${side === "left" ? -35 : 35}deg)`;
    sfx.hammer();
    const sd = side === "left" ? "L" : "R", noteId = `c${current.id}${sd}`;
    // Hẹn thẻ hệ quả sau 2–4 tình huống (không quá tình huống cuối)
    for (const f of FOLLOWUPS) if (f.from[0] === current.id && f.from[1] === sd && !S.pending.some(p => p.id === f.id))
      S.pending.push({ id: f.id, at: Math.min(WIN_CARDS - 1, S.cards + 3 + Math.floor(Online.rng(S.seed + f.id * 131)() * 3)) });
    setTimeout(() => {
      cardOpen = false;
      $("card-overlay").classList.add("hidden");
      focusOpt(null);
      applyFx(opt.fx);
      if (opt.m) {
        if (opt.m > 0) { S.m += opt.m; S.total += opt.m; }
        else S.m = Math.max(0, S.m + opt.m);
        floatText(`${opt.m > 0 ? "+" : "−"}${fmt(Math.abs(opt.m))} m`, "#b08d3c");
      }
      S.cards++;
      S.cardTimer = CARD_INTERVAL;
      const isNew = learn(noteId);
      showNote((opt.loan ? "Không đủ m, bạn phải vay nóng (z+r −" + LOAN_PENALTY + "). " : "") + opt.note, isNew);
      checkGoal();
      refreshMeters(); refreshTop();
      const hit = Object.values(S.meters).some(v => v <= 0 || v >= 100);
      if (hit) document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 500);
      checkEnd();
    }, 260);
  }

  let noteT = null;
  function showNote(text, isNew) {
    const n = $("note-toast");
    n.innerHTML = `<button class="nt-x" title="Đóng" aria-label="Đóng">×</button><span class="nt-h">Học thuật${isNew ? ' <em>Mới · đã lưu vào Sổ tay</em>' : ""}</span>`;
    n.appendChild(document.createTextNode(text));
    n.classList.remove("hidden");
    if (isNew) sfx.learn();
    clearTimeout(noteT);
    noteT = setTimeout(() => n.classList.add("hidden"), 9000);
  }
  $("note-toast").onclick = () => $("note-toast").classList.add("hidden");

  // Kéo thẻ bằng chuột/cảm ứng
  (function setupDrag() {
    const card = $("card"), area = $("card-area");
    let sx = 0, dx = 0, dragging = false;
    area.addEventListener("pointerdown", e => {
      if (!cardOpen) return;
      dragging = true; sx = e.clientX; dx = 0;
      card.classList.add("drag");
      area.setPointerCapture(e.pointerId);
    });
    area.addEventListener("pointermove", e => {
      if (!dragging) return;
      dx = e.clientX - sx;
      card.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`;
      const p = Math.min(1, Math.abs(dx) / 100);
      card.querySelector(".stamp.left").style.opacity = dx < 0 ? p : 0;
      card.querySelector(".stamp.right").style.opacity = dx > 0 ? p : 0;
      focusOpt(Math.abs(dx) > 25 ? (dx < 0 ? "left" : "right") : null);
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(dx) > 100) choose(dx < 0 ? "left" : "right");
      else { card.classList.remove("drag"); resetCard(false); }
    };
    area.addEventListener("pointerup", end);
    area.addEventListener("pointercancel", end);
  })();
  $("btn-left").onclick = () => choose("left");
  $("btn-right").onclick = () => choose("right");
  // Rê chuột vào nút/nhãn cũng xem trước được thay đổi
  [["btn-left", "left"], ["lbl-l", "left"], ["btn-right", "right"], ["lbl-r", "right"]].forEach(([id, side]) => {
    $(id).addEventListener("mouseenter", () => cardOpen && focusOpt(side));
    $(id).addEventListener("mouseleave", () => cardOpen && focusOpt(null));
  });
  $("lbl-l").onclick = () => choose("left");
  $("lbl-r").onclick = () => choose("right");

  // ---------- Tốc độ ----------
  function setSpeed(s) {
    if (s === 0) paused = true;
    else { paused = false; speed = s; }
    $$("#speed button").forEach(b => b.classList.toggle("on", paused ? b.dataset.s === "0" : +b.dataset.s === speed));
    syncMusic();
    if (S) refreshTop();
  }
  $$("#speed button").forEach(b => b.onclick = () => setSpeed(+b.dataset.s));
  function callNext() {
    if (!running || cardOpen || modalOpen) return;
    if (S.cards >= WIN_CARDS) return checkEnd();
    nextCard();
  }
  $("btn-next").onclick = callNext;
  function syncMusic() {
    Music.setDuck((paused && running) || modalOpen);
    Music.setTempo(1 + 0.1 * (speed - 1));
  }

  document.addEventListener("keydown", e => {
    if (e.target.closest && e.target.closest("input, textarea")) return; // đang gõ PIN / tên
    if (modalOpen) { if (e.key === "Escape") closeModal(); return; }
    const k = e.key.toLowerCase();
    if (e.key === "ArrowLeft" || k === "a") choose("left");
    else if (e.key === "ArrowRight" || k === "d") choose("right");
    else if (k === "m") toggleMusic();
    else if (e.key === "Escape" && running) $("btn-quit").click();  // Esc = Thoát (có hỏi xác nhận)
    else if (!running || cardOpen) return;
    else if (e.key === " ") { e.preventDefault(); setSpeed(paused ? speed : 0); }
    else if (k === "1" || k === "2" || k === "3") setSpeed(+k);
    else if (k === "n") callNext();
  });

  // ---------- Vòng lặp ----------
  function tick(now) {
    requestAnimationFrame(tick);
    if (!running) { last = now; return; }
    let dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    if (cardOpen || modalOpen || paused) return;
    dt *= speed;

    S.t += dt;
    const g = rate() * dt;
    S.m += g; S.total += g;

    // Sức hao mòn theo thời gian: buộc người chơi phải chi thặng dư
    const M = S.meters;
    M.cv -= 0.16 * dt;
    M.v  -= 0.12 * dt;
    M.zr -= 0.20 * dt;
    M.td -= 0.10 * dt;

    S.cardTimer -= dt;
    if (S.cardTimer <= 0) {
      if (S.cards >= WIN_CARDS) { checkEnd(); return; }
      nextCard();
    }
    checkGoal();
    refreshMeters(); refreshTop();
    checkEnd();
  }

  setInterval(() => { if (running) save(); }, 5000);
  window.addEventListener("beforeunload", save);

  // ---------- Cửa sổ: Sổ tay & Kết cục ----------
  function openModal(kind) {
    modalOpen = true;
    syncMusic();
    $("modal").classList.remove("hidden");
    $("modal-body").scrollTop = 0;
    if (kind === "codex") renderCodex(); else renderEndings();
  }
  function closeModal() {
    modalOpen = false;
    $("modal").classList.add("hidden");
    syncMusic();
  }
  $("modal-x").onclick = closeModal;
  $("modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  $$("[data-open]").forEach(b => b.onclick = () => openModal(b.dataset.open));

  function renderCodex() {
    $("modal-eyebrow").textContent = `Đã mở ${seen.size}/${TOTAL_NOTES} mục`;
    $("modal-title").textContent = "Sổ tay học thuật";
    const optRow = (c, side) => {
      const o = c[side === "L" ? "left" : "right"], got = seen.has(`c${c.id}${side}`);
      return got
        ? `<div class="cx-opt"><span class="tag ${side}">${side === "L" ? "A" : "B"}</span><div><i>“${o.label}”</i><p>${o.note}</p></div></div>`
        : `<div class="cx-opt locked"><span class="tag ${side}">${side === "L" ? "A" : "B"}</span><div><p>Chưa mở: hãy chọn phương án ${side === "L" ? "A" : "B"} khi gặp tình huống này.</p></div></div>`;
    };
    let h = `<details class="cx formula" open><summary><b>Cơ chế trong game</b><small>Vì sao chỉ số ảnh hưởng thặng dư</small></summary>
      <p><b>Thu nhập m/s</b> = năng suất (theo c/v) × mức bóc lột (theo v) × nâng cấp máy × gia sản thừa kế.</p>
      <ul>
        <li>Ngày lao động 12 giờ chia thành <b>thời gian cần thiết</b> (tỷ lệ với v) và <b>thời gian thặng dư</b>. Ở v = 50: 6h + 6h, <b>m' = m/v = 100%</b>.</li>
        <li><b>v thấp</b> → thời gian cần thiết bị ép ngắn, m' cao, thặng dư chảy về nhanh, nhưng SLĐ không được tái sản xuất (v = 0: cách mạng).</li>
        <li><b>v cao</b> → tiền công chiếm gần hết giá trị mới v + m, m' giảm, thu nhập co lại; v = 100 thì m = 0.</li>
        <li><b>c/v</b> tăng năng suất (GTTD tương đối) đến khoảng 70; cao hơn nữa thì thừa máy, thiếu lao động sống, p' = m/(c+v) giảm.</li>
        <li>Phương án <b>tốn m</b> mà không đủ tiền: trả hết số đang có, phần thiếu vay nóng (z+r −${LOAN_PENALTY}).</li>
      </ul></details>
      <h4>Tóm tắt bài giảng Chương 3</h4>
      ${LECTURE.map(x => `<details class="cx lec"><summary><b>${x.t}</b></summary><p class="cx-more">${x.d}</p></details>`).join("")}
      <h4>Tình huống</h4>`;
    const cardRow = (c) => {
      const met = seen.has(`c${c.id}L`) || seen.has(`c${c.id}R`);
      if (c.from && !met) {
        const p = CARDS.find(x => x.id === c.from[0]);
        return `<details class="cx dim"><summary><b>Hệ quả ẩn</b><small>Chọn phương án ${c.from[1] === "L" ? "A" : "B"} ở “${p.topic}” để gặp</small></summary></details>`;
      }
      return `<details class="cx${met ? "" : " dim"}${c.from ? " fu" : ""}"><summary><b>${c.topic}</b><small>${c.who}</small></summary>
        ${optRow(c, "L")}${optRow(c, "R")}
        ${met ? `<p class="cx-more">${c.more}</p>` : ""}</details>`;
    };
    h += CARDS.map(cardRow).join("") + `<h4>Hệ quả về sau</h4>` + FOLLOWUPS.map(cardRow).join("");
    h += `<h4>Nâng cấp</h4>`;
    for (const u of UPGRADES) {
      const got = seen.has("u-" + u.id);
      h += `<details class="cx${got ? "" : " dim"}"><summary><b>${u.name}</b><small>${got ? u.theory : "Mua nâng cấp này để mở"}</small></summary>
        ${got ? `<p class="cx-more">${u.more}</p>` : ""}</details>`;
    }
    $("modal-body").innerHTML = h;
  }

  function renderEndings() {
    const n = Object.keys(endSeen).length;
    $("modal-eyebrow").textContent = `Đã đạt ${n}/${ENDING_ORDER.length} kết cục`;
    $("modal-title").textContent = "Bộ sưu tập kết cục";
    $("modal-body").innerHTML = `<div class="egrid">` + ENDING_ORDER.map(k => {
      const e = ENDINGS[k], got = endSeen[k];
      return got
        ? `<details class="ecard${e.good ? " good" : ""}" style="--tint:${e.tint}"><summary><span class="eico">${e.icon}</span><b>${e.title}</b><small>${e.cond} · đạt ${got} lần</small></summary>
            <p>${e.text}</p><p class="why">${e.why}</p></details>`
        : `<div class="ecard locked"><span class="eico">${ICON.lock}</span><b>???</b><small>Điều kiện: ${e.cond}</small></div>`;
    }).join("") + `</div>`;
  }

  // ---------- Màn hình ----------
  function show(id) {
    $$(".screen").forEach(s => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  function startGame(resume, room) {
    if (!resume) S = fresh(room);
    running = true; cardOpen = false; current = null;
    $("card-overlay").classList.add("hidden");
    show("screen-play");
    buildMeters(); buildShop();
    setSpeed(1);
    refreshMeters(); refreshTop();
    sfx.buy();
    Factory.setMuted(muted);
    Factory.start();
    Music.setMood("normal");
    startMusic();
  }

  function coinRain() {
    const box = document.createElement("div");
    box.className = "coin-rain";
    for (let i = 0; i < 26; i++) {
      const c = document.createElement("i");
      c.style.left = Math.random() * 100 + "%";
      c.style.animationDelay = (Math.random() * 2.5).toFixed(2) + "s";
      c.style.animationDuration = (2.5 + Math.random() * 2).toFixed(2) + "s";
      box.appendChild(c);
    }
    $("screen-end").prepend(box);
  }

  function endGame(key) {
    running = false; cardOpen = false; paused = false;
    $("card-overlay").classList.add("hidden");
    $("note-toast").classList.add("hidden");
    Factory.stop();
    const e = ENDINGS[key];
    const isNew = !endSeen[key];
    endSeen[key] = (endSeen[key] || 0) + 1;
    // Thua chỉ để lại ít gia sản; thắng mới tích lũy đáng kể
    const room = S.room;
    const goalBonus = S.goalState === "done" ? 2 : 0, g = goalOf();
    const gain = room ? 0 : (e.good ? 5 + Math.floor(Math.sqrt(S.total / 200)) : 1) + goalBonus;
    legacy += gain;
    if (!room) bestCards = Math.max(bestCards, S.cards);

    const scr = $("screen-end");
    scr.querySelectorAll(".coin-rain").forEach(x => x.remove());
    scr.classList.toggle("win", !!e.good);
    scr.style.setProperty("--tint", e.tint);
    if (e.good) coinRain();
    $("end-emoji").innerHTML = e.icon;
    $("end-title").innerHTML = e.title + (isNew ? ' <span class="new-badge">Kết cục mới!</span>' : "");
    $("end-text").textContent = e.text;
    $("end-why").innerHTML = `<b>${e.good ? "Mặt trái" : "Vì sao?"}</b> ${e.why}`;
    const M = S.meters;
    $("end-final").innerHTML = Object.keys(METERS).map(k => {
      const v = Math.round(clamp(M[k], 0, 100)), hit = v <= 0 || v >= 100;
      return `<span class="fm${hit ? " hit" : ""}" style="--c:${METERS[k].color}">${METERS[k].short} <b>${v}</b></span>`;
    }).join("") + `<span class="fm" style="--c:#b08d3c">m' <b>${(() => { const x = exploitation(M.v); return x > 999 ? ">999" : Math.round(x); })()}%</b></span>`;
    $("end-gen").textContent = genLabel(S);
    $("end-stats").innerHTML = room
      ? `Thặng dư tích lũy: <b>${fmt(S.total)} m</b> · Tình huống đã qua: <b>${S.cards}/${WIN_CARDS}</b>`
      : (g ? `Mục tiêu đời này: <b>${g.text}</b> ${goalBonus ? "✓ đạt (+2 gia sản)" : "✗ chưa đạt"}<br>` : "") + `Thặng dư tích lũy: <b>${fmt(S.total)} m</b> · Tình huống đã qua: <b>${S.cards}/${WIN_CARDS}</b><br>
      Gia sản thừa kế +${gain} → tổng ${legacy} (thu nhập ×${mult().toFixed(2)}${mult() >= MAX_MULT ? ", đã tối đa" : ""})<br>
      Kết cục đã mở: <b>${Object.keys(endSeen).length}/${ENDING_ORDER.length}</b>`;
    $("end-room").classList.toggle("hidden", !room);
    $("btn-restart").classList.toggle("hidden", !!room);
    $("btn-home").classList.toggle("hidden", !room);
    if (room) finishRoom(room, { status: "done", cards: S.cards, total: S.total, ending: key, won: !!e.good });
    show("screen-end");
    (e.good ? sfx.good : sfx.bad)();
    Music.setMood(e.good ? "win" : "sad");
    Music.setTension(false);
    syncMusic();
    updateCounts();
    S = null;
    updateStart();
    save();
  }

  // Bắt đầu ván mới khi còn ván dở: hỏi trước, ván phòng thì rút tên khỏi bảng xếp hạng
  function discardSaved() {
    if (!S || running) return true;
    if (!confirm("Bạn còn một ván đang chơi dở. Bỏ ván đó để bắt đầu ván mới?")) return false;
    if (S.room) Online.leave(S.room.id).catch(() => {});
    S = null; offlineGain = 0; save(); updateStart();
    return true;
  }
  $("btn-start").onclick = () => { if (discardSaved()) startGame(false); };
  $("btn-restart").onclick = () => { updateStart(); startGame(false); };

  // ---------- Bật/tắt âm thanh ----------
  function labels() {
    $$('[data-toggle="music"]').forEach(b => { b.textContent = musicOff ? "Nhạc: Tắt" : "Nhạc: Bật"; b.classList.toggle("off", musicOff); });
    $$('[data-toggle="sfx"]').forEach(b => { b.textContent = muted ? "Âm thanh: Tắt" : "Âm thanh: Bật"; b.classList.toggle("off", muted); });
  }
  function startMusic() { Music.setMuted(musicOff); Music.start(); }
  function toggleMusic() { musicOff = !musicOff; startMusic(); labels(); save(); }
  $$('[data-toggle="music"]').forEach(b => b.onclick = toggleMusic);
  $$('[data-toggle="sfx"]').forEach(b => b.onclick = () => { muted = !muted; Factory.setMuted(muted); labels(); save(); });
  $("start-crest").innerHTML = ICON.gear;

  function updateStart() {
    $("legacy-note").textContent = (gen ? `Người kế vị: đời thứ ${gen + 1}, ${HEIRS[gen % HEIRS.length]} ${FAMILY}` : `Gia tộc ${FAMILY} · đời thứ 1`) +
      (legacy ? ` · Gia sản thừa kế ${legacy} (thu nhập ×${mult().toFixed(2)}) · kỷ lục ${bestCards}/${WIN_CARDS} tình huống` : "");
    $("btn-restart").textContent = `Đời thứ ${gen + 1}: thừa kế & chơi lại`;
    const canResume = !!S && !running;
    $("btn-resume").classList.toggle("hidden", !canResume);
    if (canResume) $("btn-resume").textContent = `Tiếp tục ván đang chơi · ${S.room ? "Phòng " + S.room.code : "Đời thứ " + (S.gen || 1)} · ${S.cards}/${WIN_CARDS}`;
  }

  // ---------- Chơi theo phòng ----------
  let pollTimer = null;
  const stopPoll = () => { clearInterval(pollTimer); pollTimer = null; };
  function poll(fn, ms) { stopPoll(); fn(); pollTimer = setInterval(fn, ms); }
  const roomUrl = () => location.origin + location.pathname;

  // Gửi tiến độ đang chơi để bảng xếp hạng cập nhật trực tiếp
  setInterval(() => {
    if (running && S && S.room) Online.update(S.room.id, { status: "playing", cards: S.cards, total: S.total }).catch(() => {});
  }, 3000);

  async function finishRoom(room, result) {
    for (let i = 0; i < 5; i++) {
      try { await Online.update(room.id, result); break; }
      catch { await new Promise(r => setTimeout(r, 1500 * (i + 1))); }
    }
    $("end-rank").textContent = "Đang tải bảng xếp hạng…";
    poll(async () => {
      if (!$("screen-end").classList.contains("active")) return stopPoll();
      try {
        const rows = await Online.list(room.code), r = Online.rank(rows), i = r.findIndex(p => p.id === room.id);
        const waiting = rows.filter(p => p.status !== "done").length;
        $("end-rank").innerHTML = `Phòng ${room.code} · Hạng của bạn: <b>#${i + 1}</b> / ${rows.length}` +
          (waiting ? ` <small>(${waiting} người còn đang chơi)</small>` : "");
        $("end-board").innerHTML = Online.board(rows, room.id, 10);
      } catch { $("end-rank").textContent = "Không tải được bảng xếp hạng, đang thử lại…"; }
    }, 3000);
  }

  function openJoin(pin) {
    stopPoll();
    $("join-err").textContent = "";
    if (pin) $("join-pin").value = pin;
    try { $("join-name").value = $("join-name").value || localStorage.getItem("capitalist-name") || ""; } catch {}
    show("screen-join");
    ($("join-pin").value ? $("join-name") : $("join-pin")).focus();
  }
  $("join-form").onsubmit = async (ev) => {
    ev.preventDefault();
    const pin = $("join-pin").value.trim(), name = $("join-name").value.trim().replace(/\s+/g, " ");
    const err = (t) => { $("join-err").textContent = t; $("join-go").disabled = false; };
    if (!/^\d{6}$/.test(pin)) return err("Mã PIN gồm 6 chữ số.");
    if (!name) return err("Hãy nhập tên.");
    if (!discardSaved()) return;
    $("join-go").disabled = true; $("join-err").textContent = "Đang vào phòng…";
    try {
      const room = await Online.getRoom(pin);
      if (!room) return err("Không tìm thấy phòng với mã này.");
      const p = await Online.join(pin, name);
      try { localStorage.setItem("capitalist-name", name); } catch {}
      $("join-go").disabled = false; $("join-err").textContent = "";
      history.replaceState(null, "", roomUrl());
      const me = { code: pin, seed: room.seed, id: p.id, name };
      if (room.started_at) startGame(false, me); // vào muộn: phòng đã bắt đầu thì chơi luôn
      else enterLobby(me);
    } catch (e) {
      err(e.status === 409 ? "Tên này đã có người dùng trong phòng, hãy chọn tên khác." : "Không kết nối được máy chủ. Thử lại sau.");
    }
  };

  // ---------- Phòng chờ của người chơi ----------
  const LOBBY_KEY = "capitalist-lobby";
  const lobbySet = (o) => { try { o ? localStorage.setItem(LOBBY_KEY, JSON.stringify(o)) : localStorage.removeItem(LOBBY_KEY); } catch {} };
  const lobbyGet = () => { try { return JSON.parse(localStorage.getItem(LOBBY_KEY)); } catch { return null; } };
  let lobbyRoom = null;
  function leaveLobby(msg) {
    stopPoll(); lobbySet(null); lobbyRoom = null;
    if (msg) alert(msg);
    updateStart(); show("screen-start");
  }
  function enterLobby(me) {
    lobbyRoom = me; lobbySet(me);
    $("lobby-pin").textContent = me.code;
    $("lobby-name").textContent = me.name;
    $("lobby-names").innerHTML = `<span class="me">${Online.esc(me.name)}</span>`;
    show("screen-lobby");
    poll(async () => {
      if (!$("screen-lobby").classList.contains("active")) return stopPoll();
      try {
        const r = await Online.getRoom(me.code);
        if (!r) return leaveLobby("Phòng đã bị giáo viên xóa.");
        if (r.started_at) { stopPoll(); lobbySet(null); lobbyRoom = null; return startGame(false, me); }
        const rows = await Online.list(me.code);
        if (!rows.some(p => p.id === me.id)) return leaveLobby("Bạn không còn ở trong phòng này.");
        $("lobby-n").textContent = rows.length;
        $("lobby-names").innerHTML = rows.map(p => `<span class="${p.id === me.id ? "me" : ""}">${Online.esc(p.name)}</span>`).join("");
      } catch {}
    }, 2000);
  }
  $("btn-leave").onclick = () => {
    if (lobbyRoom) Online.leave(lobbyRoom.id).catch(() => {});
    leaveLobby();
  };

  let hostCode = null, hostStarted = false;
  async function openHost() {
    stopPoll();
    $("btn-host").disabled = true;
    try {
      const room = await Online.createRoom();
      hostCode = room.code; hostStarted = false;
      $("btn-room-start").disabled = false;
      $("btn-room-start").textContent = "Bắt đầu";
      $("host-pin").textContent = room.code;
      $("host-url").textContent = roomUrl().replace(/^https?:\/\//, "").replace(/index\.html$/, "");
      show("screen-host");
      poll(async () => {
        if (!$("screen-host").classList.contains("active")) return stopPoll();
        try {
          const rows = await Online.list(room.code), done = rows.filter(p => p.status === "done").length;
          $("host-stats").innerHTML = hostStarted
            ? `<b>${rows.length}</b> người chơi · ${rows.length - done} đang chơi · ${done} đã xong`
            : `<b>${rows.length}</b> người đang chờ · bấm <b>Bắt đầu</b> khi mọi người đã vào`;
          $("host-board").innerHTML = Online.board(rows, null, 1000, hostStarted);
        } catch {}
      }, 2000);
    } catch { alert("Không tạo được phòng: không kết nối được máy chủ."); }
    $("btn-host").disabled = false;
  }

  $("btn-room-start").onclick = async () => {
    if (!hostCode || hostStarted) return;
    const b = $("btn-room-start");
    b.disabled = true; b.textContent = "Đang bắt đầu…";
    try {
      await Online.startRoom(hostCode);
      hostStarted = true; b.textContent = "Đã bắt đầu";
      $("host-stats").innerHTML = "Đã bắt đầu, đang tải…";
    } catch (e) {
      b.disabled = false; b.textContent = "Bắt đầu";
      alert(e.status === 403 ? "Chưa có quyền bắt đầu phòng: hãy chạy lại db/supabase.sql trong Supabase." : "Không kết nối được máy chủ. Thử lại.");
    }
  };

  $("btn-close-room").onclick = async () => {
    if (!hostCode || !confirm(`Xóa phòng ${hostCode} và toàn bộ kết quả của phòng? Không thể hoàn tác.`)) return;
    try { await Online.deleteRoom(hostCode); }
    catch { return alert("Không xóa được phòng: không kết nối được máy chủ hoặc chưa cấp quyền xóa (chạy lại db/supabase.sql)."); }
    hostCode = null; stopPoll(); updateStart(); show("screen-start");
  };

  // Bỏ ván đang chơi; chơi theo phòng thì rút tên khỏi bảng xếp hạng
  $("btn-quit").onclick = () => {
    if (!running) return;
    const room = S.room;
    if (!confirm(room ? "Thoát khỏi phòng? Tên của bạn sẽ bị xóa khỏi bảng xếp hạng." : "Bỏ ván này? Tiến độ ván hiện tại sẽ mất.")) return;
    if (room) Online.leave(room.id).catch(() => {});
    running = false; cardOpen = false; paused = false; S = null;
    $("card-overlay").classList.add("hidden");
    $("note-toast").classList.add("hidden");
    Factory.stop();
    Music.setMood("normal"); Music.setTension(false); syncMusic();
    save(); updateStart(); show("screen-start");
  };

  $("btn-join").onclick = () => openJoin();
  $("btn-host").onclick = openHost;
  $$("[data-home]").forEach(b => b.onclick = () => { stopPoll(); updateStart(); show("screen-start"); });
  if (!Online.enabled) $$(".online-only").forEach(e => e.classList.add("hidden"));

  // ---------- Khởi tạo & tiến trình ngoại tuyến ----------
  // Ván đang dở không tự mở lại: màn hình chính hiện nút "Tiếp tục"
  let offlineGain = 0;
  $("btn-resume").onclick = () => {
    if (!S || running) return;
    const gain = offlineGain; offlineGain = 0;
    S.m += gain; S.total += gain;
    startGame(true);
    if (gain > 0) showNote(`Trong lúc vắng mặt, xưởng đã tạo thêm ${fmt(gain)} m.`);
  };
  const saved = store.get();
  if (saved) {
    legacy = saved.legacy || 0; bestCards = saved.bestCards || 0; muted = !!saved.muted; musicOff = !!saved.musicOff;
    seen = new Set(saved.seen || []); endSeen = saved.endSeen || {}; gen = saved.gen || 0;
    if (saved.S) {
      S = saved.S;
      if (!S.gen) { S.gen = gen = gen || 1; S.heir = HEIRS[0]; S.goal = GOALS[0].id; S.goalState = ""; S.pending = []; }
      const off = Math.min(MAX_OFFLINE, (Date.now() - (saved.lastSeen || Date.now())) / 1000);
      if (!S.seed) { S.seed = 1 + Math.floor(Math.random() * 2147483646); S.drawn = 0; }
      offlineGain = off > 5 && !S.room ? rate() * off * 0.5 : 0;
    }
  }
  labels(); updateCounts();
  // Trình duyệt chỉ cho phát âm thanh sau thao tác đầu tiên
  const unlock = () => { startMusic(); if (running) Factory.start(); };
  document.addEventListener("pointerdown", unlock, { once: true });
  document.addEventListener("keydown", unlock, { once: true });

  updateStart();
  const pinParam = new URLSearchParams(location.search).get("room"), lob = lobbyGet();
  if (lob && Online.enabled && !S) enterLobby(lob);          // tải lại trang khi đang ở phòng chờ
  else if (pinParam && Online.enabled && !running) openJoin(pinParam.replace(/\D/g, "").slice(0, 6));
  if (lob && S) lobbySet(null);
  requestAnimationFrame(tick);
})();

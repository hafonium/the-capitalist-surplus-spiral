(() => {
  const $ = (id) => document.getElementById(id);
  const SAVE_KEY = "capitalist-spiral-v1";
  const CARD_INTERVAL = 18;      // giây giữa các thẻ
  const FIRST_CARD = 10;
  const MAX_OFFLINE = 8 * 3600;

  // ---------- Lưu trữ an toàn ----------
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } },
    set(o) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(o)); } catch {} },
  };

  // ---------- Trạng thái ----------
  let legacy = 0, bestCards = 0, muted = false, lastSeen = Date.now();
  let S = null; // trạng thái ván hiện tại
  let running = false, cardOpen = false, current = null, deck = [], last = 0;

  function fresh() {
    return { m: 0, total: 0, meters: { cv: 50, v: 50, zr: 50, td: 50 }, levels: {}, cards: 0, cardTimer: FIRST_CARD, t: 0 };
  }
  const mult = () => 1 + 0.15 * legacy;
  const incomeBonus = () => UPGRADES.reduce((a, u) => a + (S.levels[u.id] || 0) * u.income, 0);
  // Thu nhập: tăng theo c/v và theo mức bóc lột (v thấp -> thu nhập cao ngắn hạn)
  function rate() {
    const k = (0.4 + S.meters.cv / 60) * (1.6 - S.meters.v / 100);
    return 2 * k * (1 + incomeBonus()) * mult();
  }
  const cost = (u) => Math.ceil(u.base * Math.pow(u.grow, S.levels[u.id] || 0));
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e4 ? (n / 1e3).toFixed(1) + "k" : Math.floor(n).toString();

  function save() {
    store.set({ legacy, bestCards, muted, lastSeen: Date.now(), S: running ? S : null });
  }

  // ---------- Âm thanh (WebAudio) ----------
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
    swipe: () => beep(300, .07, "sawtooth", .03, 200),
    bad: () => beep(90, .5, "sawtooth", .08, -40),
    good: () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, .15, "triangle"), i * 110)),
  };

  // ---------- Giao diện chỉ số ----------
  function buildMeters() {
    $("meters").innerHTML = Object.entries(METERS).map(([k, m]) =>
      `<div class="meter" id="mt-${k}" style="--c:${m.color}"><div class="name"><span class="badge">${m.icon}</span><span class="nm">${m.name}</span><b class="num" id="mv-${k}">50</b></div>
       <div class="bar"><div class="fill" id="mf-${k}"></div></div><div class="dot" id="md-${k}"></div></div>`).join("");
  }
  function buildShop() {
    $("shop").innerHTML = UPGRADES.map(u =>
      `<button class="up" id="up-${u.id}" style="--c:${METERS[u.meter].color}"><div class="ib">${METERS[u.meter].icon}</div><div class="t">${u.name}</div><div class="d">${u.desc}</div>
       <div class="c" id="uc-${u.id}"></div><div class="th">${u.theory}</div></button>`).join("");
    UPGRADES.forEach(u => $("up-" + u.id).onclick = () => buy(u));
  }
  function refreshMeters() {
    for (const k in METERS) {
      const v = S.meters[k];
      $("mf-" + k).style.width = Math.max(0, Math.min(100, v)) + "%";
      $("mv-" + k).textContent = Math.round(v);
      $("mt-" + k).classList.toggle("danger", v <= 12 || v >= 88);
    }
    Scene.render(S.meters.cv, S.meters.v);
    Factory.setState(S.meters.cv, S.meters.v);
  }
  function refreshTop() {
    $("m-val").textContent = fmt(S.m);
    $("m-rate").textContent = rate().toFixed(1);
    $("card-count").textContent = S.cards;
    UPGRADES.forEach(u => {
      const c = cost(u), b = $("up-" + u.id);
      $("uc-" + u.id).textContent = `Giá: ${fmt(c)} m · Cấp ${S.levels[u.id] || 0}`;
      b.disabled = S.m < c || cardOpen;
    });
    $("card-timer-fill").style.width = cardOpen ? "100%" : Math.min(100, 100 * (1 - S.cardTimer / (S.cards ? CARD_INTERVAL : FIRST_CARD))) + "%";
  }

  function floatText(text, color) {
    const el = document.createElement("div");
    el.className = "float"; el.textContent = text; el.style.color = color;
    el.style.left = (20 + Math.random() * 60) + "%"; el.style.top = (35 + Math.random() * 15) + "%";
    $("float-layer").appendChild(el);
    setTimeout(() => el.remove(), 1400);
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
    refreshMeters(); refreshTop();
    checkEnd();
  }

  function applyFx(fx) {
    for (const k in fx) {
      S.meters[k] += fx[k];
      floatText(`${METERS[k].short} ${fx[k] > 0 ? "+" : ""}${fx[k]}`, METERS[k].color);
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
  function nextCard() {
    if (!deck.length) deck = CARDS.slice().sort(() => Math.random() - 0.5);
    current = deck.pop();
    cardOpen = true;
    $("card-portrait").innerHTML = portrait(current.id);
    $("card-who").textContent = current.who;
    $("card-text").textContent = current.text;
    $("lbl-l").textContent = "A: " + current.left.label;
    $("lbl-r").textContent = "B: " + current.right.label;
    $("card-hint-l").textContent = "← " + Object.keys(current.left.fx).map(k => METERS[k].short).join(" · ");
    $("card-hint-r").textContent = Object.keys(current.right.fx).map(k => METERS[k].short).join(" · ") + " →";
    $("card-overlay").classList.remove("hidden");
    resetCard(true);
    refreshTop();
  }

  function setDots(fx) {
    for (const k in METERS) $("md-" + k).classList.toggle("show", !!(fx && fx[k]));
  }

  function resetCard(instant) {
    const c = $("card");
    c.classList.toggle("drag", !!instant);
    c.style.transform = "";
    c.querySelector(".stamp.left").style.opacity = 0;
    c.querySelector(".stamp.right").style.opacity = 0;
    setDots(null);
  }

  function choose(side) {
    if (!cardOpen) return;
    const opt = side === "left" ? current.left : current.right;
    const c = $("card");
    c.classList.remove("drag");
    c.style.transform = `translateX(${side === "left" ? -140 : 140}vw) rotate(${side === "left" ? -35 : 35}deg)`;
    sfx.hammer();
    setTimeout(() => {
      cardOpen = false;
      $("card-overlay").classList.add("hidden");
      setDots(null);
      applyFx(opt.fx);
      S.cards++;
      S.cardTimer = CARD_INTERVAL;
      S.bestCardsLocal = Math.max(S.bestCardsLocal || 0, S.cards);
      showNote(opt.note);
      refreshMeters(); refreshTop();
      const hit = Object.values(S.meters).some(v => v <= 0 || v >= 100);
      if (hit) document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 500);
      checkEnd();
    }, 260);
  }

  let noteT = null;
  function showNote(text) {
    const n = $("note-toast");
    n.textContent = text;
    n.classList.remove("hidden");
    clearTimeout(noteT);
    noteT = setTimeout(() => n.classList.add("hidden"), 5500);
  }

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
      setDots(Math.abs(dx) > 25 ? (dx < 0 ? current.left.fx : current.right.fx) : null);
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
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" || e.key === "a") choose("left");
    if (e.key === "ArrowRight" || e.key === "d") choose("right");
  });

  // ---------- Vòng lặp ----------
  function tick(now) {
    requestAnimationFrame(tick);
    if (!running) { last = now; return; }
    let dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    if (cardOpen) return;

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
    refreshMeters(); refreshTop();
    checkEnd();
  }

  let saveTimer = 0;
  setInterval(() => { if (running) save(); }, 5000);
  window.addEventListener("beforeunload", save);

  // ---------- Màn hình ----------
  function show(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  function startGame(resume) {
    if (!resume) S = fresh();
    running = true; cardOpen = false; deck = [];
    $("card-overlay").classList.add("hidden");
    show("screen-play");
    buildMeters(); buildShop();
    refreshMeters(); refreshTop();
    sfx.buy();
    Factory.setMuted(muted);
    Factory.start();
  }

  function endGame(key) {
    running = false; cardOpen = false;
    $("card-overlay").classList.add("hidden");
    Factory.stop();
    const e = ENDINGS[key];
    const gain = Math.floor(Math.sqrt(S.total / 60)) + (e.good ? 3 : 0);
    legacy += gain;
    bestCards = Math.max(bestCards, S.cards);
    $("end-emoji").innerHTML = e.icon;
    $("end-title").textContent = e.title;
    $("end-text").textContent = e.text;
    $("end-stats").innerHTML = `Thặng dư tích lũy: <b>${fmt(S.total)} m</b> · Tình huống đã qua: <b>${S.cards}/${WIN_CARDS}</b><br>
      Gia sản thừa kế +${gain} → tổng ${legacy} (thu nhập ×${mult().toFixed(2)})`;
    show("screen-end");
    (e.good ? sfx.good : sfx.bad)();
    S = null;
    save();
  }

  $("btn-start").onclick = () => startGame(false);
  $("btn-restart").onclick = () => { updateStart(); startGame(false); };
  const muteLabel = () => ($("btn-mute").textContent = muted ? "Âm thanh: Tắt" : "Âm thanh: Bật");
  $("btn-mute").onclick = () => { muted = !muted; Factory.setMuted(muted); muteLabel(); save(); };
  $("start-crest").innerHTML = ICON.gear;

  function updateStart() {
    $("legacy-note").textContent = legacy
      ? `Gia sản thừa kế: ${legacy} · thu nhập ×${mult().toFixed(2)} · kỷ lục ${bestCards}/${WIN_CARDS} tình huống`
      : "";
  }

  // ---------- Khởi tạo & tiến trình ngoại tuyến ----------
  const saved = store.get();
  if (saved) {
    legacy = saved.legacy || 0; bestCards = saved.bestCards || 0; muted = !!saved.muted;
    muteLabel();
    if (saved.S) {
      S = saved.S;
      const off = Math.min(MAX_OFFLINE, (Date.now() - (saved.lastSeen || Date.now())) / 1000);
      const gain = off > 5 ? rate() * off * 0.5 : 0;
      S.m += gain; S.total += gain;
      startGame(true);
      if (gain > 0) showNote(`Trong lúc vắng mặt, xưởng đã tạo thêm ${fmt(gain)} m.`);
    }
  }
  // Trình duyệt chỉ cho phát âm thanh sau thao tác đầu tiên (khi tải lại giữa ván)
  const unlock = () => { if (running) Factory.start(); };
  document.addEventListener("pointerdown", unlock, { once: true });
  document.addEventListener("keydown", unlock, { once: true });

  updateStart();
  requestAnimationFrame(tick);
})();

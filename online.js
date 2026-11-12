// Chơi theo phòng kiểu Kahoot: giáo viên tạo phòng (mã PIN), người chơi nhập PIN + tên, chơi, xếp hạng.
// Gọi thẳng REST API của Supabase (PostgREST) bằng fetch, không cần thư viện.
const Online = (() => {
  const cfg = window.ONLINE_CONFIG || {};
  const base = (cfg.url || "").replace(/\/+$/, "");
  const key = cfg.anonKey || "";
  const enabled = !!(base && key);

  async function req(method, path, body, prefer) {
    const h = { apikey: key, "Content-Type": "application/json" };
    if (key.startsWith("eyJ")) h.Authorization = "Bearer " + key; // khóa anon dạng JWT cũ
    if (prefer) h.Prefer = prefer;
    const r = await fetch(`${base}/rest/v1/${path}`, { method, headers: h, body: body ? JSON.stringify(body) : undefined });
    if (!r.ok) { const e = new Error("HTTP " + r.status); e.status = r.status; throw e; }
    return r.status === 204 ? null : r.json();
  }

  const randInt = (n) => Math.floor(Math.random() * n);

  async function createRoom() {
    for (let i = 0; i < 6; i++) {
      const code = String(100000 + randInt(900000)), seed = 1 + randInt(2147483646);
      try { const [row] = await req("POST", "rooms", { code, seed }, "return=representation"); return row; }
      catch (e) { if (e.status !== 409) throw e; } // trùng mã: thử mã khác
    }
    throw new Error("Không tạo được mã phòng");
  }
  async function getRoom(code) {
    const rows = await req("GET", `rooms?code=eq.${encodeURIComponent(code)}&select=code,seed`);
    return rows[0] || null;
  }
  async function join(code, name) {
    const [row] = await req("POST", "players", { room_code: code, name }, "return=representation");
    return row;
  }
  const update = (id, patch) =>
    req("PATCH", `players?id=eq.${encodeURIComponent(id)}`, { ...patch, updated_at: new Date().toISOString() }, "return=minimal");
  const list = (code) =>
    req("GET", `players?room_code=eq.${encodeURIComponent(code)}&select=id,name,status,cards,total,ending,won&limit=500`);

  // Xếp hạng: thắng trước, rồi số tình huống vượt qua, rồi tổng thặng dư tích lũy
  const rank = (rows) => rows.slice().sort((a, b) => (b.won - a.won) || (b.cards - a.cards) || (b.total - a.total));

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e4 ? (n / 1e3).toFixed(1) + "k" : Math.floor(n).toString();
  function statusText(p) {
    if (p.status !== "done") return `<span class="st play">Đang chơi</span>`;
    if (p.won) return `<span class="st win">Thắng</span>`;
    const e = ENDINGS[p.ending];
    return `<span class="st lose" title="${e ? esc(e.title) : ""}">Thua${e ? " · " + esc(e.cond) : ""}</span>`;
  }
  // Bảng xếp hạng HTML; me: id người chơi cần tô sáng; top: số dòng tối đa (vẫn luôn hiện dòng của "me")
  function board(rows, me, top = 1000) {
    const r = rank(rows);
    if (!r.length) return `<p class="lb-empty">Chưa có người chơi nào. Hãy nhập mã PIN để vào phòng.</p>`;
    const row = (p, i) => `<tr class="${p.id === me ? "me" : ""}${i < 3 ? " top" + (i + 1) : ""}">
      <td class="rk">${i + 1}</td><td class="nm">${esc(p.name)}</td>
      <td class="cd">${p.cards}/${WIN_CARDS}</td><td class="mm">🪙 ${num(p.total)} m</td><td>${statusText(p)}</td></tr>`;
    let body = r.slice(0, top).map(row).join("");
    const mi = r.findIndex(p => p.id === me);
    if (mi >= top) body += `<tr class="gap"><td colspan="5">…</td></tr>` + row(r[mi], mi);
    return `<table class="lb"><thead><tr><th>#</th><th>Tên</th><th>Tình huống</th><th>Thặng dư</th><th>Trạng thái</th></tr></thead><tbody>${body}</tbody></table>`;
  }

  // Bộ sinh số ngẫu nhiên có hạt giống: cùng phòng → cùng thứ tự thẻ, cùng mục tiêu
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  return { enabled, createRoom, getRoom, join, update, list, rank, board, rng };
})();

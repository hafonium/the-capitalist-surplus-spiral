// Cảnh nhà xưởng SVG: thay đổi theo c/v (số máy) và v (số thợ)
const Scene = (() => {
  const svg = document.getElementById("scene");
  let lastKey = "";

  function gear(cx, cy, r, dur, rev) {
    let t = "";
    for (let i = 0; i < 8; i++) t += `<rect x="${cx - 2.5}" y="${cy - r - 4}" width="5" height="7" fill="#2b2118" transform="rotate(${i * 45} ${cx} ${cy})"/>`;
    return `<g style="transform-origin:${cx}px ${cy}px;animation:spin ${dur}s linear infinite ${rev ? "reverse" : ""}">
      ${t}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#2b2118"/><circle cx="${cx}" cy="${cy}" r="${r * 0.42}" fill="#cdbb8a"/>
      <rect x="${cx - 1}" y="${cy - r}" width="2" height="${r}" fill="#cdbb8a"/></g>`;
  }

  function render(cv, v) {
    const machines = Math.max(1, Math.min(5, Math.round(cv / 20)));   // 1..5
    const workers = Math.max(0, Math.min(5, Math.round(v / 20)));     // 0..5
    const key = machines + "-" + workers;
    if (key === lastKey) return;
    lastKey = key;

    let s = `<defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8a67c"/><stop offset="1" stop-color="#e9dcb8"/></linearGradient>
      <pattern id="brick" width="10" height="6" patternUnits="userSpaceOnUse"><rect width="10" height="6" fill="#6b5240"/><path d="M0 0h10M0 3h10M5 0v3M0 3v3" stroke="#4f3b2c" stroke-width=".6" fill="none"/></pattern>
    </defs>
    <style>
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes smoke{from{opacity:.75;transform:translate(0,0) scale(.5)}to{opacity:0;transform:translate(26px,-60px) scale(2.1)}}
      @keyframes bob{50%{transform:translateY(-2.5px)}}
      @keyframes flick{50%{opacity:.55}}
      .sm{animation:smoke 3.6s linear infinite;fill:#4a4038}
      .wk{animation:bob .75s ease-in-out infinite}
      .win{animation:flick 2.4s ease-in-out infinite}
    </style>
    <rect width="400" height="140" fill="url(#sky)"/>
    <circle cx="330" cy="30" r="16" fill="#f3e3b0" opacity=".65"/>
    <path d="M0 96l20-18 18 10 24-26 22 20 26-14 28 22 30-24 26 18 30-20 28 22 30-12 22 14 26-10 20 8v50H0z" fill="#a8977a" opacity=".55"/>
    <rect y="120" width="400" height="20" fill="#2b2118"/>
    <rect y="120" width="400" height="2.500" fill="#6f5420"/>`;

    // tòa nhà xưởng (luôn có, rộng khắp khung)
    s += `<rect x="14" y="66" width="372" height="54" fill="url(#brick)"/>
          <path d="M10 66h380l-8-10H18z" fill="#3b2f26"/>`;

    // ống khói + khói: số lượng theo c/v
    const slots = 5, step = 360 / slots;
    for (let i = 0; i < slots; i++) {
      const cx = 14 + step * i + step / 2;
      const on = i < machines;
      if (on) {
        s += `<rect x="${cx - 7}" y="${24 + (i % 2) * 8}" width="14" height="${44 - (i % 2) * 8}" fill="#3b2f26"/><rect x="${cx - 9}" y="${22 + (i % 2) * 8}" width="18" height="4" fill="#2b2118"/>`;
        s += `<circle class="sm" cx="${cx}" cy="${20 + (i % 2) * 8}" r="8" style="animation-delay:${i * 0.8}s"/>`;
        s += `<circle class="sm" cx="${cx}" cy="${20 + (i % 2) * 8}" r="6" style="animation-delay:${i * 0.8 + 1.8}s"/>`;
        s += `<rect class="win" x="${cx - 12}" y="76" width="24" height="14" fill="#f0c24a" style="animation-delay:${i * 0.4}s"/>`;
        s += gear(cx, 104, 9 + (i % 2) * 2, 2.2 + i * 0.5, i % 2);
      } else {
        s += `<rect x="${cx - 12}" y="76" width="24" height="14" fill="#2b2118" opacity=".55"/>`;
        s += `<rect x="${cx - 9}" y="98" width="18" height="12" fill="#4f3b2c"/>`;
      }
    }

    // công nhân
    for (let i = 0; i < workers; i++) {
      const x = 14 + step * i + step / 2 + 24;
      s += `<g class="wk" style="animation-delay:${i * 0.18}s">
        <circle cx="${x}" cy="108" r="4" fill="#C62828" stroke="#2b2118" stroke-width=".8"/>
        <rect x="${x - 3.500}" y="112" width="7" height="9" fill="#C62828" stroke="#2b2118" stroke-width=".8"/></g>`;
    }
    if (workers === 0) s += `<text x="200" y="52" text-anchor="middle" font-size="11" font-family="serif" font-style="italic" fill="#C62828">Xưởng vắng bóng thợ…</text>`;
    svg.innerHTML = s;
  }
  return { render };
})();

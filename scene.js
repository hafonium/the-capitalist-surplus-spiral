// Cảnh nhà xưởng về đêm: máy móc theo c/v, thợ theo v; càng ít thợ càng nhiều "con mắt" dõi theo
const Scene = (() => {
  const svg = document.getElementById("scene");
  let lastKey = "";

  function gear(cx, cy, r, dur, rev) {
    let t = "";
    for (let i = 0; i < 8; i++) t += `<rect x="${cx - 2.5}" y="${cy - r - 4}" width="5" height="7" fill="#0c0807" transform="rotate(${i * 45} ${cx} ${cy})"/>`;
    return `<g style="transform-origin:${cx}px ${cy}px;animation:spin ${dur}s linear infinite ${rev ? "reverse" : ""}">
      ${t}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0c0807" stroke="#5a2d18" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="#3a1b10"/>
      <rect x="${cx - 1}" y="${cy - r}" width="2" height="${r}" fill="#5a2d18"/></g>`;
  }
  const eyes = (x, y, delay) =>
    `<g class="eye" style="animation-delay:${delay}s"><ellipse cx="${x - 3.5}" cy="${y}" rx="2.2" ry="1.3" fill="#e8e0c8"/><ellipse cx="${x + 3.5}" cy="${y}" rx="2.2" ry="1.3" fill="#e8e0c8"/>
     <circle cx="${x - 3.5}" cy="${y}" r=".8" fill="#b00"/><circle cx="${x + 3.5}" cy="${y}" r=".8" fill="#b00"/></g>`;

  function render(cv, v) {
    const machines = Math.max(1, Math.min(5, Math.round(cv / 20)));   // 1..5
    const workers = Math.max(0, Math.min(5, Math.round(v / 20)));     // 0..5
    const key = machines + "-" + workers;
    if (key === lastKey) return;
    lastKey = key;

    let s = `<defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050707"/><stop offset=".7" stop-color="#14201f"/><stop offset="1" stop-color="#2a3a36"/></linearGradient>
      <radialGradient id="moon"><stop offset="0" stop-color="#ff5a3c"/><stop offset=".6" stop-color="#a81d12"/><stop offset="1" stop-color="#a81d12" stop-opacity="0"/></radialGradient>
      <pattern id="brick" width="10" height="6" patternUnits="userSpaceOnUse"><rect width="10" height="6" fill="#1a1210"/><path d="M0 0h10M0 3h10M5 0v3M0 3v3" stroke="#0a0605" stroke-width=".6" fill="none"/></pattern>
      <linearGradient id="fogg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8aa" stop-opacity="0"/><stop offset=".5" stop-color="#9bb" stop-opacity=".35"/><stop offset="1" stop-color="#8aa" stop-opacity="0"/></linearGradient>
    </defs>
    <style>
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes smoke{from{opacity:.8;transform:translate(0,0) scale(.5)}to{opacity:0;transform:translate(26px,-64px) scale(2.2)}}
      @keyframes bob{50%{transform:translateY(-2px)}}
      @keyframes flick{0%,100%{opacity:1}30%{opacity:.35}34%{opacity:1}70%{opacity:.6}73%{opacity:.15}76%{opacity:1}}
      @keyframes drift{from{transform:translateX(-120px)}to{transform:translateX(160px)}}
      @keyframes blinkeye{0%,92%,100%{opacity:1}94%{opacity:0}96%{opacity:1}}
      @keyframes moonpulse{50%{opacity:.7}}
      .sm{animation:smoke 4s linear infinite;fill:#0a0a0a}
      .wk{animation:bob .9s ease-in-out infinite}
      .win{animation:flick 3.5s infinite}
      .fog{animation:drift 22s linear infinite alternate}
      .eye{animation:blinkeye 5s infinite}
      .moon{animation:moonpulse 5s ease-in-out infinite}
    </style>
    <rect width="400" height="140" fill="url(#sky)"/>
    <circle class="moon" cx="330" cy="30" r="34" fill="url(#moon)"/><circle cx="330" cy="30" r="13" fill="#d9442b" opacity=".85"/>
    <path d="M0 92l14-10 10 6 18-24 12 16 20-12 22 22 26-16 24 20 28-22 22 16 28-12 20 10 26-8 22 6 18-8 20 8v64H0z" fill="#0a0f0e"/>
    <path d="M60 100l-1-34M59 80l-10-10M59 74l9-9M330 104l1-30M331 88l9-9M331 82l-9-9" stroke="#050606" stroke-width="2" fill="none"/>
    <rect y="120" width="400" height="20" fill="#050403"/>
    <rect y="120" width="400" height="2" fill="#3a1b10"/>`;

    // tòa nhà xưởng
    s += `<rect x="14" y="66" width="372" height="54" fill="url(#brick)"/><path d="M10 66h380l-8-10H18z" fill="#0a0605"/>`;

    const slots = 5, step = 360 / slots;
    for (let i = 0; i < slots; i++) {
      const cx = 14 + step * i + step / 2;
      if (i < machines) {
        s += `<rect x="${cx - 7}" y="${24 + (i % 2) * 8}" width="14" height="${44 - (i % 2) * 8}" fill="#0a0605"/><rect x="${cx - 9}" y="${22 + (i % 2) * 8}" width="18" height="4" fill="#050303"/>`;
        s += `<circle class="sm" cx="${cx}" cy="${20 + (i % 2) * 8}" r="8" style="animation-delay:${i * 0.9}s"/>`;
        s += `<circle class="sm" cx="${cx}" cy="${20 + (i % 2) * 8}" r="6" style="animation-delay:${i * 0.9 + 2}s"/>`;
        s += `<rect class="win" x="${cx - 12}" y="76" width="24" height="14" fill="#c8a63a" style="animation-delay:${i * 0.7}s"/><path d="M${cx} 76v14M${cx - 12} 83h24" stroke="#1a1210" stroke-width="1.200"/>`;
        s += gear(cx, 104, 9 + (i % 2) * 2, 2.6 + i * 0.5, i % 2);
      } else {
        s += `<rect x="${cx - 12}" y="76" width="24" height="14" fill="#030202"/>`;
        s += `<rect x="${cx - 9}" y="98" width="18" height="12" fill="#0c0807"/>`;
      }
    }

    // công nhân (bóng đen, mắt trắng)
    const spots = [];
    for (let i = 0; i < slots; i++) spots.push(14 + step * i + step / 2 + 24);
    for (let i = 0; i < workers; i++) {
      const x = spots[i];
      s += `<g class="wk" style="animation-delay:${i * 0.2}s">
        <circle cx="${x}" cy="108" r="4" fill="#050303"/><rect x="${x - 3.500}" y="112" width="7" height="9" fill="#050303"/>
        <circle cx="${x - 1.500}" cy="107.500" r=".7" fill="#e8e0c8"/><circle cx="${x + 1.500}" cy="107.500" r=".7" fill="#e8e0c8"/></g>`;
    }
    // chỗ thợ vắng: càng vắng càng nhiều mắt dõi theo từ bóng tối
    const eyeSpots = [[60, 83], [316, 83], [230, 94], [140, 96], [370, 100], [28, 100]];
    const watchers = Math.min(eyeSpots.length, 5 - workers + (machines >= 4 ? 1 : 0));
    for (let i = 0; i < watchers; i++) s += eyes(eyeSpots[i][0], eyeSpots[i][1], i * 1.3);
    if (workers === 0) s += `<text x="200" y="50" text-anchor="middle" font-size="11" font-family="serif" font-style="italic" fill="#a01818">Xưởng vắng bóng thợ… chúng đang nhìn bạn.</text>`;

    // sương mù trôi
    s += `<rect class="fog" x="0" y="96" width="260" height="28" fill="url(#fogg)"/><rect class="fog" x="140" y="108" width="260" height="22" fill="url(#fogg)" style="animation-duration:30s;animation-direction:alternate-reverse"/>`;
    svg.innerHTML = s;
  }
  return { render };
})();

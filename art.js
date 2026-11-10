// Hình vẽ SVG thay cho emoji (không phụ thuộc font hệ thống)
const svgIcon = (inner, vb = "0 0 24 24") =>
  `<svg class="ico" viewBox="${vb}" fill="currentColor" aria-hidden="true">${inner}</svg>`;

const ICON = {
  gear: svgIcon(`<path fill-rule="evenodd" d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2.6a1.9 1.9 0 110 3.8 1.9 1.9 0 010-3.8zM10.6 2h2.8l.5 2.6c.6.2 1.200.5 1.700.9l2.500-.9 1.400 2.400-2 1.800c.1.600.1 1.200 0 1.800l2 1.800-1.400 2.400-2.500-.9c-.5.4-1.100.7-1.700.9L13.400 19h-2.800l-.5-2.600c-.6-.2-1.200-.5-1.700-.9l-2.500.9L4.500 14l2-1.800c-.1-.6-.1-1.200 0-1.800l-2-1.800 1.400-2.400 2.500.9c.5-.4 1.100-.7 1.700-.9z" transform="translate(0 1.500)"/>`),
  fist: svgIcon(`<rect x="6" y="10" width="12" height="9" rx="2.5"/><rect x="5.800" y="6.500" width="3.200" height="6" rx="1.600"/><rect x="9.400" y="5" width="3.200" height="7" rx="1.600"/><rect x="13" y="5.500" width="3.200" height="6.500" rx="1.600"/><rect x="16.200" y="7.500" width="2.800" height="5" rx="1.400"/><rect x="7" y="19" width="10" height="3.500" rx="1"/>`),
  scales: svgIcon(`<rect x="11" y="4" width="2" height="15"/><rect x="7" y="19" width="10" height="2.200" rx="1"/><rect x="4" y="5" width="16" height="2" rx="1"/><path d="M1.500 13.500L5 7l3.500 6.500a3.500 3.500 0 01-7 0zM15.500 13.500L19 7l3.500 6.500a3.500 3.500 0 01-7 0z"/>`),
  hat: svgIcon(`<path d="M7 4h10l.6 10H6.400z"/><rect x="1.500" y="14" width="21" height="3.500" rx="1.700"/><rect x="6.600" y="10.500" width="10.800" height="2" fill="#000" opacity=".35"/>`),
  flag: svgIcon(`<rect x="4.500" y="2.500" width="2.200" height="19" rx="1"/><path d="M6.700 3.500h13l-3.500 4.600 3.500 4.600h-13z"/>`),
  lock: svgIcon(`<rect x="4.500" y="10" width="15" height="11" rx="2"/><path d="M8 10V7.500a4 4 0 018 0V10" fill="none" stroke="currentColor" stroke-width="2.200"/>`),
  factory: svgIcon(`<path d="M2 21V9.500l6 4V9.500l6 4V5h3.500v8.500H22V21z"/><rect x="15.500" y="2" width="3" height="5" opacity=".7"/>`),
  coin: svgIcon(`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="7" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="1.600"/><text x="12" y="16.500" text-anchor="middle" font-size="11" font-weight="700" fill="#000" fill-opacity=".45" font-family="serif">£</text>`),
  door: svgIcon(`<rect x="5.500" y="2.500" width="13" height="19" rx="1.200"/><circle cx="15.500" cy="12.500" r="1.200" fill="#000" opacity=".45"/>`),
  down: svgIcon(`<path d="M3 4h2.400v13.600H21V20H3z"/><path d="M7 8l4 4 3-3 5 5.500" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"/>`),
};

// Gắn biểu tượng vào dữ liệu
METERS.cv.icon = ICON.gear;  METERS.cv.short = "c/v";
METERS.v.icon  = ICON.fist;  METERS.v.short  = "v";
METERS.zr.icon = ICON.scales; METERS.zr.short = "z+R";
METERS.td.icon = ICON.hat;   METERS.td.short = "m_td";

const END_ICON = {
  "v-low": ICON.flag, "cv-low": ICON.gear, "zr-low": ICON.lock, "td-high": ICON.hat,
  "cv-high": ICON.factory, "v-high": ICON.coin, "zr-high": ICON.down, "td-low": ICON.door, "win": ICON.factory,
};
for (const k in ENDINGS) ENDINGS[k].icon = END_ICON[k];

// Chân dung bán thân kiểu tranh khắc
const SKIN = "#e7cd9d", INK = "#2b2118";
function portrait(id) {
  const P = {
    1: { bg: "#c9b27c", coat: "#6b4a2b", hat: "cap", stache: true, prop: "watch" },
    2: { bg: "#b9b3a0", coat: "#6f6a60", hat: "bonnet", child: true },
    3: { bg: "#a79bb8", coat: "#1d1b1e", hat: "top", stache: true, prop: "paper" },
    4: { bg: "#c4a08a", coat: "#7a1f24", hat: "wig", prop: "scroll" },
    5: { bg: "#a9b3a4", coat: "#24262b", hat: "bald", glasses: true, prop: "paper" },
    6: { bg: "#c9a9b8", coat: "#5d2a63", hat: "lady", fur: true },
    7: { bg: "#c8a58b", coat: "#4a5560", hat: "flat", scarf: true },
  }[id] || { bg: "#c9b27c", coat: "#333", hat: "none" };

  let s = `<svg viewBox="0 0 120 100" class="bust" aria-hidden="true">
    <rect width="120" height="100" fill="${P.bg}"/>
    <g stroke="${INK}" stroke-width="1.600" stroke-linejoin="round">`;
  // vai/áo
  s += `<path d="M10 100c2-22 18-30 50-30s48 8 50 30z" fill="${P.coat}"/>`;
  if (P.fur) s += `<path d="M26 78c10-8 58-8 68 0-8 10-60 10-68 0z" fill="#e9e1d3"/>`;
  else s += `<path d="M48 72l12 16 12-16z" fill="#efe6d0"/>`;
  if (P.scarf) s += `<path d="M44 70c10 8 22 8 32 0l4 8c-12 8-28 8-40 0z" fill="#b3261e"/>`;
  // cổ + đầu
  s += `<rect x="52" y="58" width="16" height="16" fill="${SKIN}"/>`;
  s += `<ellipse cx="60" cy="42" rx="19" ry="23" fill="${SKIN}"/>`;
  if (P.child) s += `<circle cx="96" cy="76" r="9" fill="${SKIN}"/><path d="M84 100c0-12 6-16 12-16s12 4 12 16z" fill="#8a7a58"/>`;
  // mặt
  s += `<circle cx="52" cy="42" r="1.800" fill="${INK}"/><circle cx="68" cy="42" r="1.800" fill="${INK}"/>`;
  s += `<path d="M60 44v8" fill="none"/><path d="M54 57q6 3 12 0" fill="none"/>`;
  s += `<path d="M47 37q5-3 9 0M64 37q5-3 9 0" fill="none"/>`;
  if (P.stache) s += `<path d="M50 53q10-6 20 0q-10 2-20 0z" fill="${INK}"/>`;
  if (P.glasses) s += `<circle cx="52" cy="42" r="6" fill="none"/><circle cx="68" cy="42" r="6" fill="none"/><path d="M58 42h4" fill="none"/>`;
  // mũ / tóc
  switch (P.hat) {
    case "top": s += `<rect x="46" y="8" width="28" height="26" rx="2" fill="#16151a"/><rect x="38" y="31" width="44" height="6" rx="3" fill="#16151a"/><rect x="46" y="26" width="28" height="4" fill="#7a5a00"/>`; break;
    case "cap": s += `<path d="M41 33c2-18 36-18 38 0z" fill="#3b2f26"/><path d="M41 33h42l-4 4H41z" fill="#3b2f26"/>`; break;
    case "flat": s += `<path d="M40 31c4-14 36-14 40 0z" fill="#3a4048"/><ellipse cx="60" cy="31" rx="22" ry="4" fill="#3a4048"/>`; break;
    case "bonnet": s += `<path d="M38 50c-6-34 38-44 44-8 0 6-2 10-4 14-4-14-8-22-20-22s-16 8-20 16z" fill="#d9d2c0"/>`; break;
    case "wig": s += `<path d="M38 56c-10-40 6-52 22-52s32 12 22 52c-4-10-6-22-22-22S42 46 38 56z" fill="#ece8df"/>`; break;
    case "lady": s += `<ellipse cx="60" cy="26" rx="34" ry="8" fill="#3d1f45"/><path d="M44 26c0-16 32-16 32 0z" fill="#3d1f45"/><path d="M80 24c10-14 20-14 22-10-8 0-12 6-16 14z" fill="#e9e1d3"/>`; break;
    case "bald": s += `<path d="M42 34c0-6 4-12 8-14" fill="none"/>`; break;
  }
  // đạo cụ
  if (P.prop === "watch") s += `<circle cx="86" cy="84" r="9" fill="#d6b24a"/><path d="M86 84v-5M86 84l4 2" fill="none"/>`;
  if (P.prop === "paper") s += `<rect x="78" y="74" width="22" height="26" fill="#efe6d0" transform="rotate(8 89 87)"/><path d="M82 82h14M82 87h14M82 92h10" fill="none" transform="rotate(8 89 87)"/>`;
  if (P.prop === "scroll") s += `<rect x="76" y="74" width="26" height="12" rx="6" fill="#efe6d0"/><path d="M82 80h14" fill="none"/>`;
  s += `</g></svg>`;
  return s;
}

// Dữ liệu trò chơi: thẻ tình huống, nâng cấp, kết cục (theo tài liệu thiết kế)
const METERS = {
  cv: { name: "Cấu tạo hữu cơ c/v", icon: "⚙", color: "#1976D2" },
  v:  { name: "Sức bền công nhân v", icon: "✊", color: "#C62828" },
  zr: { name: "Lợi tức & Địa tô z+R", icon: "⚖", color: "#6A1B9A" },
  td: { name: "Quỹ tiêu dùng m_td", icon: "🎩", color: "#FBC02D" },
};

// Mỗi thẻ: left = Phương án A, right = Phương án B
const CARDS = [
  { id: 1, who: "Quản đốc xưởng", emoji: "⏱️",
    text: "Đơn hàng dệt đang dồn ứ! Ta nên bắt công nhân tăng ca từ 10 lên 14 tiếng mỗi ngày, hay trích thặng dư mua máy dệt con thoi bay mới?",
    left:  { label: "Bắt tăng ca! Tiền công giữ nguyên.", fx: { v: -20, td: 15 }, note: "GTTD tuyệt đối: kéo dài ngày lao động vượt quá thời gian lao động cần thiết." },
    right: { label: "Trích m mua máy dệt mới.", fx: { cv: 15, v: -5, td: -10 }, note: "GTTD tương đối: tăng c/v, tăng năng suất, rút ngắn thời gian lao động cần thiết." } },
  { id: 2, who: "Nữ công nhân & con nhỏ", emoji: "👩‍👧",
    text: "Nghị viện vừa ban hành Luật Công xưởng! Xin ông chủ giảm giờ làm của phụ nữ xuống 10 tiếng và cho trẻ em đến trường.",
    left:  { label: "Ở đây tôi là luật! Ca kíp như cũ.", fx: { v: -25, td: 10, zr: -10 }, note: "Tư bản vượt giới hạn thể chất và luân lý để bòn rút lao động thặng dư." },
    right: { label: "Chấp thuận, giảm còn 10 tiếng.", fx: { v: 20, td: -15 }, note: "Pháp luật giới hạn ngày lao động; tỷ suất bóc lột m' giảm." } },
  { id: 3, who: "Giám đốc Ngân hàng Luân Đôn", emoji: "🏦",
    text: "Đến kỳ trả lãi vay mua lò hơi nước rồi thưa ngài. Hãy trích nộp lợi tức z từ thặng dư quý này, hoặc chúng tôi phong tỏa tài khoản!",
    left:  { label: "Hãy đợi đấy! Tiền đang dồn mở xưởng.", fx: { zr: -30, td: 10 }, note: "Chiếm dụng lợi tức thuộc về tư bản cho vay." },
    right: { label: "Thanh toán sòng phẳng lợi tức z'.", fx: { zr: 20, td: -15 }, note: "Một phần lợi nhuận bình quân chuyển hóa thành lợi tức." } },
  { id: 4, who: "Bá tước Địa chủ", emoji: "🏰",
    text: "Mảnh đất xưởng của ngài sát đường sắt mới khánh thành. Tôi yêu cầu tăng cả Địa tô Tuyệt đối lẫn Địa tô Chênh lệch!",
    left:  { label: "Vô lý! Đất tự nó không tạo ra thặng dư!", fx: { zr: -25, cv: -5 }, note: "Mâu thuẫn chia chác thặng dư giữa tư bản công nghiệp và địa chủ." },
    right: { label: "Trích thặng dư siêu ngạch nộp địa tô.", fx: { zr: 15, td: -20 }, note: "Địa tô là phần thặng dư dôi ra ngoài lợi nhuận bình quân, trả cho chủ đất." } },
  { id: 5, who: "Cố vấn Pháp lý", emoji: "📜",
    text: "Xưởng đúc than bên cạnh vừa phá sản vì khủng hoảng thừa. Ngài muốn mở rộng từ từ, hay vay vốn nuốt chửng xưởng của họ?",
    left:  { label: "Tích tụ: dùng thặng dư tự tích lũy.", fx: { cv: 10, td: -10, zr: 5 }, note: "Tích tụ tư bản: tăng quy mô tư bản cá biệt bằng tích lũy tuần tự." },
    right: { label: "Tập trung: vay ngân hàng thâu tóm!", fx: { cv: 25, zr: -20, v: -10 }, note: "Tập trung tư bản: hợp nhất nhiều tư bản cá biệt nhờ cạnh tranh và tín dụng." } },
  { id: 6, who: "Phu nhân Nhà tư bản", emoji: "👒",
    text: "Các gia tộc than thép đều đã sắm du thuyền sang Pháp nghỉ hè. Ngài định vùi đầu mãi vào đống dầu mỡ mà không màng danh tiếng gia tộc sao?",
    left:  { label: "Thặng dư phải quay lại dây chuyền!", fx: { td: -25, cv: 15 }, note: "Hạn chế tiêu dùng cá nhân để tối đa hóa tích lũy, tái sản xuất mở rộng." },
    right: { label: "Mua biệt thự, mở vũ hội 3 đêm!", fx: { td: 30, cv: -20 }, note: "Chuyển phần lớn m thành quỹ tiêu dùng phi sản xuất của giai cấp tư sản." } },
  { id: 7, who: "Thợ tiện trẻ", emoji: "🔧",
    text: "Chúng tôi tạo ra giá trị mới gấp đôi tiền lương nhận được. Ông chủ đang bóc lột trắng trợn sức lao động của chúng tôi!",
    left:  { label: "Cút đi! Thất nghiệp ngoài cổng đầy.", fx: { v: -25, td: 10 }, note: "Dùng đội quân thất nghiệp để hạ thấp giá cả sức lao động." },
    right: { label: "Tôi mua đúng giá trị thị trường!", fx: { v: -10, zr: 5 }, note: "Hình thức tiền công che lấp ranh giới giữa lao động cần thiết và thặng dư." } },
];

// Nâng cấp mua bằng thặng dư m (chi phí tăng theo cấp)
const UPGRADES = [
  { id: "machine", name: "Mua máy móc mới", desc: "c/v +8 · tăng năng suất", meter: "cv", amt: 8, base: 40, grow: 1.35, income: 0.12,
    theory: "Tăng cấu tạo hữu cơ → GTTD tương đối / siêu ngạch" },
  { id: "wage", name: "Tăng lương & bữa ăn", desc: "v +8 · công nhân đủ sống", meter: "v", amt: 8, base: 30, grow: 1.3, income: 0,
    theory: "Tái sản xuất sức lao động" },
  { id: "debt", name: "Trả lợi tức & địa tô", desc: "z+R +8 · chia thặng dư", meter: "zr", amt: 8, base: 30, grow: 1.3, income: 0,
    theory: "Thặng dư chia thành lợi tức và địa tô" },
  { id: "luxury", name: "Chi tiêu xa xỉ", desc: "m_td +8 · giữ địa vị", meter: "td", amt: 8, base: 25, grow: 1.3, income: 0,
    theory: "Quỹ tiêu dùng cá nhân của nhà tư bản" },
];

// Kết cục
const ENDINGS = {
  "v-low": { title: "CÁCH MẠNG VÔ SẢN TOÀN THÀNH", emoji: "🚩", good: false,
    text: "Bạn đã bóc lột đến giọt mồ hôi cuối cùng mà không trích thặng dư duy trì điều kiện sống cho công nhân. Theo Karl Marx, khi sự bần cùng hóa của giai cấp vô sản chạm tới điểm giới hạn, mâu thuẫn giai cấp đối kháng sẽ tất yếu dẫn tới một cuộc cách mạng vô sản để tước đoạt lại tư liệu sản xuất!" },
  "cv-low": { title: "PHÁ SẢN TRƯỚC SỨC ÉP CẠNH TRANH", emoji: "🕸️", good: false,
    text: "Bạn đã tiêu dùng thặng dư vào hưởng lạc cá nhân thay vì tái đầu tư công nghệ. Các nhà tư bản đối thủ đã nâng cao cấu tạo hữu cơ (c/v), chiếm đoạt thặng dư siêu ngạch và hạ giá bán đè bẹp xưởng của bạn. Bạn đã chính thức gia nhập tầng lớp tiểu tư sản bị phá sản!" },
  "zr-low": { title: "TỊCH BIÊN BỞI LIÊN MINH NGÂN HÀNG & ĐỊA CHỦ", emoji: "🔒", good: false,
    text: "Bạn lầm tưởng toàn bộ giá trị thặng dư đều thuộc về mình! Trong kinh tế thị trường, tư bản công nghiệp bắt buộc phải chia thặng dư thành lợi tức (z) cho ngân hàng và địa tô (R) cho chủ đất. Vi phạm luật chơi của giới tài phiệt, bạn đã bị cỗ máy tín dụng nghiền nát." },
  "td-high": { title: "THA HÓA VÌ TRỤY LẠC", emoji: "🍷", good: false,
    text: "Bạn đem toàn bộ thặng dư đi ăn chơi trác táng. Nhà tư bản đã ngừng đóng vai trò 'kẻ chỉ huy quá trình sản xuất' để biến thành kẻ ăn bám ký sinh. Toàn bộ cơ nghiệp của bạn bị xâu xé và biến mất khỏi thương trường!" },
  "cv-high": { title: "KHỦNG HOẢNG SẢN XUẤT THỪA", emoji: "🏭", good: false,
    text: "Đầu tư máy móc quá mức: hàng hóa ứ đọng, vốn đóng băng, máy móc rỉ sét vì thiếu thợ vận hành. Cấu tạo hữu cơ cao mà không có lao động sống thì không tạo ra giá trị thặng dư mới." },
  "v-high": { title: "NHÀ TỪ THIỆN ẢO TƯỞNG", emoji: "💸", good: false,
    text: "Trả lương quá cao khiến chi phí sản xuất k vượt quá giá trị bán ra, triệt tiêu hoàn toàn thặng dư. Doanh nghiệp giải thể: nhà tư bản không thể tồn tại nếu không có thặng dư." },
  "zr-high": { title: "LỆ THUỘC TÍN DỤNG", emoji: "📉", good: false,
    text: "Bạn nhường quá nhiều thặng dư cho ngân hàng và địa chủ. Giới ngân hàng chuyển đổi nợ thành cổ phần chi phối và tước quyền điều hành xưởng của bạn." },
  "td-low": { title: "MẤT UY TÍN XÃ HỘI", emoji: "🚪", good: false,
    text: "Bạn thắt lưng buộc bụng đến mức bị giới thượng lưu tẩy chay, ngân hàng hạ hạn mức tín dụng cá nhân. Tiêu dùng cá nhân tối thiểu vẫn là một phần của địa vị nhà tư bản." },
  "win": { title: "ĐẾ CHẾ TƯ BẢN ĐỘC QUYỀN", emoji: "🏆", good: true,
    text: "Chúc mừng! Bạn đã nắm vững bản chất tích lũy và tập trung tư bản. Bạn vừa nâng cao cấu tạo hữu cơ c/v, vừa làm tròn nghĩa vụ chia chác lợi tức, địa tô, đồng thời duy trì công nhân ở mức 'đủ sống để tiếp tục làm thuê'. Bạn là hiện thân hoàn hảo của phương thức sản xuất tư bản chủ nghĩa!" },
};

const WIN_CARDS = 20;

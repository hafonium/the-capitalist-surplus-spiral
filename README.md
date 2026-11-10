# The Capitalist: Vòng Xoáy Thặng Dư

Trò chơi web (idle + thẻ bài quẹt) cho học phần **Kinh tế chính trị Mác – Lênin**, Chương 3: Giá trị thặng dư, tích lũy tư bản và phân bổ giá trị thặng dư.

> *"Anh/Chị là một nhà tư bản, sau khi thực hiện hành vi 'bóc lột' giai cấp công nhân thì anh/chị sẽ sử dụng giá trị thặng dư đó như thế nào?"*

## Cách chạy

Không cần cài đặt hay build. Mở file `index.html` bằng trình duyệt (Chrome, Edge, Firefox…).
Cần internet ở lần đầu để tải font (Playfair Display, Be Vietnam Pro) hiển thị đúng tiếng Việt.

## Cách chơi

Bạn là nhà tư bản vừa thừa kế một xưởng công nghiệp ở nước Anh thế kỷ 19. Mục tiêu: **giữ cả 4 chỉ số trong khoảng 0–100 và sống sót qua 20 tình huống.**

### 1. Thặng dư m tự chảy về
Số **Thặng dư m** tăng mỗi giây (xem mục *Thu nhập*). Thu nhập cao hơn khi **c/v** cao và khi **v** thấp. Bóc lột nặng thì lời nhanh, nhưng đẩy công nhân đến bờ vực.

### 2. Bốn chỉ số (bắt đầu ở 50)

| Chỉ số | Ý nghĩa |
|---|---|
| **c/v** – Cấu tạo hữu cơ | Máy móc, công nghệ so với sức lao động |
| **v** – Sức bền công nhân | Tiền lương, giờ làm, điều kiện sống |
| **z+R** – Lợi tức & Địa tô | Phần thặng dư chia cho ngân hàng và chủ đất |
| **m_td** – Quỹ tiêu dùng | Hưởng thụ và địa vị của nhà tư bản |

Cả bốn chỉ số **tự giảm dần theo thời gian**. Hãy dùng m để mua nâng cấp bù lại:

- **Mua máy móc mới** → c/v +8
- **Tăng lương & bữa ăn** → v +8
- **Trả lợi tức & địa tô** → z+R +8
- **Chi tiêu xa xỉ** → m_td +8

Giá tăng dần theo mỗi cấp. Nút nâng cấp sáng lên khi bạn đủ tiền.

### 3. Thẻ tình huống
Khoảng 18 giây một lần, một nhân vật (quản đốc, ngân hàng, địa chủ, công nhân…) đưa ra một tình huống. Thời gian dừng lại cho đến khi bạn chọn.

- **Kéo thẻ sang trái** hoặc bấm nút **A** / phím **←** (hoặc `A`) → Phương án A
- **Kéo thẻ sang phải** hoặc bấm nút **B** / phím **→** (hoặc `D`) → Phương án B

Khi kéo, các chấm đen nhấp nháy trên đầu mỗi chỉ số cho biết chỉ số nào sẽ thay đổi. Sau khi chọn, một ô *Học thuật* giải thích khái niệm kinh tế chính trị đằng sau lựa chọn đó.

### 4. Thắng và thua
Mỗi chỉ số chạm **0 hoặc 100** đều kết thúc ván, mỗi trường hợp có một kết cục và phần tổng kết lý luận riêng, ví dụ:

- **v ≤ 0:** Cách mạng vô sản toàn thành
- **c/v ≤ 0:** Phá sản trước sức ép cạnh tranh
- **z+R ≤ 0:** Bị ngân hàng và địa chủ tịch biên
- **m_td ≥ 100:** Tha hóa vì trụy lạc
- Các cực còn lại (c/v ≥ 100, v ≥ 100, z+R ≥ 100, m_td ≤ 0) cũng đều dẫn đến phá sản theo những cách khác nhau.

Vượt qua **20 tình huống** mà không chạm ngưỡng nào để đạt kết cục **Đế chế tư bản độc quyền**.

### 5. Chơi lại
Sau mỗi ván bạn nhận **gia sản thừa kế** tăng thu nhập vĩnh viễn (+15% mỗi điểm). Tiến trình được **tự động lưu** trong trình duyệt, và khi bạn quay lại xưởng sẽ tạo thêm một phần thặng dư trong lúc vắng mặt (tối đa 8 giờ).

## Cấu trúc

| File | Vai trò |
|---|---|
| `index.html` | Các màn hình: bắt đầu, chơi, thẻ bài, kết cục |
| `style.css` | Giao diện kinh dị kiểu Victorian (nhiễu hạt, đèn chập chờn, viền máu) |
| `audio.js` | Nhạc nền hộp nhạc lạc điệu, tiếng drone, chuông, nhịp tim và hiệu ứng (tổng hợp bằng WebAudio) |
| `game.js` | Logic: vòng lặp, chỉ số, thẻ, kết cục, lưu game |
| `data.js` | Thẻ tình huống, nâng cấp, kết cục (theo tài liệu thiết kế) |
| `art.js` | Biểu tượng và chân dung SVG |
| `scene.js` | Cảnh nhà xưởng hoạt hình |
| `t_i_li_u_thi_t_k_game_kinh_t_ch_nh_tr.md` | Tài liệu đặc tả thiết kế gốc |

# The Capitalist: Vòng Xoáy Thặng Dư

Trò chơi web (idle + thẻ bài quẹt) cho học phần **Kinh tế chính trị Mác – Lênin**, Chương 3: Giá trị thặng dư, tích lũy tư bản và phân bổ giá trị thặng dư.

> *"Anh/Chị là một nhà tư bản, sau khi thực hiện hành vi 'bóc lột' giai cấp công nhân thì anh/chị sẽ sử dụng giá trị thặng dư đó như thế nào?"*

## Nội dung học thuật

Toàn bộ thẻ tình huống, ô *Học thuật*, Sổ tay và kết cục bám theo bài giảng **Chương 3: Giá trị thặng dư trong nền kinh tế thị trường** của học phần (slide bài giảng không kèm trong repo): công thức T – H – T', hàng hóa sức lao động, tư bản bất biến/khả biến, m' = m/v, GTTD tuyệt đối/tương đối/siêu ngạch, tích lũy, tích tụ và tập trung, lợi nhuận, lợi tức z, địa tô r. Trích dẫn ghi theo *C. Mác, Tư bản, tập I* (tài liệu tham khảo [4], [5] của bài giảng). Sổ tay có thêm mục **Tóm tắt bài giảng Chương 3** luôn mở.

## Cách chạy

Không cần cài đặt hay build. Mở file `index.html` bằng trình duyệt (Chrome, Edge, Firefox…).
Cần internet ở lần đầu để tải font (Playfair Display, Be Vietnam Pro) hiển thị đúng tiếng Việt.

## Cách chơi

Bạn là nhà tư bản vừa thừa kế một xưởng công nghiệp ở nước Anh thế kỷ 19. Mục tiêu: **giữ cả 4 chỉ số trong khoảng 0–100 và sống sót qua 20 tình huống.**

### Bố cục màn chơi
Mọi thành phần nằm trong một khung giấy viền đồng, từ trên xuống:

1. **Cảnh nhà xưởng**: máy móc và công nhân thay đổi theo c/v và v.
2. **Thanh Tình huống kế tiếp** (màu cam): đếm ngược tới thẻ tiếp theo ("Còn 6s"), nhấp nháy trong 3 giây cuối; nút **Gọi ngay ▸** gọi thẻ ngay.
3. **Bảng điều khiển** (nền sáng): Thặng dư (🪙 … m), Thu nhập (m/s), Tỷ suất m', đời thừa kế & mục tiêu, số tình huống, nút tốc độ, Sổ tay, Kết cục, Nhạc, Âm thanh, **Thoát**.
4. **Bốn chỉ số**: c/v, v, z+r, m_td.
5. **Cửa hàng nâng cấp**: bốn nâng cấp tương ứng bốn chỉ số.

### 1. Thặng dư m tự chảy về
Số **Thặng dư** (hiển thị dạng 🪙 73 *m*) tăng mỗi giây (xem mục *Thu nhập*, đơn vị m/s). Ô **Tỷ suất m'** = m/v cho biết mức bóc lột hiện tại; thanh nhỏ bên dưới chia ngày lao động 12 giờ thành thời gian **cần thiết** (xanh) và **thặng dư** (đỏ), như ví dụ 6h + 6h = 100% trong bài giảng.

- **v thấp** → m' cao, lời nhanh, nhưng công nhân kiệt sức.
- **v cao** → tiền công ăn vào giá trị mới, thu nhập co lại; **v = 100 thì thu nhập bằng 0**.
- **c/v** tăng năng suất đến khoảng 70; cao hơn nữa thì thừa máy, thiếu người, năng suất giảm.

### 2. Bốn chỉ số (bắt đầu ở 50)

| Chỉ số | Ý nghĩa |
|---|---|
| **c/v** – Cấu tạo hữu cơ | Máy móc, công nghệ so với sức lao động |
| **v** – Sức lao động (tư bản khả biến) | Tiền công, giờ làm, điều kiện sống |
| **z+r** – Lợi tức & Địa tô | Phần thặng dư chia cho ngân hàng và chủ đất |
| **m_td** – Quỹ tiêu dùng | Hưởng thụ và địa vị của nhà tư bản |

Cả bốn chỉ số **tự giảm dần theo thời gian**. Hãy dùng m để mua nâng cấp bù lại:

- **Mua máy móc mới** → c/v +8
- **Tăng tiền công & bữa ăn** → v +8
- **Trả lợi tức & địa tô** → z+r +8
- **Chi tiêu xa xỉ** → m_td +8

Mỗi nâng cấp có ô **Giá** (vàng; chuyển đỏ và ghi số còn thiếu khi chưa đủ m) và ô **Cấp** riêng. Giá tăng dần theo mỗi cấp.

### 3. Thẻ tình huống
Khi thanh **Tình huống kế tiếp** chạy đầy, khoảng 12 giây một lần (hoặc bấm **Gọi ngay** / phím `N`), một nhân vật (quản đốc, ngân hàng, địa chủ, công đoàn, thương nhân…) đưa ra một trong 13 thẻ tình huống. Thời gian dừng lại cho đến khi bạn chọn.

- **Kéo thẻ sang trái** hoặc bấm nút **A** / phím **←** (hoặc `A`) → Phương án A
- **Kéo thẻ sang phải** hoặc bấm nút **B** / phím **→** (hoặc `D`) → Phương án B
- Bấm thẳng vào ô nhãn phương án bên dưới thẻ cũng chọn được.

Dưới thẻ, mỗi phương án ghi rõ **chỉ số nào đổi bao nhiêu** và **được/mất bao nhiêu m**. Khi kéo thẻ hoặc rê chuột vào phương án, con số hiện ngay trên đầu từng thanh chỉ số. Nếu phương án tốn m mà bạn không đủ, bạn trả hết số đang có và phải **vay nóng** (z+r −8), điều này cũng được báo trước.

Sau khi chọn, một ô *Học thuật* hiện ở cuối màn hình, giải thích khái niệm kinh tế chính trị đằng sau lựa chọn đó và được lưu vào **Sổ tay học thuật**. Ô tự ẩn sau vài giây; bấm nút **×** (hoặc bấm vào ô) để tắt ngay.

### 3b. Hệ quả về sau (kiểu Reigns)
Một số lựa chọn có nhãn **⏳ có hệ quả về sau**: 2–4 tình huống sau, một thẻ hệ quả (viền đỏ) sẽ quay lại, ví dụ chây ỳ lợi tức thì thừa phát lại tới, phớt lờ Luật Công xưởng thì thanh tra tới. Có 6 thẻ hệ quả; chúng **thay cho** thẻ thường và vẫn tính vào 20 tình huống, nên ván không dài thêm.

### 3c. Đời thừa kế & mục tiêu
Mỗi ván là một đời mới của gia tộc Ashworth (Đời thứ 1, 2, 3…). Mỗi đời nhận ngẫu nhiên **một mục tiêu ngắn** hiển thị trên thanh trạng thái (ví dụ *Đưa c/v lên 70*, *Đạt m' ≥ 200%*, *Mua 3 cấp máy móc*). Đạt mục tiêu được **+2 gia sản thừa kế** khi kết thúc ván, thắng hay thua đều được.

### 4. Thắng và thua
Có **9 kết cục**. Mỗi chỉ số chạm **0 hoặc 100** đều kết thúc ván (8 kết cục thua), mỗi trường hợp có phần tổng kết lý luận và ô *Vì sao?* riêng, ví dụ:

- **v ≤ 0:** Cách mạng vô sản toàn thành
- **c/v ≤ 0:** Phá sản trước sức ép cạnh tranh
- **z+r ≤ 0:** Bị ngân hàng và địa chủ tịch biên
- **m_td ≥ 100:** Tha hóa vì trụy lạc
- Các cực còn lại cũng có kết cục riêng: **c/v ≥ 100** khủng hoảng sản xuất thừa, **v ≥ 100** nhà từ thiện ảo tưởng, **z+r ≥ 100** lệ thuộc tín dụng, **m_td ≤ 0** mất uy tín xã hội.

Vượt qua **20 tình huống** mà không chạm ngưỡng nào để đạt kết cục **Đế chế tư bản độc quyền** (có nền riêng).

### 5. Điều khiển nhịp chơi & âm thanh

| Nút / phím | Tác dụng |
|---|---|
| `❚❚` `1×` `2×` `3×` (Space, 1, 2, 3) | Tạm dừng / đổi tốc độ |
| **Gọi ngay** (N) | Gọi tình huống kế tiếp ngay |
| **Sổ tay** | Xem lại mọi ô *Học thuật* đã mở (42 mục, kể cả thẻ hệ quả), phần giải thích mở rộng và tóm tắt bài giảng |
| **Kết cục** | Bộ sưu tập 9 kết cục: đã đạt / chưa đạt kèm điều kiện |
| **Nhạc** (M) | Bật/tắt nhạc nền (điệu valse; chuyển giọng thứ khi gặp nguy) |
| **Âm thanh** | Bật/tắt tiếng nhà xưởng và hiệu ứng |
| **Thoát** | Bỏ ván đang chơi và về màn hình chính (có hỏi xác nhận) |

### 6. Chơi lại
Sau mỗi ván bạn nhận **gia sản thừa kế** tăng thu nhập vĩnh viễn (+10% mỗi điểm, tối đa ×2,5). Thắng được +5 trở lên, thua chỉ được +1. Tiến trình được **tự động lưu** trong trình duyệt. Khi mở lại trang, màn hình chính có nút **Tiếp tục ván đang chơi**; ván chơi một mình còn được cộng thêm một phần thặng dư tạo ra trong lúc vắng mặt (tối đa 8 giờ). Bắt đầu ván mới khi còn ván dở thì game hỏi trước khi bỏ ván đó.

## Chơi theo phòng (kiểu Kahoot)

Giáo viên bấm **Tạo phòng (giáo viên)** để nhận **mã PIN 6 số** và màn hình bảng xếp hạng (chiếu lên máy chiếu). Người chơi bấm **Vào phòng bằng mã PIN**, nhập mã và tên, rồi chơi. Bảng xếp hạng cập nhật trực tiếp trong lúc chơi; khi kết thúc, người chơi thấy hạng của mình.

- Mọi người trong phòng gặp **cùng thứ tự thẻ tình huống** và **cùng mục tiêu**; gia sản thừa kế không được tính, nên ai cũng xuất phát như nhau.
- Xếp hạng: **thắng** trước, rồi **số tình huống vượt qua**, rồi **tổng thặng dư tích lũy**.
- Mỗi tên chỉ chơi một lượt trong một phòng. Muốn chơi lại thì vào bằng tên khác.
- Người chơi bấm **Thoát** giữa chừng thì tên bị xóa khỏi bảng xếp hạng (có thể vào lại bằng tên cũ).
- Giáo viên bấm **Kết thúc & xóa phòng** để xóa phòng và toàn bộ kết quả của phòng.
- Có thể gửi link dạng `…/?room=123456` để mở sẵn màn hình nhập tên.

### Cài đặt máy chủ (một lần, miễn phí)
Phòng chơi dùng [Supabase](https://supabase.com) làm cơ sở dữ liệu. Nếu chưa cấu hình, game vẫn chơi một mình bình thường và ẩn các nút phòng.

1. Tạo tài khoản và một project mới trên Supabase.
2. Vào **SQL Editor**, dán toàn bộ nội dung `supabase.sql`, bấm **Run**.
3. Vào **Project Settings → API**, chép **Project URL** và khóa công khai (**publishable** hoặc **anon**) vào `config.js`.
4. Commit và đẩy lên GitHub Pages như bình thường.

Đã cài từ trước? Chạy lại toàn bộ `supabase.sql` (an toàn khi chạy nhiều lần) để có quyền xóa phòng và thoát phòng. Muốn dọn dữ liệu thủ công: trong SQL Editor chạy `delete from rooms;` (xóa mọi phòng và kết quả) hoặc `delete from rooms where created_at < now() - interval '1 day';` (chỉ phòng cũ hơn 1 ngày).

Khóa công khai được phép để trong mã trình duyệt. **Không** dùng khóa `service_role` / secret. Game không chống gian lận: điểm được tính trên máy người chơi.

## Cấu trúc

| File | Vai trò |
|---|---|
| `index.html` | Các màn hình: bắt đầu, vào phòng, phòng của giáo viên, chơi, thẻ bài, kết cục |
| `style.css` | Giao diện kiểu Victorian |
| `game.js` | Logic: vòng lặp, chỉ số, thẻ, kết cục, tốc độ, sổ tay, bộ sưu tập, lưu game |
| `data.js` | Nội dung: thẻ tình huống, thẻ hệ quả, nâng cấp, kết cục, mục tiêu mỗi đời, tóm tắt bài giảng |
| `art.js` | Biểu tượng và chân dung SVG |
| `scene.js` | Cảnh nhà xưởng hoạt hình |
| `factory.js` | Âm thanh nền nhà xưởng: tiếng máy ù, khung dệt, hơi nước, búa (tổng hợp bằng WebAudio) |
| `music.js` | Nhạc nền valse tổng hợp bằng WebAudio |
| `online.js` | Chơi theo phòng: gọi Supabase, bảng xếp hạng, bộ sinh số ngẫu nhiên theo hạt giống |
| `config.js` | Địa chỉ và khóa công khai Supabase (để trống = chỉ chơi một mình) |
| `supabase.sql` | Tạo bảng `rooms`, `players` và quyền truy cập trên Supabase |
| `t_i_li_u_thi_t_k_game_kinh_t_ch_nh_tr.md` | Tài liệu đặc tả thiết kế (đã cập nhật khớp với game) |

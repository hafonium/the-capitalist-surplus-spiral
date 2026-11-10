# TÀI LIỆU ĐẶC TẢ THIẾT KẾ TRÒ CHƠI (GAME DESIGN SPECIFICATION)
### Tên dự án: **The Capitalist: Vòng Xoáy Thặng Dư** *(The Surplus Spiral)*
*Dự án trò chơi web tương tác phục vụ học phần Kinh tế chính trị Mác – Lênin*  
*Chủ đề: Chương 3 – Giá trị thặng dư trong nền kinh tế thị trường (Trọng tâm: Tích lũy tư bản và phân bổ giá trị thặng dư)*

---

## 1. TỔNG QUAN DỰ ÁN & CƠ SỞ HỌC THUẬT

### 1.1. Câu hỏi cốt lõi từ giảng viên
> *"Anh/Chị là một nhà tư bản, sau khi thực hiện hành vi 'bóc lột' giai cấp công nhân thì anh/chị sẽ sử dụng giá trị thặng dư đó như thế nào?"*

### 1.2. Bản chất Kinh tế chính trị Mác - Lênin
1. **Nguồn gốc giá trị thặng dư ($m$):** Do hao phí lao động sống của công nhân làm thuê ($v$) tạo ra trong quá trình sản xuất trực tiếp. Nhà tư bản mua hàng hóa sức lao động theo đúng giá trị thị trường thông qua hợp đồng lao động "hợp pháp", nhưng giá trị sử dụng đặc biệt của sức lao động là tạo ra một lượng giá trị mới dôi ra ngoài giá trị bản thân nó.
2. **Quy luật sử dụng thặng dư:** Nhà tư bản sau khi bán hàng hóa ($H' - T'$) thu về tiền tệ kèm thặng dư bắt buộc phải phân bổ $m$ vào các mục đích:
   * **Tích lũy tư bản (Tái sản xuất mở rộng):** Mua thêm tư liệu sản xuất ($c$), thuê thêm lao động làm thuê ($v$), đổi mới công nghệ nhằm nâng cao cấu tạo hữu cơ ($c/v$) để bóc lột giá trị thặng dư tương đối và siêu ngạch.
   * **Chi trả các nghĩa vụ chuyển hóa:** Nộp **Lợi tức ($z$)** cho nhà tư bản cho vay và trả **Địa tô ($R$)** (địa tô tuyệt đối, địa tô chênh lệch) cho chủ đất để duy trì mặt bằng, hầm mỏ.
   * **Quỹ tiêu dùng cá nhân ($m_{td}$):** Chi tiêu mua sắm xa xỉ phẩm, tiệc tùng và duy trì địa vị xã hội của gia tộc tư bản.

### 1.3. Thể loại & Mô hình tham chiếu
* **Thể loại:** Trò chơi thẻ bài đưa ra quyết định dạng narrative / Quản lý cân bằng tài nguyên (Decision Card-Swipe / Resource Balancing).
* **Game tham chiếu:** Mô phỏng cơ chế quẹt thẻ nhị phân (Swipe Trái / Phải) của *Reigns*.
* **Nền tảng triển khai:** Web Application đơn trang (SPA - HTML5/CSS/JS), tối ưu hóa hiển thị trên màn chiếu máy tính lớn và trình duyệt di động (quét mã QR để cùng chơi).

---

## 2. BỐI CẢNH NARRATIVE & HỆ THỐNG NHÂN VẬT

### 2.1. Bối cảnh lịch sử
* **Không gian & Thời gian:** Nửa cuối thế kỷ 19 – thời kỳ Cách mạng Công nghiệp lần thứ hai tại Anh. Quá trình cạnh tranh tự do đang phát triển mạnh mẽ và bắt đầu bước sang giai đoạn tích tụ, tập trung tư bản.
* **Vai diễn của người chơi:** Thừa kế một xưởng công nghiệp gia đình, vừa kết thúc chu kỳ kinh doanh đầu tiên và thu về cọc tiền thặng dư đầu tiên.

### 2.2. Dàn nhân vật diện kiến (NPC Cards)
1. **Quản đốc xưởng:** Đại diện cho xu hướng kéo dài ngày lao động để bóc lột **giá trị thặng dư tuyệt đối**.
2. **Kỹ sư trưởng:** Đại diện cho tiến bộ khoa học kỹ thuật, đòi hỏi đầu tư máy móc tự động hóa để tăng **cấu tạo hữu cơ ($c/v$)** và khai thác **giá trị thặng dư tương đối / siêu ngạch**.
3. **Chủ ngân hàng (Tư bản cho vay):** Định kỳ đòi hỏi thanh toán **lợi tức ($z$)** từ thặng dư, đe dọa phát mại tài sản.
4. **Bá tước / Địa chủ:** Sở hữu mặt bằng đất đai, nhà xưởng và hầm mỏ, liên tục đòi tăng **địa tô tuyệt đối** và **địa tô chênh lệch**.
5. **Thủ lĩnh Công đoàn:** Đại diện cho phong trào công nhân, cảnh báo giới hạn bần cùng hóa và sẵn sàng phát động bãi công, đập phá máy móc.
6. **Người vợ / Giới thượng lưu:** Đòi hỏi trích thặng dư vào **quỹ tiêu dùng cá nhân** để phô trương quyền quý.

---

## 3. QUY CHUẨN ĐỒ HỌA & ÂM THANH (ART & AUDIO DIRECTION)

### 3.1. Phong cách mỹ thuật (Art Style)
* **Phong cách chủ đạo:** **Victorian Retro-Woodcut & Steampunk Minimalist** (Phong cách tranh khắc gỗ báo chí thế kỷ 19 kết hợp đồ họa vector phẳng tối giản).
* **Cảm hứng trực quan:**
  * Bức họa nhà tư bản béo tròn ngậm xì gà, nhấp rượu vang bên cạnh cọc tiền dày.
  * Khung cảnh nhà xưởng khói than mù mịt, dây chuyền máy móc đan xen công nhân cặm cụi.
  * Các bích họa đấu tranh giai cấp và cách mạng vô sản của thế kỷ 19 - 20.

### 3.2. Bảng màu quy chuẩn (Color Palette)
* **Màu nền (Background):** Nền giấy da cổ điển pha vệt ố vàng (`#F4ECD8`) hoặc chế độ nền tối than đá (`#1A1918`).
* **Màu chỉ số trạng thái (Status Meters):**
  * Bánh răng ($c/v$): Xanh lam công nghiệp (`#1976D2`).
  * Nắm đấm công nhân ($v$): Đỏ bầm tranh đấu (`#C62828`).
  * Cán cân khế ước ($z + R$): Tím quý tộc ngân hàng (`#6A1B9A`).
  * Chiếc mũ chóp ($m_{td}$): Vàng kim tài phiệt (`#FBC02D`).

### 3.3. Thiết kế thành phần giao diện (UI Specs)
* **Header Bar:** Đặt cố định đỉnh màn hình với 4 biểu tượng chỉ số kèm thanh trượt dung lượng (0% – 100%). Xuất hiện chấm tròn nhấp nháy chỉ báo tăng/giảm khi người chơi bắt đầu kéo thẻ bài.
* **Card Frame:** Tỷ lệ khung hình chuẩn 3:4 bo góc, viền đồng thau cổ điển. Phía trên là hình vẽ chân dung bán thân của NPC, phía dưới là tên/chức danh và hộp thoại ngắn gọn.
* **Swipe Overlay:** Khi kéo sang trái hiện mộc đỏ **[PHƯƠNG ÁN A]**; khi kéo sang phải hiện mộc xanh **[PHƯƠNG ÁN B]**.
* **Phím bấm hỗ trợ:** Cung cấp 2 nút bấm vật lý hình tròn ở góc đáy (Nút Đỏ - Trái và Nút Xanh - Phải) phục vụ người chơi dùng chuột hoặc bút trình chiếu slide.

### 3.4. Âm thanh tương tác (SFX & Audio)
* Tiếng xột xoạt của bìa giấy thô khi vuốt thẻ bài.
* Tiếng búa đập đe dứt khoát khi chốt phương án.
* Tiếng leng keng của cọc tiền vàng khi thu lợi nhuận.
* Tiếng xả van hơi nước áp lực cao khi máy móc vận hành.
* Tiếng còi báo động và tiếng hò hét khi công nhân bãi công.
* Tiếng chuông nhà thờ điểm u ám khi rơi vào Game Over.

---

## 4. CƠ CHẾ GAMEPLAY & QUY TẮC VẬN HÀNH

### 4.1. Bốn thanh chỉ số cân bằng sinh tồn
Mỗi chỉ số dao động từ **0 đến 100 điểm**, giá trị khởi đầu là **50 điểm**:

$$\text{Trạng thái sống: } 0 < \text{Chỉ số} < 100$$

1. **Cấu tạo hữu cơ của tư bản ($c/v$):**
   * Tỷ lệ giữa tư bản bất biến (máy móc, thiết bị, nguyên vật liệu) và tư bản khả biến (tiền công sức lao động).
   * Tăng khi mua máy móc hiện đại, tự động hóa dây chuyền, ứng dụng khoa học kỹ thuật.
   * Giảm khi máy móc hư hỏng, hao mòn vô hình/hữu hình mà không được trích vốn bảo dưỡng.
2. **Sức bền giai cấp công nhân ($v$):**
   * Thể hiện điều kiện tái sản xuất sức lao động, tiền lương thực tế và mức độ chịu đựng bóc lột của người làm thuê.
   * Tăng khi tăng lương, rút ngắn giờ làm, cải thiện bữa ăn và an toàn lao động.
   * Giảm khi tăng ca kiệt sức, sa thải thợ hàng loạt do tự động hóa, ép tiền lương dưới mức sống tối thiểu.
3. **Nghĩa vụ tài chính & Đất đai ($z + R$):**
   * Mức độ thực hiện việc trích chia GTTD cho nhà tư bản cho vay (Lợi tức $z$) và chủ đất (Địa tô $R$).
   * Tăng khi thanh toán nợ ngân hàng đúng hạn, nộp đủ tiền thuê mặt bằng và hầm mỏ.
   * Giảm khi chây ỳ nợ, dây dưa không chịu chia sẻ thặng dư.
4. **Quỹ tiêu dùng cá nhân ($m_{td}$):**
   * Quy mô hưởng thụ, xa xỉ phẩm và phô trương thanh thế của bản thân nhà tư bản.
   * Tăng khi mua dinh thự, du thuyền, trang sức, bảo trợ nghệ thuật.
   * Giảm khi thắt lưng buộc bụng để dồn hết thặng dư vào tái sản xuất mở rộng.

### 4.2. Điều kiện Game Over (Ngưỡng 0% và 100%)
* **$c/v \le 0$:** Lạc hậu công nghệ $\rightarrow$ Chi phí cá biệt cao hơn chi phí thị trường $\rightarrow$ Bị đối thủ cạnh tranh đè bẹp, phá sản, thoái hóa thành tiểu tư sản vỡ nợ.
* **$c/v \ge 100$:** Đầu tư máy móc quá mức $\rightarrow$ Khủng hoảng sản xuất thừa, ứ đọng vốn, máy móc rỉ sét vì thiếu thợ vận hành.
* **$v \le 0$:** Bần cùng hóa chạm đáy $\rightarrow$ Công nhân bãi công toàn xưởng, đập phá máy móc, cách mạng vô sản nổ ra lật đổ giai cấp tư sản.
* **$v \ge 100$:** "Nhà từ thiện ảo tưởng" $\rightarrow$ Trả lương quá cao khiến chi phí sản xuất $k$ vượt quá giá trị bán ra $\rightarrow$ Triệt tiêu hoàn toàn thặng dư, doanh nghiệp giải thể.
* **$z + R \le 0$:** Không trả lợi tức và địa tô $\rightarrow$ Ngân hàng phát mại, tòa án niêm phong nhà máy.
* **$z + R \ge 100$:** Lệ thuộc tín dụng $\rightarrow$ Bị giới ngân hàng chuyển đổi nợ thành cổ phần chi phối, tước quyền điều hành xưởng.
* **$m_{td} \le 0$:** Mất uy tín xã hội $\rightarrow$ Bị giới thượng lưu tẩy chay, ngân hàng hạ hạn mức tín dụng cá nhân.
* **$m_{td} \ge 100$:** Tha hóa vì trụy lạc $\rightarrow$ Chìm trong tiệc tùng thâu đêm, thủ quỹ bỏ trốn, xưởng bị thâu tóm lén lút.

---

## 5. NGÂN HÀNG TÌNH HUỐNG HỌC THUẬT (CARD EVENT REPOSITORY)

### THẺ 01: Lựa chọn Phương pháp bóc lột
* **Nhân vật:** Quản đốc xưởng (cầm đồng hồ bấm giờ).
* **Lời thoại:** *"Đơn hàng dệt đang dồn ứ! Ta nên bắt công nhân tăng ca từ 10 tiếng lên 14 tiếng mỗi ngày, hay trích thặng dư mua máy dệt con thoi bay mới?"*
* **Lựa chọn Trái (Bóc lột Tuyệt đối):** *"Bắt tăng ca! Tiền công giữ nguyên, kéo dài ngày làm việc!"*
  * *Học thuật:* Kéo dài ngày lao động vượt quá thời gian cần thiết (GTTD tuyệt đối).
  * *Chỉ số:* $v$ (-20), $m_{td}$ (+15), $c/v$ (0).
* **Lựa chọn Phải (Bóc lột Tương đối):** *"Trích $m$ mua máy dệt mới, tăng năng suất xã hội."*
  * *Học thuật:* Tăng cấu tạo hữu cơ $c/v$, rút ngắn thời gian cần thiết (GTTD tương đối).
  * *Chỉ số:* $c/v$ (+15), $v$ (-5), $m_{td}$ (-10).

---

### THẺ 02: Luật Công xưởng và Lao động Trẻ em
* **Nhân vật:** Nữ công nhân dắt theo con nhỏ 9 tuổi.
* **Lời thoại:** *"Nghị viện vừa ban hành Luật Công xưởng! Xin ông chủ giảm giờ làm của phụ nữ xuống 10 tiếng và cho trẻ em đến trường."*
* **Lựa chọn Trái (Phớt lờ pháp luật):** *"Ở đây tôi là luật! Tiếp tục ca kíp như cũ."*
  * *Học thuật:* Tư bản cố tình vượt giới hạn thể chất và luân lý để bòn rút lao động thặng dư.
  * *Chỉ số:* $v$ (-25), $m_{td}$ (+10), $z + R$ (-10).
* **Lựa chọn Phải (Tuân thủ luật pháp):** *"Chấp thuận. Giảm giờ làm xuống 10 tiếng theo luật."*
  * *Học thuật:* Giới hạn thời gian thặng dư tuyệt đối, tỷ suất bóc lột $m'$ giảm.
  * *Chỉ số:* $v$ (+20), $m_{td}$ (-15).

---

### THẺ 03: Kỳ hạn Thanh toán Lợi tức Ngân hàng
* **Nhân vật:** Giám đốc Ngân hàng Luân Đôn (cầm khế ước vay).
* **Lời thoại:** *"Đến kỳ trả lãi vay mua lò hơi nước rồi thưa ngài. Hãy trích nộp phần lợi tức $z$ từ khoản thặng dư quý này, hoặc chúng tôi phong tỏa tài khoản!"*
* **Lựa chọn Trái (Chây ỳ không trả):** *"Hãy đợi đấy! Tiền đó tôi đang dồn mở rộng quy mô xưởng."*
  * *Học thuật:* Chiếm dụng lợi tức thuộc về tư bản cho vay.
  * *Chỉ số:* $z + R$ (-30), $m_{td}$ (+10).
* **Lựa chọn Phải (Thanh toán lợi tức):** *"Thanh toán sòng phẳng theo đúng tỷ suất lợi tức $z'$."*
  * *Học thuật:* Cắt một phần lợi nhuận bình quân chuyển hóa thành lợi tức cho ngân hàng.
  * *Chỉ số:* $z + R$ (+20), $m_{td}$ (-15).

---

### THẺ 04: Chủ đất Đòi Tăng Địa tô
* **Nhân vật:** Bá tước Địa chủ (cầm văn bản quyền sở hữu ruộng đất).
* **Lời thoại:** *"Mảnh đất xưởng của ngài sát cạnh đường sắt mới khánh thành. Tôi yêu cầu tăng cả Địa tô Tuyệt đối lẫn Địa tô Chênh lệch!"*
* **Lựa chọn Trái (Từ chối đóng thêm):** *"Vô lý! Đất đai tự nó không tạo ra một đồng thặng dư nào cả!"*
  * *Học thuật:* Mâu thuẫn chia chác thặng dư giữa tư bản công nghiệp và địa chủ.
  * *Chỉ số:* $z + R$ (-25), $c/v$ (-5).
* **Lựa chọn Phải (Chấp nhận nộp tô):** *"Trích phần thặng dư siêu ngạch để thanh toán địa tô."*
  * *Học thuật:* Địa tô là hình thái thặng dư dôi ra ngoài lợi nhuận bình quân mà nhà tư bản trả cho chủ đất.
  * *Chỉ số:* $z + R$ (+15), $m_{td}$ (-20).

---

### THẺ 05: Thâu tóm đối thủ (Tích tụ vs Tập trung tư bản)
* **Nhân vật:** Cố vấn Pháp lý (ôm tài liệu sáp nhập doanh nghiệp).
* **Lời thoại:** *"Xưởng đúc than bên cạnh vừa phá sản vì khủng hoảng thừa. Ngài muốn mở rộng xưởng mình từ từ, hay vay vốn nuốt chửng xưởng của họ?"*
* **Lựa chọn Trái (Tích tụ tư bản):** *"Mở rộng bằng thặng dư tự tích lũy, đi từng bước vững chắc."*
  * *Học thuật:* Tích lũy tư bản cá biệt làm tăng quy mô tư bản một cách tuần tự.
  * *Chỉ số:* $c/v$ (+10), $m_{td}$ (-10), $z + R$ (+5).
* **Lựa chọn Phải (Tập trung tư bản):** *"Vay ngân hàng thâu tóm ngay! Thôn tính để chiếm độc quyền!"*
  * *Học thuật:* Hợp nhất nhiều tư bản cá biệt thành tư bản lớn thông qua cạnh tranh và tín dụng.
  * *Chỉ số:* $c/v$ (+25), $z + R$ (-20), $v$ (-10).

---

### THẺ 06: Mua sắm Du thuyền & Biệt thự Thượng lưu
* **Nhân vật:** Phu nhân Nhà tư bản (áo lông thú sang trọng).
* **Lời thoại:** *"Các gia tộc than thép đều đã sắm du thuyền sang Pháp nghỉ hè. Ngài định vùi đầu mãi vào đống dầu mỡ mà không màng danh tiếng gia tộc sao?"*
* **Lựa chọn Trái (Tiết chế chi tiêu):** *"Thặng dư phải quay lại dây chuyền! Tái đầu tư mới là mạng sống."*
  * *Học thuật:* Hạn chế tiêu dùng cá nhân để tối đa hóa quy mô tích lũy tái sản xuất mở rộng.
  * *Chỉ số:* $m_{td}$ (-25), $c/v$ (+15).
* **Lựa chọn Phải (Ăn chơi xa xỉ):** *"Mua biệt thự bên bờ biển và mở vũ hội 3 đêm liền!"*
  * *Học thuật:* Chuyển hóa một phần lớn $m$ thành quỹ tiêu dùng phi sản xuất của tư sản.
  * *Chỉ số:* $m_{td}$ (+30), $c/v$ (-20).

---

### THẺ 07: Thắc mắc về Hợp đồng Lao động "Hợp pháp"
* **Nhân vật:** Thợ tiện trẻ đại diện nhóm công nhân có học thức.
* **Lời thoại:** *"Chúng tôi tạo ra giá trị mới gấp đôi tiền lương nhận được. Ông chủ đang bóc lột trắng trợn sức lao động của chúng tôi!"*
* **Lựa chọn Trái (Đàn áp, sa thải):** *"Cút đi! Đội quân thất nghiệp ngoài cổng đang thèm khát chỗ này!"*
  * *Học thuật:* Dùng áp lực nhân công dư thừa để hạ thấp giá cả sức lao động.
  * *Chỉ số:* $v$ (-25), $m_{td}$ (+10).
* **Lựa chọn Phải (Ngụy biện bằng Hợp đồng):** *"Tôi mua sức lao động đúng giá trị thị trường, đây là sự may mắn hợp pháp của tôi!"*
  * *Học thuật:* Bản chất thần bí của tiền công làm lu mờ sự phân chia giữa lao động cần thiết và thặng dư.
  * *Chỉ số:* $v$ (-10), $z + R$ (+5).

---

## 6. HỆ THỐNG MÀN HÌNH KẾT CỤC & TỔNG KẾT HỌC THUẬT

Khi một chỉ số chạm ngưỡng vi phạm hoặc người chơi hoàn thành xuất sắc 20 lượt, trò chơi chuyển sang **Màn hình Tổng kết Lý luận (Debriefing Screen)**:

1. **KẾT CỤC: CÁCH MẠNG VÔ SẢN TOÀN THÀNH ($v \le 0$)**
   * *Hình ảnh:* Ngọn cờ công nhân cắm trên nóc xưởng máy, cánh cổng nhà máy bị phá vỡ.
   * *Tổng kết học thuật:* *"Bạn đã bóc lột đến giọt mồ hôi cuối cùng mà không trích thặng dư duy trì điều kiện sống cho công nhân. Theo Karl Marx, khi sự bần cùng hóa của giai cấp vô sản chạm tới điểm giới hạn, mâu thuẫn giai cấp đối kháng sẽ tất yếu dẫn tới một cuộc cách mạng vô sản để tước đoạt lại tư liệu sản xuất!"*
2. **KẾT CỤC: PHÁ SẢN TRƯỚC SỨC ÉP CẠNH TRANH ($c/v \le 0$)**
   * *Hình ảnh:* Khung cảnh nhà xưởng hoang tàn, máy móc thủ công phủ đầy mạng nhện.
   * *Tổng kết học thuật:* *"Bạn đã tiêu dùng thặng dư vào hưởng lạc cá nhân thay vì tái đầu tư công nghệ. Các nhà tư bản đối thủ đã nâng cao cấu tạo hữu cơ ($c/v$), chiếm đoạt thặng dư siêu ngạch và hạ giá bán đè bẹp xưởng của bạn. Bạn đã chính thức gia nhập tầng lớp tiểu tư sản bị phá sản!"*
3. **KẾT CỤC: TỊCH BIÊN BỞI LIÊN MINH NGÂN HÀNG & ĐỊA CHỦ ($z + R \le 0$)**
   * *Hình ảnh:* Dấu niêm phong của tòa án dán kín cửa xưởng; cảnh sát áp giải nhà tư bản.
   * *Tổng kết học thuật:* *"Bạn lầm tưởng toàn bộ giá trị thặng dư đều thuộc về mình! Trong kinh tế thị trường, tư bản công nghiệp bắt buộc phải chia thặng dư thành lợi tức ($z$) cho ngân hàng và địa tô ($R$) cho chủ đất. Vi phạm luật chơi của giới tài phiệt, bạn đã bị cỗ máy tín dụng nghiền nát."*
4. **KẾT CỤC: THA HÓA VÌ TRỤY LẠC ($m_{td} \ge 100$)**
   * *Hình ảnh:* Lâu đài bừa bãi tiệc rượu; kế toán trưởng ôm két sắt thặng dư trốn ra nước ngoài.
   * *Tổng kết học thuật:* *"Bạn đem toàn bộ thặng dư đi ăn chơi trác táng. Nhà tư bản đã ngừng đóng vai trò 'kẻ chỉ huy quá trình sản xuất' để biến thành kẻ ăn bám ký sinh. Toàn bộ cơ nghiệp của bạn bị xâu xé và biến mất khỏi thương trường!"*
5. **KẾT CỤC: ĐẾ CHẾ TƯ BẢN ĐỘC QUYỀN (Vượt qua 20 lượt chơi)**
   * *Hình ảnh:* Tổ hợp nhà máy khổng lồ bằng thép vươn cao; đối thủ và công nhân phục tùng.
   * *Tổng kết học thuật:* *"Chúc mừng! Bạn đã nắm vững bản chất tích lũy và tập trung tư bản. Bạn vừa nâng cao cấu tạo hữu cơ $c/v$, vừa làm tròn nghĩa vụ chia chác lợi tức, địa tô, đồng thời duy trì công nhân ở mức 'đủ sống để tiếp tục làm thuê'. Bạn là hiện thân hoàn hảo của phương thức sản xuất tư bản chủ nghĩa!"*

---
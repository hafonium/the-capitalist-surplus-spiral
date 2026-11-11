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
   * **Chi trả các nghĩa vụ chuyển hóa:** Nộp **Lợi tức ($z$)** cho nhà tư bản cho vay và trả **Địa tô ($r$)** (địa tô tuyệt đối, địa tô chênh lệch) cho chủ đất để duy trì mặt bằng, hầm mỏ.
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
7. **Thợ (nữ công nhân, thợ tiện trẻ):** Tiếng nói trực tiếp của người lao động về ngày lao động và tiền công.
8. **Cố vấn Pháp lý, Thương nhân bán buôn, Môi giới chứng khoán, Kế toán trưởng, Nhà tư bản đối thủ:** Đưa ra các tình huống về tích tụ – tập trung, lợi nhuận thương nghiệp, tư bản giả, khủng hoảng chu kỳ, cạnh tranh và độc quyền.

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
  * Cán cân khế ước ($z + r$): Tím quý tộc ngân hàng (`#6A1B9A`).
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
2. **Sức lao động / tư bản khả biến ($v$):**
   * Thể hiện điều kiện tái sản xuất sức lao động, tiền lương thực tế và mức độ chịu đựng bóc lột của người làm thuê.
   * Tăng khi tăng lương, rút ngắn giờ làm, cải thiện bữa ăn và an toàn lao động.
   * Giảm khi tăng ca kiệt sức, sa thải thợ hàng loạt do tự động hóa, ép tiền lương dưới mức sống tối thiểu.
3. **Nghĩa vụ tài chính & Đất đai ($z + r$):**
   * Mức độ thực hiện việc trích chia GTTD cho nhà tư bản cho vay (Lợi tức $z$) và chủ đất (Địa tô $r$).
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
* **$z + r \le 0$:** Không trả lợi tức và địa tô $\rightarrow$ Ngân hàng phát mại, tòa án niêm phong nhà máy.
* **$z + r \ge 100$:** Lệ thuộc tín dụng $\rightarrow$ Bị giới ngân hàng chuyển đổi nợ thành cổ phần chi phối, tước quyền điều hành xưởng.
* **$m_{td} \le 0$:** Mất uy tín xã hội $\rightarrow$ Bị giới thượng lưu tẩy chay, ngân hàng hạ hạn mức tín dụng cá nhân.
* **$m_{td} \ge 100$:** Tha hóa vì trụy lạc $\rightarrow$ Chìm trong tiệc tùng thâu đêm, thủ quỹ bỏ trốn, xưởng bị thâu tóm lén lút.

---

## 5. NGÂN HÀNG TÌNH HUỐNG HỌC THUẬT (CARD EVENT REPOSITORY)

*Gồm 13 thẻ, nội dung bám theo bài giảng Chương 3 (“Giá trị thặng dư trong nền kinh tế thị trường”). Trích dẫn “Tư bản, Q.I” là C. Mác, Tư bản, tập I, quyển 1, NXB Sự Thật, 1984 (tài liệu tham khảo [4], [5] của bài giảng). Ngoài thay đổi chỉ số, nhiều phương án còn làm được/mất thặng dư $m$ (xem mục 7.2).*

### THẺ 01: GTTD tuyệt đối và GTTD tương đối
* **Nhân vật:** Quản đốc xưởng.
* **Lời thoại:** *"Thợ đang làm 12 giờ: 6 giờ lao động cần thiết, 6 giờ lao động thặng dư, m' = 100%. Đơn hàng dồn ứ! Bắt tăng ca lên 14 giờ, hay trích m mua máy dệt mới?"*
* **Lựa chọn Trái (A):** *"Tăng ca 14 giờ! Tiền công giữ nguyên."*
  * *Học thuật:* GTTD tuyệt đối: kéo dài tuyệt đối ngày lao động khi thời gian lao động cần thiết không đổi (6h cần thiết + 8h thặng dư → m' = 133%).
  * *Chỉ số:* $v$ (-20), $m_{td}$ (+15), thặng dư $m$ (+20 giây thu nhập).
* **Lựa chọn Phải (B):** *"Trích m mua máy dệt mới."*
  * *Học thuật:* GTTD tương đối: tăng năng suất lao động xã hội, rút ngắn thời gian lao động cần thiết (ngày 8h: 6h–2h thành 4h–4h, m' từ 33% lên 100%).
  * *Chỉ số:* $c/v$ (+15), $v$ (-5), $m_{td}$ (-10), thặng dư $m$ (-25 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Ngày lao động gồm thời gian lao động cần thiết (tái sản xuất giá trị sức lao động) và thời gian lao động thặng dư (tạo ra m). "Lao động thặng dư và lao động cần thiết khó nhận thấy do chúng bị nhập cục vào với nhau" (Tư bản, Q.I, tr.302). Tăng m bằng cách kéo dài ngày lao động là phương pháp tuyệt đối; rút ngắn phần cần thiết nhờ máy móc, công nghệ, quản lý mới là phương pháp tương đối.

---

### THẺ 02: Luật Công xưởng và giới hạn ngày lao động
* **Nhân vật:** Nữ công nhân & con nhỏ.
* **Lời thoại:** *"Luật Công xưởng đã giới hạn 10 giờ mỗi ngày cho phụ nữ và thiếu niên 13–18 tuổi. Vậy mà xưởng này vẫn bắt làm 14 giờ, con bé 9 tuổi nhà tôi cũng phải vào ca!"*
* **Lựa chọn Trái (A):** *"Ở đây tôi là luật! Ca kíp như cũ."*
  * *Học thuật:* Bóc lột sức lao động giữa thế kỷ XIX: ngày làm 15h, 12h; trẻ em 9 tuổi vào công xưởng; tiền công rẻ mạt; điều kiện sống tồi tàn.
  * *Chỉ số:* $v$ (-25), $m_{td}$ (+10), $z + r$ (-10), thặng dư $m$ (+10 giây thu nhập).
* **Lựa chọn Phải (B):** *"Tuân thủ luật: 10 giờ mỗi ngày."*
  * *Học thuật:* Pháp luật giới hạn độ dài ngày lao động, thu hẹp thời gian lao động thặng dư nên tỷ suất m' giảm.
  * *Chỉ số:* $v$ (+20), $m_{td}$ (-15), thặng dư $m$ (-10 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Luật Công xưởng ở Anh: năm 1833 ngày lao động 15h (5h30–20h30) với người trưởng thành, 12h với thiếu niên 13–18 tuổi; 1844–1847 còn 12h; từ 1/7/1847 còn 11h với thiếu niên và nữ công nhân, từ 1/1848 còn 10h. Năm 1886 công nhân Mỹ đấu tranh đòi ngày làm 8h. Đó là cuộc đấu tranh trực tiếp về độ dài của lao động thặng dư.

---

### THẺ 03: Tư bản cho vay và lợi tức (z)
* **Nhân vật:** Giám đốc Ngân hàng Luân Đôn.
* **Lời thoại:** *"Đến kỳ trả lãi khoản vay mua lò hơi nước rồi thưa ngài. Hãy trích nộp lợi tức z từ lợi nhuận quý này, hoặc chúng tôi phong tỏa tài khoản!"*
* **Lựa chọn Trái (A):** *"Hãy đợi đấy! Tiền đang dồn mở xưởng."*
  * *Học thuật:* Chiếm dụng lợi tức thuộc về nhà tư bản cho vay: quyền sử dụng tư bản đã tách khỏi quyền sở hữu nó.
  * *Chỉ số:* $z + r$ (-30), $m_{td}$ (+10), thặng dư $m$ (+15 giây thu nhập).
* **Lựa chọn Phải (B):** *"Thanh toán sòng phẳng theo tỷ suất z'."*
  * *Học thuật:* Lợi tức z là một phần lợi nhuận bình quân mà nhà tư bản đi vay phải trả cho nhà tư bản cho vay (0 < z < p̄).
  * *Chỉ số:* $z + r$ (+20), $m_{td}$ (-15), thặng dư $m$ (-20 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Tư bản cho vay vận động theo công thức T – T' (T' = T + z), trông như tiền tự đẻ ra tiền nên là hình thái "được sùng bái nhất". Thực chất z vẫn là một phần giá trị thặng dư tạo ra trong sản xuất. Tỷ suất lợi tức z' = z / tổng tư bản cho vay × 100%. Phần còn lại cho nhà tư bản hoạt động: thu nhập xí nghiệp = lợi nhuận − lợi tức.

---

### THẺ 04: Địa tô tư bản chủ nghĩa (r)
* **Nhân vật:** Bá tước Địa chủ.
* **Lời thoại:** *"Mảnh đất xưởng của ngài nằm sát đường sắt mới khánh thành, mỏ than của ngài cũng đào trên đất của tôi. Tôi yêu cầu tăng địa tô!"*
* **Lựa chọn Trái (A):** *"Vô lý! Đất tự nó không tạo ra thặng dư!"*
  * *Học thuật:* Đúng là đất không tạo ra giá trị; nhưng chế độ tư hữu độc quyền ruộng đất cho phép địa chủ chiếm một phần GTTD.
  * *Chỉ số:* $z + r$ (-25), $c/v$ (-5).
* **Lựa chọn Phải (B):** *"Trích lợi nhuận siêu ngạch nộp địa tô."*
  * *Học thuật:* Địa tô TBCN là phần GTTD dôi ra ngoài lợi nhuận bình quân (lợi nhuận siêu ngạch) mà nhà tư bản trả cho địa chủ.
  * *Chỉ số:* $z + r$ (+15), $m_{td}$ (-20), thặng dư $m$ (-15 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Địa tô tuyệt đối: đất xấu nhất cũng phải nộp, cơ sở là độc quyền tư hữu ruộng đất. Địa tô chênh lệch I: do đất có vị trí thuận lợi, độ màu mỡ cao (như đất cạnh đường sắt); chênh lệch II: do đầu tư thâm canh. Ngoài ruộng đất còn có địa tô xây dựng và địa tô hầm mỏ. "Ruộng đất là một hòn đá nam châm vĩnh cửu dùng để hút lấy một phần giá trị thặng dư do tư bản bòn rút được." Giá cả đất đai = địa tô / tỷ suất lợi tức nhận gửi của ngân hàng.

---

### THẺ 05: Tích tụ và tập trung tư bản
* **Nhân vật:** Cố vấn Pháp lý.
* **Lời thoại:** *"Xưởng dệt bên cạnh vừa thua trong cạnh tranh và rao bán. Ngài muốn mở rộng xưởng mình từ từ, hay vay vốn sáp nhập luôn xưởng của họ?"*
* **Lựa chọn Trái (A):** *"Tích tụ: tư bản hóa GTTD của mình."*
  * *Học thuật:* Tích tụ tư bản: tăng quy mô tư bản cá biệt bằng tích lũy, đồng thời làm tăng quy mô tư bản xã hội; tư bản lớn lên chậm.
  * *Chỉ số:* $c/v$ (+10), $m_{td}$ (-10), $z + r$ (+5), thặng dư $m$ (-20 giây thu nhập).
* **Lựa chọn Phải (B):** *"Tập trung: vay ngân hàng sáp nhập!"*
  * *Học thuật:* Tập trung tư bản: hợp nhất những tư bản cá biệt có sẵn qua cạnh tranh, góp vốn, sáp nhập; tư bản lớn nhanh nhưng tư bản xã hội không tăng.
  * *Chỉ số:* $c/v$ (+25), $z + r$ (-20), $v$ (-10).
* **Mở rộng (Sổ tay học thuật):** Ví dụ trong bài: tư bản X tự tích lũy 500.000 → 800.000 → 1,2 triệu USD là tích tụ; tư bản A, B, C hợp lại thành tư bản M 2,4 triệu USD là tập trung. Tích tụ thông qua tái sản xuất mở rộng; tập trung thông qua cạnh tranh, góp vốn, sáp nhập, phục vụ ra đời các ngành cần lượng tư bản lớn hoặc các công ty cổ phần.

---

### THẺ 06: Bản chất của tích lũy tư bản
* **Nhân vật:** Phu nhân Nhà tư bản.
* **Lời thoại:** *"Các gia tộc than thép đều đã sắm du thuyền sang Pháp nghỉ hè. Ngài định vùi đầu mãi vào đống dầu mỡ mà không màng danh tiếng gia tộc sao?"*
* **Lựa chọn Trái (A):** *"Thặng dư phải quay lại dây chuyền!"*
  * *Học thuật:* Tích lũy tư bản: chuyển hóa một phần GTTD thành tư bản phụ thêm để tái sản xuất mở rộng, "tư bản đẻ ra tư bản".
  * *Chỉ số:* $m_{td}$ (-25), $c/v$ (+15).
* **Lựa chọn Phải (B):** *"Mua biệt thự, mở vũ hội 3 đêm!"*
  * *Học thuật:* Phần GTTD dành cho tiêu dùng cá nhân của nhà tư bản không quay lại sản xuất, quy mô tích lũy thu hẹp.
  * *Chỉ số:* $m_{td}$ (+30), $c/v$ (-20), thặng dư $m$ (-30 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** GTTD thu được chia thành phần tích lũy (tái sản xuất mở rộng) và phần dành cho tiêu dùng. Bốn nhân tố làm tăng quy mô tích lũy: (1) nâng cao tỷ suất GTTD, (2) tăng năng suất lao động, (3) sử dụng hiệu quả máy móc, (4) đại lượng tư bản ứng trước.

---

### THẺ 07: Tiền công và bản chất bóc lột
* **Nhân vật:** Thợ tiện trẻ.
* **Lời thoại:** *"12 giờ làm việc, chúng tôi tạo ra giá trị mới gấp đôi tiền công nhận được. Ông chủ đang bóc lột sức lao động của chúng tôi!"*
* **Lựa chọn Trái (A):** *"Cút đi! Ngoài cổng đầy người thất nghiệp."*
  * *Học thuật:* Dùng áp lực của những người thất nghiệp để ép giá cả hàng hóa sức lao động xuống dưới giá trị.
  * *Chỉ số:* $v$ (-25), $m_{td}$ (+10).
* **Lựa chọn Phải (B):** *"Đó là may mắn của người mua, không phải bất công!"*
  * *Học thuật:* Nhà tư bản mua SLĐ đúng giá trị; việc SLĐ tạo ra giá trị gấp đôi "chỉ là một điều may mắn đặc biệt cho người mua, chứ không phải một sự bất công gì đối với người bán" (Tư bản, Q.I, tr.251).
  * *Chỉ số:* $v$ (-10), $z + r$ (+5).
* **Mở rộng (Sổ tay học thuật):** Lao động không phải là hàng hóa; cái công nhân bán là sức lao động. Tiền công là giá cả của sức lao động nhưng bị nhầm tưởng là giá cả của lao động: "Tiền công xóa bỏ mọi vết tích phân chia ngày lao động thành lao động cần thiết và lao động thặng dư... Toàn bộ lao động thể hiện ra như là lao động được trả công" (Tư bản, Q.I phần 2, tr.45). "Gấp đôi" nghĩa là m' = m/v = 100%.

---

### THẺ 08: Máy móc, tư bản cố định và hao mòn
* **Nhân vật:** Kỹ sư trưởng.
* **Lời thoại:** *"Máy dệt tự động đời mới có thể thay 200 thợ. Còn máy cũ của ta mua 5 năm trước, giờ đem bán chỉ được nửa giá. Ngài lắp máy mới ngay chứ?"*
* **Lựa chọn Trái (A):** *"Lắp máy mới, cho 200 thợ nghỉ việc!"*
  * *Học thuật:* Máy móc không tạo ra giá trị; nó là phương pháp hữu hiệu nhất để rút ngắn thời gian lao động cần thiết, kéo dài thời gian lao động thặng dư.
  * *Chỉ số:* $c/v$ (+20), $v$ (-15), thặng dư $m$ (-25 giây thu nhập).
* **Lựa chọn Phải (B):** *"Chưa, cứ chạy máy cũ."*
  * *Học thuật:* Hao mòn vô hình: máy cũ mất giá trị khi máy mới năng suất cao hơn ra đời, dù vẫn còn chạy được.
  * *Chỉ số:* $c/v$ (-10), $v$ (+5).
* **Mở rộng (Sổ tay học thuật):** "Cũng như mọi bộ phận cấu thành khác của tư bản bất biến, máy móc không tạo ra giá trị nào cả, nhưng nó chuyển giá trị bản thân nó vào sản phẩm" (Tư bản, Q.I, tr.490). Máy móc là tư bản cố định: tham gia toàn bộ vào sản xuất nhưng giá trị khấu hao từng phần, chịu cả hao mòn hữu hình (dùng lâu) và hao mòn vô hình (lạc hậu). Thay người bằng máy làm tăng cấu tạo hữu cơ c/v, một hệ quả của tích lũy tư bản.

---

### THẺ 09: Giá trị mới v + m và đấu tranh giai cấp
* **Nhân vật:** Thủ lĩnh Công đoàn.
* **Lời thoại:** *"Anh em đã bãi công! Chúng tôi đòi tăng 20% tiền công, nếu không thì đừng trách máy dệt của ông chủ bị đập vỡ."*
* **Lựa chọn Trái (A):** *"Gọi cảnh sát giải tán bãi công!"*
  * *Học thuật:* Giai cấp công nhân là sản phẩm của thời đại công nghiệp: lực lượng ngày càng đông đảo và có tính tổ chức cao; đàn áp chỉ làm mâu thuẫn thêm gay gắt.
  * *Chỉ số:* $v$ (-20), $c/v$ (-10), $z + r$ (-5).
* **Lựa chọn Phải (B):** *"Thương lượng: tăng 10% tiền công."*
  * *Học thuật:* Giá trị mới công nhân tạo ra chia thành v và m: tiền công tăng thì phần thặng dư giảm, m' giảm.
  * *Chỉ số:* $v$ (+20), $m_{td}$ (-10), thặng dư $m$ (-15 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Giá trị hàng hóa G = c + v + m. Phần c chỉ được chuyển sang; phần v + m là giá trị mới do lao động sống tạo ra. Với một lượng giá trị mới cho trước, v và m tỷ lệ nghịch với nhau: đây là cơ sở kinh tế của đấu tranh giữa giai cấp tư sản (sở hữu TLSX, thuê lao động) và giai cấp vô sản (không có TLSX, buộc phải bán SLĐ để sống).

---

### THẺ 10: Lợi nhuận thương nghiệp và chu chuyển tư bản
* **Nhân vật:** Thương nhân bán buôn.
* **Lời thoại:** *"Tôi bao tiêu toàn bộ vải của ngài, chỉ xin chiết khấu 15%. Ngài khỏi phải lo khâu bán hàng, vốn quay vòng nhanh hơn hẳn."*
* **Lựa chọn Trái (A):** *"Tự mở cửa hàng bán lẻ."*
  * *Học thuật:* Tự đảm nhận lưu thông kéo dài thời gian chu chuyển; mà "lưu thông hay trao đổi hàng hóa không sáng tạo ra giá trị nào cả".
  * *Chỉ số:* $c/v$ (-5), $m_{td}$ (+5), thặng dư $m$ (-15 giây thu nhập).
* **Lựa chọn Phải (B):** *"Đồng ý nhường 15% cho thương nhân."*
  * *Học thuật:* Lợi nhuận thương nghiệp: một phần GTTD tạo ra trong sản xuất, được tư bản công nghiệp nhượng lại cho tư bản thương nghiệp để thực hiện chức năng lưu thông.
  * *Chỉ số:* $c/v$ (+10), $m_{td}$ (-5), thặng dư $m$ (+20 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Tuần hoàn tư bản: T – H (TLSX, SLĐ) ... SX ... H' – T', qua 3 giai đoạn với 3 hình thái tư bản tiền tệ, tư bản sản xuất, tư bản hàng hóa. Thời gian chu chuyển = thời gian sản xuất + thời gian lưu thông; tốc độ chu chuyển n = CH / ch (ví dụ 1 vòng 3 tháng thì n = 12/3 = 4 vòng/năm). Chu chuyển càng nhanh, tỷ suất lợi nhuận càng cao.

---

### THẺ 11: Tư bản là một quan hệ xã hội
* **Nhân vật:** Nhà đầu tư thuộc địa.
* **Lời thoại:** *"Ở thuộc địa bên kia đại dương, đất đai gần như cho không! Ngài mang tiền, máy móc và cả người làm thuê sang đó mở xưởng chứ?"*
* **Lựa chọn Trái (A):** *"Sang thuộc địa! Đất rẻ, lời to."*
  * *Học thuật:* Ở nơi ai cũng có đất tự canh tác, người làm thuê bỏ đi hết: có tiền, có máy mà thiếu người phải bán SLĐ thì chưa thành nhà tư bản.
  * *Chỉ số:* $c/v$ (-10), $m_{td}$ (-10), $v$ (+10), thặng dư $m$ (-30 giây thu nhập).
* **Lựa chọn Phải (B):** *"Ở lại Anh, nơi người lao động buộc phải bán SLĐ."*
  * *Học thuật:* Hai điều kiện để SLĐ thành hàng hóa: người lao động tự do về thân thể, và không có TLSX nên buộc phải bán SLĐ.
  * *Chỉ số:* $v$ (-5), $m_{td}$ (+5).
* **Mở rộng (Sổ tay học thuật):** "Tư bản không phải một vật, mà là một quan hệ xã hội giữa người ta với nhau, một quan hệ do các vật làm trung gian" (Tư bản, Q.I, tr.321, nhận xét về E.G. Wakefield). Người chủ tiền phải tìm được người lao động "tự do theo 2 nghĩa": tự do chi phối SLĐ của mình như một hàng hóa, và không có hàng hóa nào khác để bán (Tư bản, Q.I, tr.220).

---

### THẺ 12: Giá trị SLĐ, tiền công danh nghĩa và thực tế
* **Nhân vật:** Kế toán trưởng.
* **Lời thoại:** *"Mất mùa, giá bánh mì tăng gấp đôi. Công nhân xin tăng tiền công để đủ nuôi con. Ngài vẫn giữ mức tiền công cũ chứ?"*
* **Lựa chọn Trái (A):** *"Giữ nguyên tiền công danh nghĩa."*
  * *Học thuật:* Tiền công danh nghĩa không đổi nhưng tiền công thực tế (lượng hàng hóa, dịch vụ mua được) giảm: giá cả SLĐ xuống dưới giá trị.
  * *Chỉ số:* $v$ (-20), $m_{td}$ (+5).
* **Lựa chọn Phải (B):** *"Tăng tiền công theo giá bánh mì."*
  * *Học thuật:* Giá trị SLĐ do giá trị tư liệu sinh hoạt quyết định; tư liệu sinh hoạt đắt lên thì giá trị SLĐ tăng.
  * *Chỉ số:* $v$ (+15), $m_{td}$ (-10), thặng dư $m$ (-15 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** Giá trị hàng hóa SLĐ gồm: giá trị tư liệu sinh hoạt vật chất và tinh thần cần thiết cho người lao động, phí tổn đào tạo, và tư liệu sinh hoạt cho con cái họ; nó còn mang yếu tố tinh thần và lịch sử. Giá cả SLĐ (tiền công) dao động quanh giá trị đó theo cung – cầu. Tiền công còn có hai hình thức: theo thời gian và theo sản phẩm.

---

### THẺ 13: GTTD siêu ngạch và lợi nhuận bình quân
* **Nhân vật:** Nhà tư bản đối thủ.
* **Lời thoại:** *"Xưởng tôi vừa lắp máy mới, giá trị cá biệt tấm vải của tôi thấp hơn giá trị thị trường 20%. Ngài đuổi theo, hay rút vốn sang ngành đường sắt đang lời hơn?"*
* **Lựa chọn Trái (A):** *"Rút bớt vốn sang ngành đường sắt."*
  * *Học thuật:* Tư bản chạy sang ngành có tỷ suất lợi nhuận cao: cạnh tranh giữa các ngành hình thành tỷ suất lợi nhuận bình quân p̄'.
  * *Chỉ số:* $c/v$ (-10), $z + r$ (+5), $m_{td}$ (+5), thặng dư $m$ (+15 giây thu nhập).
* **Lựa chọn Phải (B):** *"Đầu tư công nghệ, vượt mặt đối thủ!"*
  * *Học thuật:* GTTD siêu ngạch: thu được nhờ tăng năng suất lao động cá biệt, làm giá trị cá biệt thấp hơn giá trị thị trường.
  * *Chỉ số:* $c/v$ (+15), $m_{td}$ (-10), thặng dư $m$ (-20 giây thu nhập).
* **Mở rộng (Sổ tay học thuật):** GTTD siêu ngạch là hình thức biến tướng của GTTD tương đối: siêu ngạch do năng suất cá biệt, nhà tư bản cá biệt thu được; tương đối do năng suất xã hội, toàn bộ giai cấp tư bản thu được. Cạnh tranh giữa các ngành hình thành tỷ suất lợi nhuận bình quân p̄' = Σm / Σ(c+v); lợi nhuận bình quân p̄ = p̄' × k, và giá trị hàng hóa chuyển thành giá cả sản xuất = k + p̄.

---

## 6. HỆ THỐNG MÀN HÌNH KẾT CỤC & TỔNG KẾT HỌC THUẬT

Khi một chỉ số chạm ngưỡng 0 hoặc 100, hoặc người chơi vượt qua 20 tình huống, trò chơi chuyển sang **Màn hình Tổng kết Lý luận (Debriefing Screen)**. Có tổng cộng **9 kết cục** (8 kết cục thua ứng với 8 ngưỡng ở mục 4.2 và 1 kết cục thắng), đúng như trong game. Mỗi màn hình kết cục gồm: tổng kết học thuật, ô *Vì sao?* giải thích theo cơ chế game, giá trị cuối của 4 chỉ số và tỷ suất $m'$. Kết cục thắng có nền đỏ-vàng riêng với hiệu ứng mưa tiền vàng; mỗi kết cục thua có màu nền riêng.

1. **KẾT CỤC: ĐẾ CHẾ TƯ BẢN ĐỘC QUYỀN (Vượt qua 20 tình huống)**
   * *Tổng kết học thuật:* *"Chúc mừng! Bạn đã vận hành trọn vẹn vòng T – H – T': tích lũy và tập trung tư bản, nâng cao cấu tạo hữu cơ c/v, làm tròn nghĩa vụ chia lợi tức, địa tô, đồng thời giữ công nhân ở mức "đủ sống để tiếp tục làm thuê". Bạn là hiện thân hoàn hảo của phương thức sản xuất tư bản chủ nghĩa!"*
   * *Mặt trái* Nhưng hãy nhớ: toàn bộ của cải ấy có một nguồn gốc duy nhất là lao động làm thuê. Tích lũy càng lớn, chênh lệch thu nhập giữa nhà tư bản và người lao động càng doãng ra; đó là bất công mà Marx muốn vạch trần.
2. **KẾT CỤC: CÁCH MẠNG VÔ SẢN TOÀN THÀNH (Sức lao động v chạm 0)**
   * *Tổng kết học thuật:* *"Bạn đã bóc lột đến giọt mồ hôi cuối cùng mà không trả đủ giá trị sức lao động. Giai cấp công nhân bị bần cùng hóa, nhưng đó là giai cấp cách mạng nhất: sản phẩm của thời đại công nghiệp, ngày càng đông đảo và có tính tổ chức cao. Mâu thuẫn đối kháng bùng nổ thành cách mạng vô sản, tước đoạt lại tư liệu sản xuất!"*
   * *Vì sao?* Khi v thấp, thời gian lao động cần thiết bị ép ngắn, m' tăng vọt và thặng dư chảy về rất nhanh. Nhưng đó là sức lao động bị tiêu hao mà không được tái sản xuất.
3. **KẾT CỤC: NHÀ TỪ THIỆN ẢO TƯỞNG (Sức lao động v chạm 100)**
   * *Tổng kết học thuật:* *"Bạn trả tiền công cao đến mức v nuốt trọn toàn bộ giá trị mới mà công nhân tạo ra: không còn thời gian lao động thặng dư, m = 0, m' = 0. Sản xuất ra GTTD là mục đích trực tiếp và động cơ quyết định của sản xuất TBCN; không còn m thì tư bản không còn lý do tồn tại, xưởng giải thể."*
   * *Vì sao?* Giá trị mới = v + m. Trong game, v càng cao thì thời gian lao động cần thiết càng chiếm hết ngày lao động (xem ô m' trên thanh trạng thái), thu nhập m/s càng thấp; ở v = 100 thu nhập bằng 0.
4. **KẾT CỤC: PHÁ SẢN TRƯỚC SỨC ÉP CẠNH TRANH (Cấu tạo hữu cơ c/v chạm 0)**
   * *Tổng kết học thuật:* *"Bạn tiêu thặng dư thay vì tái đầu tư công nghệ. Đối thủ tăng năng suất lao động cá biệt, thu GTTD siêu ngạch và bán rẻ hơn giá trị thị trường. Trong cạnh tranh, bạn bị đẩy xuống tầng lớp tiểu tư sản phá sản, rồi gia nhập giai cấp vô sản."*
   * *Vì sao?* Máy móc (tư bản cố định) chịu hao mòn hữu hình và vô hình theo thời gian. Không tái đầu tư thì giá trị cá biệt hàng hóa của bạn cao hơn giá trị thị trường.
5. **KẾT CỤC: KHỦNG HOẢNG SẢN XUẤT THỪA (Cấu tạo hữu cơ c/v chạm 100)**
   * *Tổng kết học thuật:* *"Đầu tư máy móc quá mức: hàng ứ đọng, vốn đóng băng, máy móc rỉ sét vì thiếu thợ vận hành. Tư bản bất biến "chỉ tồn tại để thu hút lao động"; chỉ lao động sống mới tạo ra GTTD. Khi c phình to còn v teo lại, tỷ suất lợi nhuận p' = m/(c+v) sụt giảm."*
   * *Vì sao?* Trong game, năng suất tăng theo c/v đến khoảng 70, sau đó giảm dần: thêm máy mà không thêm người thì không thêm thặng dư.
6. **KẾT CỤC: TỊCH BIÊN BỞI LIÊN MINH NGÂN HÀNG & ĐỊA CHỦ (Lợi tức & địa tô z+r chạm 0)**
   * *Tổng kết học thuật:* *"Bạn lầm tưởng toàn bộ GTTD đều thuộc về mình! Tư bản công nghiệp phải chia lợi nhuận thành lợi tức z cho nhà tư bản cho vay và địa tô r cho địa chủ, kẻ sở hữu "hòn đá nam châm vĩnh cửu" hút lấy một phần GTTD. Vi phạm luật chơi ấy, bạn bị tòa án niêm phong xưởng."*
   * *Vì sao?* z+r giảm nhanh nhất trong 4 chỉ số: lợi tức và địa tô đến hạn liên tục. Vay nóng khi thiếu m cũng làm z+r giảm.
7. **KẾT CỤC: LỆ THUỘC TÍN DỤNG (Lợi tức & địa tô z+r chạm 100)**
   * *Tổng kết học thuật:* *"Bạn nhường quá nhiều lợi nhuận cho ngân hàng và địa chủ. Thu nhập xí nghiệp = lợi nhuận − lợi tức gần như về 0. Ngân hàng chuyển nợ thành phần vốn chi phối và tước quyền điều hành xưởng của bạn."*
   * *Vì sao?* Lợi tức và địa tô đều cắt từ cùng một khối m; trả quá nhiều thì phần còn lại cho nhà tư bản hoạt động teo tóp.
8. **KẾT CỤC: MẤT UY TÍN XÃ HỘI (Quỹ tiêu dùng m_td chạm 0)**
   * *Tổng kết học thuật:* *"Bạn thắt lưng buộc bụng đến mức bị giới thượng lưu tẩy chay, ngân hàng hạ hạn mức tín dụng cá nhân. Một mức tiêu dùng cá nhân tối thiểu vẫn là một phần địa vị của nhà tư bản."*
   * *Vì sao?* GTTD chia thành phần tích lũy và phần tiêu dùng; dồn hết vào tích lũy cũng có cái giá.
9. **KẾT CỤC: THA HÓA VÌ TRỤY LẠC (Quỹ tiêu dùng m_td chạm 100)**
   * *Tổng kết học thuật:* *"Bạn đem toàn bộ thặng dư đi ăn chơi trác táng. Nhà tư bản thôi làm "kẻ lãnh đạo việc sản xuất hàng hóa" để thành kẻ ăn bám. Không tích lũy thì không có tái sản xuất mở rộng; cơ nghiệp bị xâu xé và biến mất khỏi thương trường!"*
   * *Vì sao?* Phần m dành cho tiêu dùng không quay lại sản xuất: tư bản không "đẻ ra tư bản" nữa.

---

## 7. CƠ CHẾ BỔ SUNG SAU PLAYTEST

### 7.1. Thu nhập thặng dư gắn với chỉ số
*Thanh trạng thái hiển thị ngày lao động 12 giờ chia thành thời gian lao động cần thiết (tỷ lệ với $v$) và thời gian lao động thặng dư, đúng ví dụ 6h + 6h, $m'=100\%$ của bài giảng.*

$$\text{Thu nhập } m/s = 2 \times \text{năng suất}(c/v) \times \text{mức bóc lột}(v) \times (1 + \text{nâng cấp máy}) \times \text{gia sản thừa kế}$$
* **Năng suất theo $c/v$:** tăng dần đến khoảng 70, sau đó **giảm** (thừa máy, thiếu lao động sống) để minh họa xu hướng giảm của tỷ suất lợi nhuận $p' = m/(c+v)$.
* **Mức bóc lột theo $v$:** $v$ càng cao (lương, giờ làm, điều kiện sống tốt hơn) thì phần thặng dư càng mỏng; ở $v = 100$ thu nhập bằng 0. Thanh trạng thái hiển thị **tỷ suất giá trị thặng dư $m' = m/v$** ($v = 50 \Rightarrow m' = 100\%$).
* **Gia sản thừa kế:** thắng được +5 trở lên, thua chỉ +1; hệ số thu nhập tối đa ×2,5.

### 7.2. Lựa chọn minh bạch
* Mỗi phương án hiển thị **chính xác** số điểm thay đổi của từng chỉ số và lượng thặng dư $m$ được/mất (tính theo số giây thu nhập hiện tại).
* Nếu phương án tốn $m$ mà người chơi không đủ: trả hết số đang có, phần thiếu **vay nóng** khiến $z + r$ giảm thêm 8 (được báo trước trên nhãn phương án).
* Rê chuột vào phương án hoặc kéo thẻ: số thay đổi hiện ngay trên đầu từng thanh chỉ số.

### 7.3. Điều khiển nhịp chơi
* **Tạm dừng / 1× / 2× / 3×** (phím Space, 1, 2, 3).
* **Gọi ngay** (phím N): gọi tình huống kế tiếp không cần chờ. Mặc định 12 giây một tình huống.

### 7.4. Sổ tay học thuật & Bộ sưu tập kết cục
* **Sổ tay học thuật:** lưu vĩnh viễn mọi ô *Học thuật* đã xuất hiện (19 thẻ gồm 13 thẻ thường và 6 thẻ hệ quả × 2 phương án + 4 nâng cấp = 42 mục), kèm phần giải thích mở rộng cho từng chủ đề, mục *Cơ chế trong game* và mục *Tóm tắt bài giảng Chương 3* (10 khái niệm cốt lõi, luôn mở).
* **Bộ sưu tập kết cục:** 9 ô kết cục; ô chưa đạt hiện điều kiện kích hoạt để người chơi chủ động khám phá.

### 7.5. Âm thanh
* **Nhạc nền:** điệu valse phong cách phòng hòa nhạc Victoria (tổng hợp WebAudio), chuyển sang giọng thứ khi có chỉ số gần ngưỡng nguy hiểm, nhỏ lại khi tạm dừng, buồn khi thua và rộn ràng khi thắng.
* Hai nút riêng: **Nhạc** (phím M) và **Âm thanh** (tiếng nhà xưởng + hiệu ứng).

### 7.6. Hệ quả về sau và đời thừa kế (lấy cảm hứng từ Reigns)
* **Thẻ hệ quả:** 6 thẻ chỉ xuất hiện 2–4 tình huống sau một lựa chọn nhất định; phương án đó được đánh dấu "⏳ có hệ quả về sau". Thẻ hệ quả thay cho thẻ thường và vẫn tính vào 20 tình huống nên **không làm ván dài thêm**.

| Thẻ hệ quả | Kích hoạt bởi | Khái niệm |
|---|---|---|
| Thừa phát lại của Ngân hàng | Thẻ 03 – A (chây ỳ lợi tức) | Tư bản cho vay: quyền sử dụng tách quyền sở hữu |
| Thủ lĩnh Công đoàn (đập máy) | Thẻ 09 – A (gọi cảnh sát) | Phí tổn đào tạo trong giá trị SLĐ; đấu tranh có tổ chức |
| Thanh tra Công xưởng | Thẻ 02 – A (phớt lờ luật) | Giới hạn ngày lao động, GTTD tuyệt đối |
| Ngân hàng đòi nợ sáp nhập | Thẻ 05 – B (tập trung bằng vay) | Tín dụng và tập trung; thu nhập xí nghiệp = lợi nhuận − lợi tức |
| Thợ dệt bị sa thải | Thẻ 08 – A (lắp máy, sa thải) | Máy móc biến tư bản khả biến thành bất biến; giá cả SLĐ |
| Kế toán trưởng (quỹ khấu hao) | Thẻ 06 – B (vũ hội) | Khấu hao tư bản cố định |

* **Đời thừa kế:** mỗi ván là một đời của gia tộc Ashworth, hiển thị "Đời thứ N · tên người kế vị".
* **Mục tiêu mỗi đời:** chọn ngẫu nhiên 1 trong 6 mục tiêu ngắn (c/v ≥ 70; m' ≥ 200%; z+r ≥ 70; 3 cấp máy móc; v ≥ 60 ở tình huống 10; tổng 800 m). Đạt được +2 gia sản thừa kế.

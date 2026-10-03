<p align="center">
  <img src="tai-lieu/anh-man-hinh/01-tong-quan-quan-ly.png" alt="Tổng quan Coaching" width="900" />
</p>

<h1 align="center">TAKI Sales Training</h1>

<p align="center"><b>Nền tảng huấn luyện đội sale bằng AI</b><br/>
DNA doanh nghiệp làm ngữ cảnh cho mọi AI · Role-play với AI đóng vai khách · <b>Copilot trong cuộc gọi thật</b> · Phân tích cuộc gọi · Gói huấn luyện cá nhân · Kịch bản, kho phản đối, sản phẩm · LMS + gamification + chứng chỉ · Báo cáo đội nhóm</p>

<p align="center">
  <a href="https://sales-training-tau.vercel.app">Bản chạy thử (Vercel)</a> ·
  <a href="#cài-đặt-và-chạy-local">Cài đặt</a> ·
  <a href="#kiến-trúc">Kiến trúc</a> ·
  <a href="#bộ-não-ai">Bộ não AI</a> ·
  <a href="#ảnh-màn-hình">Ảnh màn hình</a>
</p>

---

## Bài toán

Đội sale của doanh nghiệp đào tạo và sản phẩm số thường được huấn luyện bằng cảm nhận: quản lý nghe vài cuộc gọi, góp ý miệng, không có thước đo chung, không có nơi để sale tự luyện. **TAKI Sales Training** biến việc đó thành dữ liệu:

- Doanh nghiệp **nạp DNA** một lần (bán gì, cho ai, giọng nói, từ cấm, số liệu được phép, chính sách) và **hồ sơ sản phẩm**: mọi tác vụ AI bám theo đó, không bịa, không hứa.
- Sale **luyện tập với AI đóng vai khách hàng thật** (có persona, có phản đối, có cảm xúc, nói thành tiếng bằng giọng tự nhiên) bất kỳ lúc nào, được chấm ngay theo khung 6 kỹ năng.
- Khi **gọi khách thật**, AI copilot nghe cùng qua trình duyệt: gợi ý câu nên nói, câu hỏi nên hỏi, cách xử lý phản đối vừa nêu, cảnh báo tuân thủ, và có thể đọc thầm vào tai nghe.
- Mọi **cuộc gọi thật** được ghi âm ngay trong trình duyệt hoặc dán transcript, AI tóm tắt 4 phần, chấm điểm, trích phản đối mới và cam kết với khách.
- Quản lý nhìn **radar kỹ năng của từng người so với đội và top 20%**, nhận **gói huấn luyện cá nhân** do AI sinh từ dữ liệu thật, giao bài tập và theo dõi.
- **Kho kịch bản và câu trả lời chuẩn** cho từng loại phản đối lớn dần từ chính các cuộc gọi thắng của công ty (mọi đề xuất của AI đều qua duyệt).
- **Khóa học nội bộ** với quiz, chống tua ảo, điểm, chuỗi ngày, hạng và chứng chỉ có mã xác thực công khai.

Tài liệu gốc là spec TAKI FUNNEL OS v2 (module M15 Sales Engine, M18 LMS) và 72 mockup; phương án cắt phạm vi ở [`tai-lieu/phuong-an-code.md`](tai-lieu/phuong-an-code.md).

## Tính năng

| Nhóm | Có gì |
|---|---|
| **Khởi động 2 bước** | Quản lý đăng nhập lần đầu được đưa thẳng vào màn nạp DNA (nhập tay hoặc AI trích từ giới thiệu công ty) rồi thêm sản phẩm; có thể bỏ qua và làm sau. Tổng quan có 4 nút lớn: Gọi điện với AI · Role-play · Nạp DNA và Sản phẩm · Tạo kịch bản DISC. |
| **Gọi điện với AI** | Menu riêng: chọn sản phẩm, nhóm khách DISC, độ khó, bấm «Gọi ngay». AI dựng khách ảo, màn «Nhấc máy» hiện lên, khách nói «Alô» trước bằng giọng ElevenLabs / Azure / trình duyệt; sale **giữ nút 🎙 để nói** (chữ hiện ngay trong ô nhập), thả ra, sửa nếu cần rồi bấm Gửi; giữ nút khi khách đang nói là khách im. Kết thúc là chấm 6 kỹ năng và độ phù hợp DISC. |
| **DNA doanh nghiệp** | Hồ sơ doanh nghiệp có phiên bản: mô tả, khách mục tiêu, nỗi đau, USP, xưng hô, phong cách, **từ cấm**, **số liệu được phép**, đối thủ, chính sách. Nhập tay hoặc **dán tài liệu để AI trích**. AI Gateway tự nạp vào mọi tác vụ, đầu ra có từ cấm bị đánh dấu trong nhật ký. |
| **Sản phẩm** | Hồ sơ đầy đủ theo bậc thang giá trị (tầng 0–4): đối tượng, kết quả kỳ vọng, hình thức, thời lượng, điểm bán hàng, phản đối thường gặp, chính sách, so sánh đối thủ, tài liệu. Dùng chung cho role-play, phân tích, gợi ý và copilot. |
| **Copilot cuộc gọi thật** | Trình duyệt nghe cuộc gọi (loa ngoài) và chuyển thành lời thoại theo người nói (phím cách để đổi, bấm câu để sửa vai). **Lớp tức thì**: bắt phản đối bằng từ khóa → câu trả lời chuẩn, cảnh báo tuân thủ bằng luật. **Lớp AI** tự chạy sau mỗi câu khách nói: câu nên nói ngay, 2–3 câu hỏi nên hỏi, xử lý phản đối, tín hiệu và độ sẵn sàng chốt, bước tiếp. Đọc gợi ý vào tai nghe. Kết thúc là phân tích đầy đủ. |
| **Kịch bản chốt sale theo DISC** | Mỗi sản phẩm × 4 nhóm khách (D thống trị, I ảnh hưởng, S ổn định, C tuân thủ) có kịch bản 8 phần: mở đầu, câu hỏi khai thác, trình bày giá trị, 3 phản đối điển hình, chốt, theo dõi, từ nên dùng, từ nên tránh. **AI sinh trọn bộ** từ DNA và hồ sơ sản phẩm, quản lý sửa và duyệt, có bản in 4 nhóm một trang. Role-play cho chọn nhóm khách và chấm «nói đúng kiểu khách»; phân tích cuộc gọi nhận diện nhóm và gợi ý lần sau; copilot đoán nhóm ngay trong cuộc gọi và đổi gợi ý theo kịch bản nhóm; báo cáo tỷ lệ thắng theo nhóm; khóa nền có module DISC. |
| **Luyện tập role-play** | AI dựng persona theo sản phẩm, nhóm DISC và độ khó, chọn phản đối muốn luyện; chat từng lượt hoặc **gọi bằng giọng** (nói vào mic, khách trả lời bằng giọng ElevenLabs / Azure / trình duyệt, ngắt lời được); copilot bên phải hiện kịch bản và câu trả lời chuẩn khi khách phản đối; kết thúc → radar 6 tiêu chí, nhận xét, câu nói tốt hơn theo từng lượt. |
| **Phân tích cuộc gọi** | **Ghi âm trực tiếp** bằng Web Speech API (transcript theo người nói, không lưu audio) hoặc dán transcript; AI tóm tắt nhu cầu / phản đối / cam kết / bước tiếp; scorecard kỹ năng kèm trích dẫn; phản đối mới vào **hàng chờ duyệt**; đoạn xử lý hay vào **thư viện mẫu**; cam kết thành **nhiệm vụ có hạn**; cảnh báo tuân thủ (hứa kết quả, bịa số liệu, nói xấu đối thủ). |
| **Huấn luyện AI** | Ma trận kỹ năng đội; radar cá nhân vs đội vs top 20%; insight (phản đối thua phổ biến, tiêu chí yếu nhất); **gói huấn luyện cá nhân** (điểm yếu, bài học đề xuất, bài tập role-play, lời khuyên); **phân công coaching**: quản lý giao bài tập role-play hoặc việc có hạn. |
| **Kịch bản & Phản đối** | Kịch bản gọi 4 phần theo sản phẩm; kho phản đối 7 loại với câu trả lời chuẩn, đếm số lần gặp; **AI gợi ý câu trả lời** theo khung Ghi nhận → Làm rõ → Giá trị → Kiểm tra; sản phẩm và điểm bán hàng. |
| **Đào tạo (LMS)** | Khóa → module → bài (văn bản, video nhúng, quiz); chống tua ảo; mốc tiến độ phát đúng một lần; **soạn khóa** cho quản lý (quiz nhập bằng văn bản); cảnh báo rớt học theo ngưỡng ngày. |
| **Gamification** | Điểm theo hành vi với giới hạn chống lạm dụng, chuỗi ngày liên tiếp, hạng Bronze → Diamond, bảng xếp hạng tôn trọng ẩn danh; **chứng chỉ** mã tất định, trang xác thực công khai, in PDF, chia sẻ Facebook / Zalo. |
| **Quản trị** | Báo cáo đội theo kỳ 7 / 30 / 90 ngày + **xuất CSV**; nhiệm vụ (cam kết với khách không xóa được, chỉ hoàn thành hoặc hủy kèm lý do); nhân viên và phân quyền; cài đặt workspace (tên, múi giờ, ngưỡng rớt học); nhật ký kiểm toán; cron ngày phát sự kiện rớt học và nhiệm vụ quá hạn. |
| **Giao diện** | Sáng mặc định, chế độ tối một nút; thanh tiến trình khi chuyển trang, khung xương khi tải, nút chờ nói rõ AI đang làm gì và mất bao lâu, sinh kịch bản DISC có tiến độ từng nhóm; tiếng Việt toàn bộ; SVG tự dựng; responsive. |

## Bộ não AI

Mọi lời gọi Claude đi qua **một AI Gateway duy nhất** ([`services/ai-gateway.ts`](services/ai-gateway.ts)) với ba chế độ, chọn tự động theo môi trường:

| Chế độ | Khi nào | Ghi chú |
|---|---|---|
| `cli` | Máy local có Claude Code (gói thuê bao) | Gọi `claude -p --output-format json`, không cần API key |
| `api` | `AI_MODE=api` + `ANTHROPIC_API_KEY` (Vercel) | Ép lược đồ bằng `tool_use`, SDK tự retry |
| `du_phong` | Không có cả hai, hoặc AI lỗi | Chấm theo luật, khách mẫu có kịch bản; kết quả gắn nhãn để người dùng biết |

Đầu ra luôn được ép về JSON theo lược đồ **zod** ([`core/ai-kieu.ts`](core/ai-kieu.ts)), sai thì tự sửa một vòng rồi mới rơi xuống dự phòng. 100% lời gọi ghi `log_sinh_ai` (tác vụ, chế độ, model, token, thời gian, lỗi). Nội dung AI sinh ra (phản đối mới, đoạn mẫu) luôn ở trạng thái **nháp** cho tới khi quản lý duyệt.

Chín tác vụ: `sinh_persona` · `khach_tra_loi` · `cham_luyen_tap` · `phan_tich_cuoc_goi` · `goi_huan_luyen` · `goi_y_tra_loi` · `trich_dna` · `copilot` · `sinh_kich_ban_disc`. Mọi tác vụ tự nhận **tóm tắt DNA** (phiên bản được ghi vào log); `copilot` dùng model nhanh (`AI_MODEL_NHANH`) và cửa sổ 14 lượt gần nhất. Ở chế độ `cli`, gateway gọi Claude Code với system prompt riêng và tắt toàn bộ tool/MCP nên một gợi ý copilot mất khoảng 8 giây. Script [`scripts/thu-ai.ts`](scripts/thu-ai.ts) chạy trọn luồng với Claude thật (`pnpm thu:ai`).

**Giọng nói.** Ba lớp, người dùng tự chọn trong **Cài đặt → Giọng nói AI** (có hướng dẫn lấy khóa từng bước, nút kiểm tra kết nối và nghe thử):
- **ElevenLabs**: giọng tự nhiên nhất, có cảm xúc, nhân bản được giọng thật; chọn giọng từ tài khoản, model Flash v2.5 cho tiếng Việt.
- **Azure Speech**: giọng HoaiMy / NamMinh neural, gói miễn phí 0,5 triệu ký tự/tháng; kiêm **nhận dạng giọng nói** chính xác hơn trình duyệt và chạy được trên Safari (token 10 phút, không lộ khóa).
- **Trình duyệt** (miễn phí, giọng máy): tự chọn giọng tiếng Việt tốt nhất có sẵn; Edge tốt nhất.
Khóa API được mã hóa AES-256 trước khi lưu và không bao giờ gửi xuống trình duyệt. Trong role-play, nút **«🎙 Giữ để nói»**: giữ để nói (chạm nhanh thì bật, chạm lần nữa để tắt), thả ra rồi bấm Gửi; khách trả lời bằng giọng, giữ nút là khách im.

## Kiến trúc

```
app/            Next.js 15 App Router (route tiếng Việt), server actions cho form, route handler cho chat/API
components/     KhungShell (sidebar + header), Radar, TheKpi, ManHinhLuyenTap, CuocGoiTrucTiep (copilot), FormDna, ManHinhBaiHoc…
services/       Nghiệp vụ: workspace-guard · ai-gateway · dna · disc · copilot · xac-thuc · luyen-tap · cuoc-goi · huan-luyen · dao-tao · diem · kich-ban · nhan-vien · bao-cao · workspace
core/           Logic thuần, không phụ thuộc DB: khung kỹ năng, dna, disc, giong-noi, gamification, tiến độ, chứng chỉ, dự phòng AI, csv, mật khẩu, phân quyền (+ core.test.ts)
db/             migrations/*.sql · khoi-tao.ts · seed.ts · db.test.ts
deploy/         len-cloudflare.sh (tunnel) · dung.sh · vercel.md (bẫy Neon)
tai-lieu/       spec gốc, 72 mockup, phương án, ảnh màn hình
```

**Dữ liệu.** PostgreSQL với **RLS FORCE** trên mọi bảng nghiệp vụ theo biến phiên `app.workspace_id`; mọi truy vấn đi qua `voiWorkspace()` (transaction + `set_config`). App kết nối bằng role riêng `app_user` không có `BYPASSRLS`; tra cứu cấp nền tảng (đăng nhập, chứng chỉ công khai) đi qua hàm `SECURITY DEFINER` có cờ. Các bảng `su_kien`, `nhat_ky_kiem_toan`, `log_sinh_ai`, `diem_hoc` chỉ INSERT (trigger chặn sửa xóa, trừ pipeline xóa dữ liệu). Tên bảng và cột bằng tiếng Việt không dấu.

**Kỹ năng.** Khung 6 tiêu chí cố định toàn hệ: khai thác nhu cầu · lắng nghe · trình bày giá trị · xử lý phản đối · chốt và bước tiếp · tuân thủ. Radar cá nhân = trung bình các bản chấm (role-play + cuộc gọi) 90 ngày.

## Cài đặt và chạy local

Yêu cầu: Node ≥ 22, pnpm 9, PostgreSQL ≥ 14. Tùy chọn: Claude Code CLI (để AI chạy ở chế độ `cli`).

```bash
git clone https://github.com/nguyentatkiem/sales-training.git && cd sales-training
pnpm install
cp .env.example .env.local        # sửa PHIEN_SECRET (≥ 32 ký tự ngẫu nhiên)

createdb sales_training
psql -d postgres -c "create role app_user login password 'app_user' nosuperuser nobypassrls"
pnpm db:init                      # áp migration
pnpm db:seed                      # dữ liệu demo Công ty Demo
pnpm dev                          # http://localhost:3020
```

Tài khoản demo:

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Quản lý | `quanly@demo.vn` | `Demo@2026` |
| Sale | `sale1@demo.vn` … `sale5@demo.vn` | `Sale@2026` |

Dữ liệu demo là **hoàn toàn hư cấu** («Công ty Demo», tên người và hội thoại mẫu); repo không chứa dữ liệu thật của bất kỳ doanh nghiệp nào.

Lệnh khác: `pnpm test` (23 test lõi) · `pnpm test:db` (8 test tích hợp: RLS, mốc tiến độ, role-play, cuộc gọi) · `pnpm typecheck` · `pnpm build` · `pnpm thu:ai` · `./deploy/len-cloudflare.sh` (link công khai tạm trỏ máy local).

Biến môi trường (`.env.example`):

| Biến | Ý nghĩa |
|---|---|
| `DATABASE_URL` | Role chủ, chỉ dùng cho migration và seed |
| `DATABASE_URL_APP` | Role ứng dụng `app_user` (RLS có hiệu lực); bỏ trống thì dùng `DATABASE_URL` |
| `PHIEN_SECRET` | Ký cookie phiên (HMAC) |
| `AI_MODE` | `cli` hoặc `api` |
| `ANTHROPIC_API_KEY` | Chỉ cần ở chế độ `api` |
| `AI_MODEL` | Mặc định `claude-sonnet-5` |
| `AI_MODEL_NHANH` | Model cho copilot cuộc gọi (mặc định = `AI_MODEL`) |
| `CRON_SECRET` | Bảo vệ `/api/cron/quet` (Vercel tự gửi) |

## Triển khai

Đang chạy trên **Vercel** (region `sin1`) với **Neon Postgres** (Singapore). Quy trình: migration lên Neon **trước**, rồi push `main` để Vercel tự build. Chi tiết và các bẫy đã gặp (role chủ Neon bypass RLS, hàm không được `SET app.*`, region tích hợp) ở [`deploy/vercel.md`](deploy/vercel.md). Gói thuê bao Claude không chạy trên Vercel, production cần `ANTHROPIC_API_KEY`; thiếu key app vẫn chạy ở chế độ dự phòng.

## Ảnh màn hình

<details open>
<summary><b>Tổng quan</b> — 4 nút lớn, quản lý và sale</summary>

![Tổng quan quản lý](tai-lieu/anh-man-hinh/01-tong-quan-quan-ly.png)
![Tổng quan sale](tai-lieu/anh-man-hinh/02-tong-quan-sale.png)
</details>

<details open>
<summary><b>Gọi điện với AI</b> — quay số, nhấc máy, nói chuyện bằng giọng</summary>

![Gọi điện với AI](tai-lieu/anh-man-hinh/27-goi-dien.png)
![Nhấc máy](tai-lieu/anh-man-hinh/28-nhac-may.png)
![Đang gọi](tai-lieu/anh-man-hinh/29-dang-goi.png)
</details>

<details>
<summary><b>Khởi động workspace mới</b> — nạp DNA và sản phẩm, có thể bỏ qua</summary>

![Khởi động](tai-lieu/anh-man-hinh/30-khoi-dong.png)
</details>

<details open>
<summary><b>DNA doanh nghiệp và sản phẩm</b> — ngữ cảnh chung cho AI</summary>

![DNA doanh nghiệp](tai-lieu/anh-man-hinh/22-dna.png)
![Sản phẩm](tai-lieu/anh-man-hinh/23-san-pham.png)
</details>

<details open>
<summary><b>Kịch bản chốt sale theo DISC</b></summary>

![Kịch bản DISC](tai-lieu/anh-man-hinh/24-kich-ban-disc.png)
![Bản in 4 nhóm](tai-lieu/anh-man-hinh/25-disc-ban-in.png)
</details>

<details open>
<summary><b>Luyện tập role-play với AI</b></summary>

![Tạo phiên](tai-lieu/anh-man-hinh/03-tao-role-play.png)
![Danh sách phiên](tai-lieu/anh-man-hinh/03b-danh-sach-role-play.png)
![Kết quả chấm](tai-lieu/anh-man-hinh/04-ket-qua-role-play.png)
</details>

<details open>
<summary><b>Ghi âm và phân tích cuộc gọi</b></summary>

![Thư viện cuộc gọi](tai-lieu/anh-man-hinh/05-thu-vien-cuoc-goi.png)
![Phân tích cuộc gọi](tai-lieu/anh-man-hinh/06-phan-tich-cuoc-goi.png)
![Copilot cuộc gọi trực tiếp](tai-lieu/anh-man-hinh/07-copilot-cuoc-goi.png)
</details>

<details open>
<summary><b>Huấn luyện AI</b> — ma trận đội và gói cá nhân</summary>

![Ma trận kỹ năng](tai-lieu/anh-man-hinh/08-ma-tran-ky-nang.png)
![Hồ sơ huấn luyện](tai-lieu/anh-man-hinh/09-ho-so-huan-luyen.png)
</details>

<details>
<summary><b>Kịch bản, kho phản đối, sản phẩm</b></summary>

![Kịch bản](tai-lieu/anh-man-hinh/10-kich-ban.png)
![Kho phản đối](tai-lieu/anh-man-hinh/11-kho-phan-doi.png)
</details>

<details>
<summary><b>Đào tạo</b> — học, quiz, soạn khóa</summary>

![Đào tạo](tai-lieu/anh-man-hinh/12-dao-tao.png)
![Khóa học](tai-lieu/anh-man-hinh/13-khoa-hoc.png)
![Bài học](tai-lieu/anh-man-hinh/14-bai-hoc.png)
![Soạn khóa](tai-lieu/anh-man-hinh/15-soan-khoa.png)
</details>

<details>
<summary><b>Giọng nói AI: kết nối ElevenLabs / Azure</b></summary>

![Cài đặt giọng nói](tai-lieu/anh-man-hinh/26-giong-noi.png)
</details>

<details>
<summary><b>Gamification, báo cáo, nhiệm vụ, cài đặt, chứng chỉ</b></summary>

![Bảng xếp hạng](tai-lieu/anh-man-hinh/16-bang-xep-hang.png)
![Báo cáo](tai-lieu/anh-man-hinh/17-bao-cao.png)
![Nhiệm vụ](tai-lieu/anh-man-hinh/18-nhiem-vu.png)
![Cài đặt](tai-lieu/anh-man-hinh/19-cai-dat.png)
![Chứng chỉ công khai](tai-lieu/anh-man-hinh/20-chung-chi.png)
</details>

<details>
<summary><b>Chế độ tối và đăng nhập</b></summary>

![Chế độ tối](tai-lieu/anh-man-hinh/21-che-do-toi.png)
![Đăng nhập](tai-lieu/anh-man-hinh/00-dang-nhap.png)
</details>

## Kiểm thử

- `core/core.test.ts`: chuẩn hóa điểm, hạng và chuỗi ngày, mốc tiến độ idempotent, chấm quiz, mã chứng chỉ, bóc JSON, mật khẩu, phân quyền, chấm theo luật, khách mẫu, tách transcript, CSV, rủi ro rớt học, DNA (độ đầy đủ, tóm tắt, từ cấm), nhận diện DISC.
- `db/db.test.ts`: cách ly workspace bằng RLS (đọc, ghi chéo, không ngữ cảnh), bảng bất biến, tra cứu nền tảng, tiến độ và chứng chỉ, ghi danh idempotent, role-play và phân tích cuộc gọi ở chế độ dự phòng, nhiệm vụ hủy bắt buộc lý do.
- Smoke test toàn bộ route với hai vai trò trước mỗi lần lên production.

## Quy ước đóng góp

Tiếng Việt toàn bộ (giao diện, tên bảng, tên hàm, commit). Mọi truy vấn qua `voiWorkspace`, mọi lời gọi AI qua `goiAI`, nội dung AI sinh ở trạng thái nháp, không thư viện icon ngoài. Chi tiết và danh sách bẫy đã gặp trong [`CLAUDE.md`](CLAUDE.md).

## Giấy phép

MIT — xem [`LICENSE`](LICENSE).

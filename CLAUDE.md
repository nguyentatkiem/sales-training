# TAKI SALES TRAINING — quy ước dự án

> Nền tảng huấn luyện đội sale bằng AI: role-play với AI đóng vai khách, phân tích cuộc gọi, kho kịch bản và phản đối, LMS + gamification + chứng chỉ. Tách từ spec TAKI FUNNEL OS (M15 Sales Engine, M18 LMS). KHÔNG phải auto-funnel.

Chủ dự án: Nguyễn Tất Kiểm, Founder TAKI GROUP. Khởi tạo 26/09/2026.

## Nguồn sự thật
- `tai-lieu/phuong-an-code.md` — phạm vi, mô hình dữ liệu, IA, AI tasks, kiểm thử, triển khai.
- `tai-lieu/spec.md` — spec gốc (chỉ dùng M15 F-114→F-117, M18 F-127→F-129, F-038, chương 1.3).
- `tai-lieu/TAKI-FUNNEL-OS-72-UI-MOCKUPS/` — mockup; bám #62 #63 #64 #66 #68.

## Quy ước bắt buộc
1. Tiếng Việt toàn bộ: giao diện, tên bảng/cột (snake_case không dấu), tên hàm/component, commit.
2. Mọi truy vấn nghiệp vụ qua `services/workspace-guard.ts` (`voiWorkspace`) — RLS FORCE theo `app.workspace_id`.
3. Mọi lời gọi AI qua `services/ai-gateway.ts` (`goiAI`). Chế độ `AI_MODE=cli|api`; thiếu cả hai → `du_phong` (luật) để app vẫn chạy.
4. Nội dung AI sinh (phản đối mới, đoạn mẫu) ở trạng thái `nhap`, quản lý duyệt mới hiệu lực.
5. `su_kien`, `nhat_ky_kiem_toan`, `log_sinh_ai` chỉ INSERT.
6. Icon/biểu đồ SVG tự dựng, không thư viện icon.

## Đợt 2 — hoàn thiện 27/09/2026
Giao diện SÁNG mặc định (nút đổi tối trên header, lưu localStorage `st_theme`). Thêm: ghi âm trực tiếp bằng Web Speech API (`/cuoc-goi/ghi-am`, transcript theo người nói → `/api/cuoc-goi`), chế độ giọng nói trong role-play (loa đọc câu khách, mic nói thay gõ), soạn khóa học đầy đủ (`/dao-tao/soan`, quiz nhập dạng văn bản), sản phẩm CRUD (tab Sản phẩm), phân công coaching (giao bài tập/việc → `nhiem_vu.loai`), báo cáo đội theo kỳ + CSV (`/bao-cao`, `/api/bao-cao`), cảnh báo rớt học F-128 (tổng quan + cron `/api/cron/quet` 02:00 VN), cài đặt workspace (tên, múi giờ, ngưỡng rớt học) + nhật ký kiểm toán, chứng chỉ in/PDF + chia sẻ, bộ lọc thư viện cuộc gọi, error.tsx, icon. Migration 002 (nhiem_vu.loai/lien_ket/nguoi_giao_id, workspace.nguong_rot_hoc_ngay) và 003 (trigger bất biến cho phép xóa khi cờ `app.xoa_du_lieu='1'` — pipeline xóa F-135) đã lên Neon.

## Đợt 3 — DNA, sản phẩm, copilot cuộc gọi thật (27/09/2026)
- **DNA doanh nghiệp** (`/dna`, bảng `ho_so_dna`, `services/dna.ts`, `core/dna.ts`): nhập tay hoặc dán tài liệu → AI trích (`/api/dna`, tác vụ `trich_dna`). **AI Gateway tự nạp tóm tắt DNA vào MỌI tác vụ** (trừ `boQuaDna`), ghi `phien_ban_dna` vào `log_sinh_ai`, đánh dấu từ cấm trong đầu ra (`tuCamViPham`, chỉ cảnh báo).
- **Sản phẩm** (`/san-pham`): hồ sơ đầy đủ (đối tượng, kết quả kỳ vọng, hình thức, thời lượng, chính sách, so sánh đối thủ, phản đối thường gặp, tài liệu); `moTaSanPhamChoAI()` dùng chung cho role-play, phân tích, gợi ý, copilot.
- **Copilot cuộc gọi thật** (`/cuoc-goi/ghi-am`, `components/CuocGoiTrucTiep.tsx`, `services/copilot.ts`, `/api/copilot`): Web Speech API nghe cuộc gọi; lớp 0 tức thì ở client (bắt phản đối bằng từ khóa → câu chuẩn, cảnh báo tuân thủ bằng luật); lớp 1 AI nhanh tự chạy 1,2 giây sau mỗi câu khách (model `AI_MODEL_NHANH`, mặc định Haiku), có nút «Hỏi AI ngay», đọc gợi ý vào tai nghe. Phím cách đổi người nói; bấm vào câu để đổi vai.
- **Giọng nói** (`core/giong-noi.ts`): chọn giọng tiếng Việt tự nhiên nhất có sẵn (Edge Natural > Google > macOS Linh), người dùng chọn giọng/tốc độ, tách câu để ngắt tự nhiên. Không có dịch vụ TTS ngoài (không key) — Edge cho giọng tốt nhất.
- Dữ liệu demo trong repo là **trung tính** («Công ty Demo», quanly@demo.vn / Demo@2026, sale1..5@demo.vn / Sale@2026). Không có dữ liệu thật của khách hàng nào trong git.

## Đợt 4 — Kịch bản chốt sale theo DISC (27/09/2026)
- `core/disc.ts`: hồ sơ 4 nhóm D/I/S/C (dấu hiệu, muốn/sợ, nên/tránh, bằng chứng, kiểu chốt, phản đối điển hình), `doanDisc()` theo từ khóa, lược đồ `kichBanDiscSchema` 8 phần.
- Bảng `kich_ban_disc` (sản phẩm × nhóm, nháp → duyệt); trang `/kich-ban/disc` (AI sinh từng nhóm hoặc trọn bộ, sửa, duyệt), bản in `/kich-ban/disc/in`.
- Tích hợp: role-play chọn nhóm khách (hoặc ngẫu nhiên) → persona diễn đúng nhóm, chấm thêm `phu_hop_disc`; phân tích cuộc gọi trả `disc` (nhóm, tin cậy, lý do, gợi ý lần sau) lưu cột `cuoc_goi.disc`; copilot đoán nhóm (lớp luật + AI) và nạp kịch bản nhóm đã duyệt vào gợi ý; báo cáo thắng theo nhóm; khóa nền có module DISC + quiz.
- Tác vụ AI mới: `sinh_kich_ban_disc` (~10–20 giây/nhóm qua CLI).

## Đợt 5 — Giọng nói đám mây + UX (27/09/2026)
- **ElevenLabs / Azure Speech do người dùng tự kết nối** trong app (`/cai-dat/giong-noi`, bảng `tich_hop_giong_noi`, khóa mã hóa AES-256-GCM qua `core/ma-hoa.ts` với khóa dẫn xuất từ `PHIEN_SECRET`). `services/giong-noi.ts`: kiểm tra kết nối (danh sách giọng ElevenLabs, token Azure), TTS mp3 (`/api/giong-noi/doc`), token STT Azure 10 phút (`/api/giong-noi/token`). Trình duyệt không bao giờ thấy khóa.
- Client `core/giong-noi.ts`: `docTuDong()` (đám mây nếu có, tách câu phát sớm, rơi về giọng trình duyệt), `batNghe()` hợp nhất Azure STT (SDK `microsoft-cognitiveservices-speech-sdk`, import động) / Web Speech.
- Role-play / Gọi điện: nút **«🎙 Giữ để nói»** (push-to-talk): nhấn = `batNghe()`, thả = dừng; chạm nhanh < 350 ms = bật/tắt; không tự gửi, sale bấm Gửi. Bật nhận dạng phải đồng bộ trong lượt chạm (iPhone). Copilot cuộc gọi thật dùng Azure STT khi cấu hình.
- UX: `NutCho` (useFormStatus) cho mọi nút gọi AI, `ThanhTienTrinh` khi chuyển trang/submit, `loading.tsx` khung xương cho từng nhóm route, sinh DISC từng nhóm qua `/api/disc` có tiến độ (1/4…).
- Đổi `PHIEN_SECRET` sẽ làm khóa đã lưu không giải mã được (người dùng nhập lại).

## Đợt 6 — v1.1.0 (28/09/2026)
- `/goi-dien` (menu nổi bật «Gọi điện với AI»): tạo phiên → `/luyen-tap/[id]?goi=1` → màn «Nhấc máy» (`ManHinhLuyenTap` prop `goiDien`) → API `mo_loi` (`khachMoLoi`: khách nói «Alô» trước) → chế độ gọi bằng giọng tự bật.
- `/bat-dau`: khởi động 2 bước (DNA → sản phẩm, có Bỏ qua); cột `workspace.khoi_dong_xong` (migration 007); trang chủ quản lý chuyển hướng khi chưa xong và chưa có DNA. Tổng quan có 4 `NutLon`.
- `CHANGELOG.md` + tag `v1.1.0`.

## Lệnh
`pnpm dev` (3020) · `pnpm build` · `pnpm test` (21 core) · `pnpm test:db` (8, cần DB local) · `pnpm typecheck` · `pnpm db:init` · `pnpm db:seed` · `pnpm thu:ai` (chạy trọn luồng với Claude thật) · `./deploy/len-cloudflare.sh` (tunnel) · `./deploy/dung.sh`.

## Môi trường
`.env.local` (không commit): `DATABASE_URL` (role chủ: migration/seed), `DATABASE_URL_APP` (role `app_user` nobypassrls — app dùng để RLS có hiệu lực), `PHIEN_SECRET`, `AI_MODE`, `ANTHROPIC_API_KEY` (chỉ chế độ api). DB local `sales_training`, role `app_user/app_user`.

## Triển khai (26/09/2026)
- GitHub `nguyentatkiem/sales-training` (private) → Vercel project `sales-training` (region sin1), tự deploy khi push main.
- Neon `sales-training-db` (ap-southeast-1) qua tích hợp Vercel; đã chạy 001 + seed. Trên Neon `neondb_owner` BYPASS RLS → app dùng role `app_user` riêng qua `DATABASE_URL_APP` (đã đặt production). Chi tiết bẫy: `deploy/vercel.md`.
- Vercel chưa có `ANTHROPIC_API_KEY` → production chạy chế độ dự phòng cho tới khi Sếp thêm key (`vercel env add ANTHROPIC_API_KEY production`). Máy local dùng Claude CLI gói sub (đã kiểm chứng trọn luồng).

## Bẫy đã gặp
1. Postgres local role superuser bỏ qua RLS kể cả FORCE → test DB phải chạy bằng `app_user`.
2. Neon không cho `create function … set app.x` → đặt cờ `app.nen_tang` bằng `set_config` trong thân hàm SECURITY DEFINER, hạ cờ ngay sau.
3. Script Node import services có `server-only` → chạy `node --import tsx --conditions=react-server`.
4. Tích hợp Neon tự chép `.agents/`, `.claude/skills/neon*`, `skills-lock.json` vào repo và sửa `.gitignore` → xóa, không commit.
5. Server action KHÔNG được bắt closure là hàm (vd `const loiVe = (e) => redirect(...)`) → lỗi «Functions cannot be passed directly to Client Components»; inline `redirect` trong từng action.
6. Có `app/loading.tsx` gốc thì `redirect()` trong page trả 200 + chuyển hướng phía client (stream) thay vì 307 → đã bỏ loading gốc để guard quản lý trả 307 thật.
7. Test dọn dữ liệu bảng bất biến cần cờ `app.xoa_du_lieu='1'` (migration 003); email test phải duy nhất theo lần chạy.

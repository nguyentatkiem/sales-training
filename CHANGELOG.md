# Nhật ký phát hành

## Chưa phát hành · Sửa lỗi giọng nói
- **Micro bị chặn toàn app**: header `Permissions-Policy: microphone=()` khiến nút «Nói», «Gọi bằng giọng»/«Nhấc máy» và copilot cuộc gọi thật không nhận được giọng (trình duyệt từ chối mà không hỏi quyền). Đổi thành `microphone=(self)`.
- **Chế độ gọi bằng giọng không đọc lời khách** khi chưa từng bật «Loa»: callback nhận giọng giữ trạng thái cũ của lần render trước. Trạng thái loa / đang gọi giờ đọc qua ref.
- **Lỗi micro được báo rõ**: mã lỗi Web Speech (`audio-capture`, `not-allowed`, `network`…) đổi thành câu hướng dẫn tiếng Việt; lỗi không tự hết (không có micro, bị chặn quyền) thì ngừng thử lại thay vì lặp vô hạn.
- **Điện thoại báo «chặn micro» dù đã cho quyền**: nhận dạng giọng bị bật ngoài lượt chạm (chờ tải cấu hình trước, hoặc tự bật lại sau khi điện thoại ngắt phiên) nên iPhone/Android từ chối với `not-allowed`. Giờ nhận dạng bật đồng bộ ngay trong lượt chạm; máy từ chối lúc nhấn thì bật lại lúc thả tay; giọng đọc được mở khóa ngay khi bấm «Nhấc máy» (Safari iPhone). Báo lỗi phân biệt: mở trong Zalo/Facebook (cần mở bằng trình duyệt), Safari chặn quyền, iPhone tắt Đọc chính tả; kèm mã lỗi gốc.
- **Giữ để nói thay cho nghe liên tục**: bỏ chế độ «Gọi bằng giọng» (micro nghe liên tục, ngừng 0,9 giây là tự gửi) và nút «Nói» nhỏ. Thay bằng nút lớn «🎙 Giữ để nói»: giữ để nói, chữ hiện ngay trong ô nhập, thả ra để dừng, bấm «Gửi» mới gửi; chạm nhanh thì bật nghe, chạm lần nữa để tắt. Giữ nút khi khách đang nói là khách im. Trạng thái đầu khung: đỏ «Đang nghe bạn», vàng «Khách đang suy nghĩ», tím «Khách đang nói», «Xem lại câu rồi bấm Gửi».

## v1.1.0 — 28/09/2026 · Gọi điện với AI
- **Gọi điện với AI** thành menu riêng nổi bật: chọn sản phẩm, nhóm DISC, độ khó → AI dựng khách → màn «Nhấc máy» → khách nói «Alô» trước bằng giọng → sale nói vào mic, ngừng một giây là khách trả lời, nói chen là khách im → chấm điểm khi kết thúc.
- **Giọng nói đám mây do người dùng tự kết nối**: ElevenLabs (giọng tự nhiên, nhân bản giọng) và Azure Speech (giọng neural + nhận dạng giọng nói chính xác, chạy cả Safari). Trang Cài đặt → Giọng nói AI có hướng dẫn lấy khóa, kiểm tra kết nối, chọn giọng, nghe thử; khóa mã hóa AES-256.
- **Khởi động workspace mới**: quản lý đăng nhập lần đầu được yêu cầu nạp DNA và sản phẩm (2 bước, có Bỏ qua). Tổng quan có 4 nút lớn: Gọi điện với AI · Role-play · Nạp DNA và Sản phẩm · Tạo kịch bản DISC.
- **Kịch bản chốt sale theo DISC**: 4 nhóm khách × mỗi sản phẩm, AI sinh từng nhóm có tiến độ, duyệt, bản in; role-play, phân tích cuộc gọi, copilot và báo cáo đều theo nhóm; module DISC trong khóa nền.
- **DNA doanh nghiệp** và **hồ sơ sản phẩm** làm ngữ cảnh chung cho mọi tác vụ AI; guardrail từ cấm và số liệu được phép.
- **Copilot cuộc gọi thật**: nghe cuộc gọi, gợi ý câu nên nói, câu hỏi nên hỏi, xử lý phản đối, cảnh báo tuân thủ, đoán nhóm DISC, đọc gợi ý vào tai nghe.
- Trải nghiệm: nút chờ nói rõ AI đang làm gì, thanh tiến trình, khung xương khi tải; gọi Claude CLI nhanh 2–3 lần.

## v1.0.0 — 27/09/2026
- Role-play với AI đóng vai khách, phân tích cuộc gọi, huấn luyện cá nhân, kịch bản và kho phản đối, LMS + gamification + chứng chỉ, báo cáo, RLS theo workspace.

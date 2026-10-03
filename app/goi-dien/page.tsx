import Link from "next/link";
import { redirect } from "next/navigation";
import { KhungShell } from "@/components/KhungShell";
import { NutCho } from "@/components/NutCho";
import { Icon } from "@/components/Icon";
import { NhanDiem } from "@/components/NhanDiem";
import { nguCanhTrang, tuKhiNao } from "@/services/trang";
import { danhSachSanPham } from "@/services/kich-ban";
import { taoPhien, danhSachPhien } from "@/services/luyen-tap";
import { layCauHinhGiong } from "@/services/giong-noi";
import { DO_KHO, TEN_DO_KHO, type DoKho } from "@/core/ai-kieu";
import { DISC, NHOM_DISC } from "@/core/disc";
export const dynamic = "force-dynamic";
export const maxDuration = 300;
export default async function TrangGoiDien({ searchParams }: { searchParams: Promise<{ loi?: string }> }) {
  const { phien, ws } = await nguCanhTrang();
  const { loi } = await searchParams;
  const [sp, giong, gan] = await ws(async (q) => Promise.all([danhSachSanPham(q), layCauHinhGiong(q), danhSachPhien(q, { nguoiDungId: phien.nguoiDungId, gioiHan: 6 })]));
  async function goi(form: FormData) {
    "use server";
    const { phien, ws } = await nguCanhTrang();
    const doKho = String(form.get("do_kho") ?? "vua") as DoKho;
    let id = "";
    try { const r = await ws((q) => taoPhien(q, { workspaceId: phien.workspaceId, nguoiDungId: phien.nguoiDungId, sanPhamId: String(form.get("san_pham_id") ?? "") || null, doKho: (DO_KHO as readonly string[]).includes(doKho) ? doKho : "vua", phanDoiUuTien: [], disc: String(form.get("disc") ?? "") || null })); id = r.id; }
    catch (e) { redirect(`/goi-dien?loi=${encodeURIComponent((e as Error).message)}`); }
    redirect(`/luyen-tap/${id}?goi=1`);
  }
  const tenGiong = giong.tts === "elevenlabs" ? "ElevenLabs" : giong.tts === "azure" ? "Azure Neural" : "giọng trình duyệt";
  return (
    <KhungShell phien={phien} duongDan="/goi-dien" tieuDe="Gọi điện với AI" moTa="Bấm gọi, khách ảo nhấc máy nói «Alô» và bạn tư vấn bằng giọng nói thật như một cuộc gọi. Xong cuộc gọi AI chấm 6 kỹ năng.">
      {loi && <div className="thong-bao thong-bao-do mb-3">{loi}</div>}
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <form action={goi} className="the p-6 flex flex-col gap-5" style={{ background: "linear-gradient(135deg, var(--the) 60%, var(--nhan-mo))" }}>
          <div className="flex items-center gap-4"><div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background: "var(--gradient-cta)" }}><Icon ten="cuoc_goi" size={28} /></div><div><div className="text-xl font-bold">Gọi cho một khách hàng ảo</div><div className="mo-ta">Đeo tai nghe, bật mic. Khách nói bằng {tenGiong}{giong.tts === "trinh_duyet" && phien.vaiTro === "quan_ly" ? <> — <Link href="/cai-dat/giong-noi" style={{ color: "var(--nhan-sang)" }}>kết nối ElevenLabs/Azure để giọng thật hơn</Link></> : ""}.</div></div></div>
          <label className="flex flex-col gap-1 text-sm"><span className="font-medium">Sản phẩm bạn đang bán</span><select name="san_pham_id" className="o-nhap" defaultValue={sp[0]?.id ?? ""}>{sp.filter((s) => s.trang_thai === "dang_ban").map((s) => <option key={s.id} value={s.id}>{s.ten}</option>)}<option value="">(Không chọn)</option></select></label>
          <div className="text-sm"><div className="font-medium mb-2">Khách thuộc nhóm tính cách</div><div className="grid gap-2 md:grid-cols-5">
            <label className="the-2 p-3 flex items-start gap-2 cursor-pointer has-[:checked]:border-[var(--nhan)]"><input type="radio" name="disc" value="" defaultChecked className="mt-1" /><span><b>Ngẫu nhiên</b><div className="text-xs" style={{ color: "var(--chu-mo)" }}>Luyện đọc vị</div></span></label>
            {NHOM_DISC.map((n) => <label key={n} className="the-2 p-3 flex items-start gap-2 cursor-pointer has-[:checked]:border-[var(--nhan)]" style={{ borderLeftColor: DISC[n].mau, borderLeftWidth: 3 }}><input type="radio" name="disc" value={n} className="mt-1" /><span><b>{DISC[n].ten}</b><div className="text-xs" style={{ color: "var(--chu-mo)" }}>{DISC[n].nhip}</div></span></label>)}</div></div>
          <div className="text-sm"><div className="font-medium mb-2">Độ khó</div><div className="grid gap-2 md:grid-cols-3">{DO_KHO.map((d) => <label key={d} className="the-2 p-3 flex items-start gap-2 cursor-pointer has-[:checked]:border-[var(--nhan)]"><input type="radio" name="do_kho" value={d} defaultChecked={d === "vua"} className="mt-1" /><span><b>{TEN_DO_KHO[d].split(" — ")[0]}</b><div className="text-xs" style={{ color: "var(--chu-mo)" }}>{TEN_DO_KHO[d].split(" — ")[1]}</div></span></label>)}</div></div>
          <div className="flex items-center gap-3"><NutCho dangLam="AI đang dựng khách hàng và quay số (10–20 giây)…" className="nut nut-chinh text-base px-6 py-3">📞 Gọi ngay</NutCho><span className="text-xs" style={{ color: "var(--chu-mo)" }}>Sau khi kết nối, bấm «Nhấc máy». Tới lượt bạn: giữ nút 🎙 để nói, thả ra, xem lại chữ rồi bấm Gửi.</span></div>
        </form>
        <div className="flex flex-col gap-4">
          <div className="the p-4 text-sm"><div className="font-semibold mb-2">Cuộc gọi gần đây</div>{gan.length === 0 ? <div className="mo-ta">Chưa có.</div> : <div className="flex flex-col gap-1">{gan.map((p) => <Link key={p.id} href={`/luyen-tap/${p.id}`} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "var(--vien)" }}><span className="truncate">{p.persona.ten}{p.disc && <span className="nhan nhan-xam ml-1">{p.disc}</span>}<div className="text-[11px]" style={{ color: "var(--chu-mo)" }}>{tuKhiNao(p.tao_luc)}</div></span>{p.trang_thai === "xong" ? <NhanDiem diem={p.diem_tong} nhoGon /> : <span className="nhan nhan-nhan">Đang</span>}</Link>)}</div>}</div>
          <div className="the p-4 text-xs leading-relaxed" style={{ color: "var(--chu-mo)" }}><b style={{ color: "var(--chu)" }}>Mẹo:</b> mở đầu ngắn, hỏi trước khi nói; nghe khách phản đối thì ghi nhận rồi mới trả lời; kết thúc bằng bước tiếp theo có ngày giờ. Muốn gõ thay vì nói, dùng <Link href="/luyen-tap/moi" style={{ color: "var(--nhan-sang)" }}>Luyện tập role-play</Link>.</div>
        </div>
      </div>
    </KhungShell>
  );
}

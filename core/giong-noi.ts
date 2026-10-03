// Giọng đọc tiếng Việt trong trình duyệt: chọn giọng tự nhiên nhất có sẵn (Edge: HoaiMy/NamMinh Natural; Chrome: Google Tiếng Việt; macOS: Linh),
// cho phép người dùng chọn và nhớ lựa chọn. Chạy ở client.
export type GiongNoi = { name: string; lang: string; diem: number };
const UU_TIEN = [/natural/i, /online/i, /neural/i, /google/i, /hoaimy|namminh/i, /linh/i, /premium|enhanced/i];
export function xepHangGiong(v: { name: string; lang: string; localService?: boolean }): number {
  if (!/^vi(-|_)?/i.test(v.lang)) return -1;
  let d = 1;
  UU_TIEN.forEach((r, i) => { if (r.test(v.name)) d += (UU_TIEN.length - i) * 3; });
  if (v.localService === false) d += 2; // giọng đám mây thường tự nhiên hơn
  return d;
}
export function danhSachGiongViet(): GiongNoi[] {
  if (typeof speechSynthesis === "undefined") return [];
  return speechSynthesis.getVoices().map((v) => ({ name: v.name, lang: v.lang, diem: xepHangGiong(v) })).filter((v) => v.diem > 0).sort((a, b) => b.diem - a.diem);
}
export function giongDaChon(): string | null { try { return localStorage.getItem("st_giong"); } catch { return null; } }
export function luuGiong(name: string) { try { localStorage.setItem("st_giong", name); } catch { /* bỏ qua */ } }
export function tocDoDaChon(): number { try { return Number(localStorage.getItem("st_toc_do") || 1) || 1; } catch { return 1; } }
export function luuTocDo(n: number) { try { localStorage.setItem("st_toc_do", String(n)); } catch { /* bỏ qua */ } }
/** Đọc văn bản: tách câu để ngắt tự nhiên, dừng đoạn đang đọc trước đó. */
export function docVanBan(text: string, o?: { giong?: string | null; tocDo?: number; onXong?: () => void }) {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const giongs = speechSynthesis.getVoices();
  const ten = o?.giong ?? giongDaChon();
  const v = giongs.find((g) => g.name === ten) ?? giongs.filter((g) => /^vi/i.test(g.lang)).sort((a, b) => xepHangGiong(b) - xepHangGiong(a))[0];
  const cau = text.replace(/«|»/g, "").split(/(?<=[.!?…])\s+/).filter(Boolean);
  cau.forEach((c, i) => {
    const u = new SpeechSynthesisUtterance(c); u.lang = "vi-VN"; u.rate = o?.tocDo ?? tocDoDaChon(); u.pitch = 1;
    if (v) u.voice = v;
    if (i === cau.length - 1 && o?.onXong) u.onend = o.onXong;
    speechSynthesis.speak(u);
  });
}
function dungDocTrinhDuyet() { try { speechSynthesis?.cancel(); } catch { /* bỏ qua */ } }

// ---------- Giọng đám mây (ElevenLabs / Azure qua /api/giong-noi/doc) ----------
export type CauHinhGiongClient = { tts: "trinh_duyet" | "elevenlabs" | "azure"; stt: "trinh_duyet" | "azure"; toc_do: number; co_elevenlabs: boolean; co_azure: boolean };
let _ch: Promise<CauHinhGiongClient> | null = null;
let _chDaCo: CauHinhGiongClient | null = null;
/** Cấu hình giọng của workspace (cache trong phiên trang). */
export function cauHinhGiong(lamMoi = false): Promise<CauHinhGiongClient> {
  if (!_ch || lamMoi) _ch = fetch("/api/giong-noi/cau-hinh").then((r) => (r.ok ? r.json() : { tts: "trinh_duyet", stt: "trinh_duyet", toc_do: 1, co_elevenlabs: false, co_azure: false })).catch(() => ({ tts: "trinh_duyet", stt: "trinh_duyet", toc_do: 1, co_elevenlabs: false, co_azure: false })).then((c: CauHinhGiongClient) => (_chDaCo = c));
  return _ch;
}
/** Gọi NGAY trong lượt chạm của người dùng: Safari iPhone chỉ cho phát giọng đọc nếu lần phát đầu nằm trong lượt chạm. */
export function moKhoaAmThanh() {
  try { const u = new SpeechSynthesisUtterance(""); u.volume = 0; speechSynthesis.speak(u); } catch { /* bỏ qua */ }
}
let audioHienTai: HTMLAudioElement | null = null; let hangDoiId = 0;
function tachCau(text: string): string[] { return text.replace(/«|»/g, "").split(/(?<=[.!?…])\s+/).map((c) => c.trim()).filter(Boolean); }
/**
 * Đọc bằng giọng đám mây: tách câu, tải câu đầu rồi phát ngay trong khi tải câu kế (giảm trễ). Trả về false nếu workspace dùng giọng trình duyệt.
 * onBatDau: gọi khi bắt đầu phát câu đầu; onXong: khi phát hết (hoặc bị dừng).
 */
export async function docVanBanMay(text: string, o?: { tts?: "elevenlabs" | "azure"; giong?: string; onBatDau?: () => void; onXong?: () => void }): Promise<boolean> {
  dungDoc();
  const id = ++hangDoiId;
  const cau = tachCau(text); if (cau.length === 0) return true;
  const tai = (c: string) => fetch("/api/giong-noi/doc", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: c, tts: o?.tts, giong: o?.giong }) }).then(async (r) => (r.status === 204 ? null : r.ok ? URL.createObjectURL(await r.blob()) : Promise.reject(new Error((await r.json().catch(() => ({ loi: r.statusText }))).loi))));
  let ke = tai(cau[0]);
  for (let i = 0; i < cau.length; i++) {
    const url = await ke; if (url === null) return false; // giọng trình duyệt
    if (id !== hangDoiId) { URL.revokeObjectURL(url); return true; }
    if (i + 1 < cau.length) ke = tai(cau[i + 1]);
    if (i === 0) o?.onBatDau?.();
    await new Promise<void>((res) => { const a = new Audio(url); audioHienTai = a; a.onended = () => { URL.revokeObjectURL(url); res(); }; a.onerror = () => res(); a.play().catch(() => res()); });
    if (id !== hangDoiId) return true;
  }
  o?.onXong?.(); return true;
}
/** Đọc theo cấu hình workspace: đám mây nếu có, không thì giọng trình duyệt. */
export async function docTuDong(text: string, o?: { giong?: string | null; tocDo?: number; onXong?: () => void }) {
  const ch = await cauHinhGiong();
  if (ch.tts !== "trinh_duyet") { try { const ok = await docVanBanMay(text, { onXong: o?.onXong }); if (ok) return; } catch { /* rơi về trình duyệt */ } }
  docVanBan(text, { giong: o?.giong, tocDo: o?.tocDo, onXong: o?.onXong });
}
export function dungDoc() { hangDoiId++; if (audioHienTai) { try { audioHienTai.pause(); } catch { /* bỏ qua */ } audioHienTai = null; } dungDocTrinhDuyet(); }

// ---------- STT Azure trong trình duyệt (token ngắn hạn, không lộ key) ----------
export type BoNghe = { dung: () => void };
type TuyChonNghe = { onTam: (t: string) => void; onXong: (t: string) => void; onBatDauNoi?: () => void; onLoi?: (m: string) => void; onCanCham?: () => void };
export async function batNgheAzure(o: { onTam: (t: string) => void; onXong: (t: string) => void; onBatDauNoi?: () => void; onLoi?: (m: string) => void }): Promise<BoNghe> {
  const t = await fetch("/api/giong-noi/token").then((r) => (r.ok ? r.json() : null)).catch(() => null);
  if (!t) throw new Error("Chưa cấu hình Azure Speech");
  const sdk = await import("microsoft-cognitiveservices-speech-sdk");
  const cfg = sdk.SpeechConfig.fromAuthorizationToken(t.token, t.region);
  cfg.speechRecognitionLanguage = "vi-VN";
  cfg.setProperty(sdk.PropertyId.Speech_SegmentationSilenceTimeoutMs, "900");
  const rec = new sdk.SpeechRecognizer(cfg, sdk.AudioConfig.fromDefaultMicrophoneInput());
  rec.recognizing = (_s, e) => { if (e.result.text) o.onTam(e.result.text); };
  rec.recognized = (_s, e) => { if (e.result.reason === sdk.ResultReason.RecognizedSpeech && e.result.text.trim()) o.onXong(e.result.text.trim()); };
  rec.speechStartDetected = () => o.onBatDauNoi?.();
  rec.canceled = (_s, e) => { if (e.reason === sdk.CancellationReason.Error) o.onLoi?.(e.errorDetails); };
  await new Promise<void>((res, rej) => rec.startContinuousRecognitionAsync(res, (er) => rej(new Error(er))));
  return { dung: () => rec.stopContinuousRecognitionAsync(() => rec.close(), () => rec.close()) };
}
/** Mã lỗi Web Speech → câu báo cho người dùng (kèm mã gốc); null = lỗi thường gặp không cần báo (im lặng, bị ngắt). `dung` = lỗi không tự hết, thử lại vô ích. */
export function loiNhanGiong(ma: string): { thongBao: string; dung: boolean } | null {
  if (ma === "no-speech" || ma === "aborted") return null;
  const m = ` (mã: ${ma})`;
  const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const iphone = /iPhone|iPad|iPod/i.test(ua);
  if ((ma === "not-allowed" || ma === "service-not-allowed") && /Zalo|FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|TikTok|musical_ly/i.test(ua)) return { thongBao: "Trang đang mở bên trong ứng dụng (Zalo/Facebook/Messenger…) nên micro bị chặn. Bấm ⋯ → «Mở bằng trình duyệt» (Chrome hoặc Safari) rồi thử lại." + m, dung: true };
  if (ma === "service-not-allowed" && iphone) return { thongBao: "iPhone cần bật Đọc chính tả: Cài đặt → Cài đặt chung → Bàn phím → bật «Đọc chính tả», rồi tải lại trang." + m, dung: true };
  if (ma === "not-allowed" || ma === "service-not-allowed") return { thongBao: (iphone ? "Safari chặn micro: Cài đặt → Safari → Micrô → «Cho phép» (hoặc chữ «aA» trên thanh địa chỉ → Cài đặt trang web → Micrô), rồi tải lại trang." : "Trình duyệt chặn micro: chạm biểu tượng bên trái địa chỉ trang → Quyền → Micrô → Cho phép, rồi tải lại trang.") + m, dung: true };
  if (ma === "audio-capture") return { thongBao: "Không thu được tiếng từ micro: máy chưa có micro, micro đang bị ứng dụng khác dùng, hoặc hệ điều hành chưa bật đầu vào micro." + m, dung: true };
  if (ma === "network") return { thongBao: "Nhận dạng giọng nói của trình duyệt cần mạng (gửi tiếng lên máy chủ Google/Apple); kiểm tra mạng hoặc dùng Azure STT." + m, dung: false };
  if (ma === "language-not-supported") return { thongBao: "Trình duyệt không nhận dạng được tiếng Việt; dùng Chrome/Safari bản mới hoặc cấu hình Azure STT." + m, dung: true };
  return { thongBao: "Lỗi nhận dạng giọng nói" + m, dung: false };
}
/** Web Speech API (trình duyệt) với cùng giao diện. */
export function batNgheTrinhDuyet(o: TuyChonNghe): BoNghe {
  type SR = { lang: string; continuous: boolean; interimResults: boolean; start(): void; stop(): void; onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null; onerror: ((e: { error: string }) => void) | null; onend: (() => void) | null; onstart: (() => void) | null; onspeechstart: (() => void) | null };
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  const C = w.SpeechRecognition || w.webkitSpeechRecognition; if (!C) throw new Error("Trình duyệt không hỗ trợ nhận dạng giọng nói (dùng Chrome/Safari bản mới hoặc cấu hình Azure)");
  const r = new C(); r.lang = "vi-VN"; r.continuous = true; r.interimResults = true;
  let song = true, daChay = false, choChay = false, hen: number | undefined;
  // Điện thoại hay ngắt phiên nhận dạng (sau mỗi câu, khi phát giọng khách). Tự bật lại ngoài lượt chạm thì iPhone/Android có thể từ chối
  // (báo not-allowed dù đã cho quyền) hoặc lặng im: khi đó báo onCanCham để giao diện chờ lượt chạm kế tiếp thay vì báo nhầm là bị chặn.
  const canCham = () => { song = false; choChay = false; clearTimeout(hen); if (o.onCanCham) o.onCanCham(); else o.onLoi?.("Điện thoại đã ngắt micro; dừng nghe rồi bật lại để tiếp tục."); };
  const chay = () => { choChay = true; try { r.start(); } catch { if (daChay) canCham(); return; } clearTimeout(hen); if (daChay) hen = window.setTimeout(() => { if (choChay) canCham(); }, 3000); };
  r.onstart = () => { daChay = true; choChay = false; clearTimeout(hen); };
  r.onresult = (e) => { let tam = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const k = e.results[i]; const tx = k[0].transcript.trim(); if (k.isFinal) { if (tx) o.onXong(tx); } else tam += tx + " "; } if (tam) o.onTam(tam.trim()); };
  r.onspeechstart = () => o.onBatDauNoi?.();
  r.onerror = (e) => {
    if (daChay && (e.error === "not-allowed" || e.error === "service-not-allowed")) { canCham(); return; }
    const l = loiNhanGiong(e.error); if (!l) return;
    o.onLoi?.(l.thongBao);
    if (l.dung) { song = false; o.onCanCham?.(); } // sửa quyền xong chạm «Chạm để nói» là thử lại, không phải tải lại trang
  };
  r.onend = () => { if (song) chay(); };
  chay();
  return { dung: () => { song = false; clearTimeout(hen); try { r.stop(); } catch { /* bỏ qua */ } } };
}
export async function batNghe(o: TuyChonNghe): Promise<{ bo: BoNghe; nha: "azure" | "trinh_duyet" }> {
  // Không await khi đã có cấu hình: r.start() phải chạy đồng bộ trong lượt chạm «Nhấc máy», Safari iPhone từ chối nếu chậm một nhịp.
  const ch = _chDaCo ?? (await cauHinhGiong());
  if (ch.stt === "azure") { try { return { bo: await batNgheAzure(o), nha: "azure" }; } catch (e) { o.onLoi?.(`Azure STT lỗi (${(e as Error).message}), dùng trình duyệt`); } }
  return { bo: batNgheTrinhDuyet(o), nha: "trinh_duyet" };
}

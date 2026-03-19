import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BannerItem = {
  id: string;
  nhan: string;
  tieuDe: string;
  nutText: string;
  lopPhu: string;
  hinhAnh: string;
};

const DANH_SACH_BANNER: BannerItem[] = [
  {
    id: "1",
    nhan: "CHĂM SÓC TOÀN DIỆN",
    tieuDe: "Chăm sóc sức khỏe\nphổi toàn diện",
    nutText: "Khám phá ngay",
    lopPhu: "rgba(10,124,255,0.85)",
    hinhAnh:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYxDTSa51LrRLJsK4BTzCss1JQTQgnOsX1g-rO51r4EYTNrOScpK4-yHLycKeck2A6sz5r7eNc0zjmL6YNawHTzluXZGmE2iF9frPWZ4p9kcR1nQtCJa5iXD1j5AdfyQ-kdLYVVl7Q55GNFCe54ayCKMrqWkDVBL98PLgbXttWefV2WKqsVIxEcdTPXyx1lU-p3g49wDyuH2l2ued3MBzemwNuXJMYR1NqSTZDQNsh4yFkPQDZF9yKfBr5LsZh7EH831C-k0gKAo0m",
  },
  {
    id: "2",
    nhan: "ĐẶT LỊCH NGAY",
    tieuDe: "Hơn 50 bác sĩ\nchuyên khoa hô hấp",
    nutText: "Đặt lịch khám",
    lopPhu: "rgba(5,150,105,0.85)",
    hinhAnh:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_iLiX96-7KdxD4YhY0FSz0j7UjUIwRaf_hijFJXoGnoU0IKtsM5oAaEYSD5faycH9y8oNIauP5l9PXYxdsY8BgA76M9mLZJ8ee-3zNiE5svEEj9YwZ2w1qWdc7fqr3OPfkX5dkfXBaLvlobTs2n7EgUxU2vrO2z08OQ7LYxOz-yk62p01ISci48F58PYinPutu76l38sDmsdKyYvzADcFQ5Ir61f-_9CilNd2SDQQ-joUrGyreyvry5R-zRH__G7ns7a-0x5bTuPF",
  },
  {
    id: "3",
    nhan: "CÔNG NGHỆ AI",
    tieuDe: "Phân tích X-quang\nphổi bằng AI",
    nutText: "Thử ngay miễn phí",
    lopPhu: "rgba(79,70,229,0.85)",
    hinhAnh:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Z35PMEKVy1oCowwCra6qNghyrapFVbSjVECe3cNKjl9gZJHbC4gWSbILWcIonzWzC2L-dgPNFoAVbfFQj8SIDoprB3jEKaqmVyP6_DkfYIAuSHJxPiThA1CjgGDL1vIkDu8l4o0VvJbY1M-7mGIRoFs5AbQiuFe9F8eVabNuGTYVUXVKT5QW0pmOXYzTKTwkDUyGpEZGa_xZ-2_an9chkmWtjg9hPXGNeXRmlFf3hHtS1ahwIv5dJKZmRNMlXphQUS7w_KvcyEMB",
  },
];

const THOI_GIAN_TU_DONG = 4000;

export function PromoBanner() {
  const [chiSoHienTai, setChiSoHienTai] = useState(0);
  const [dangKeo, setDangKeo] = useState(false);

  const khungRef = useRef<HTMLDivElement | null>(null);
  const dangKeoRef = useRef(false);
  const viTriBatDauRef = useRef(0);
  const scrollBatDauRef = useRef(0);
  const tamDungTuDongRef = useRef(false);

  const scrollDenBanner = (chiSo: number, smooth = true) => {
    const khung = khungRef.current;
    if (!khung) return;

    khung.scrollTo({
      left: khung.clientWidth * chiSo,
      behavior: smooth ? "smooth" : "auto",
    });

    setChiSoHienTai(chiSo);
  };

  const denBannerSau = () => {
    const chiSoMoi =
      chiSoHienTai === DANH_SACH_BANNER.length - 1 ? 0 : chiSoHienTai + 1;
    scrollDenBanner(chiSoMoi);
  };

  const denBannerTruoc = () => {
    const chiSoMoi =
      chiSoHienTai === 0 ? DANH_SACH_BANNER.length - 1 : chiSoHienTai - 1;
    scrollDenBanner(chiSoMoi);
  };

  const xuLyScroll = () => {
    const khung = khungRef.current;
    if (!khung) return;

    const chiSoMoi = Math.round(khung.scrollLeft / khung.clientWidth);
    setChiSoHienTai(chiSoMoi);
  };

  const xuLyPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const khung = khungRef.current;
    if (!khung) return;

    dangKeoRef.current = true;
    tamDungTuDongRef.current = true;
    setDangKeo(true);

    viTriBatDauRef.current = e.clientX;
    scrollBatDauRef.current = khung.scrollLeft;

    khung.setPointerCapture(e.pointerId);
  };

  const xuLyPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dangKeoRef.current) return;

    const khung = khungRef.current;
    if (!khung) return;

    const doLech = e.clientX - viTriBatDauRef.current;
    khung.scrollLeft = scrollBatDauRef.current - doLech;
  };

  const xuLyPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const khung = khungRef.current;
    if (!khung) return;

    dangKeoRef.current = false;
    setDangKeo(false);

    if (khung.hasPointerCapture(e.pointerId)) {
      khung.releasePointerCapture(e.pointerId);
    }

    const chiSoMoi = Math.round(khung.scrollLeft / khung.clientWidth);
    scrollDenBanner(chiSoMoi);

    setTimeout(() => {
      tamDungTuDongRef.current = false;
    }, 2500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (tamDungTuDongRef.current || dangKeoRef.current) return;

      setChiSoHienTai((giaTriCu) => {
        const chiSoMoi =
          giaTriCu === DANH_SACH_BANNER.length - 1 ? 0 : giaTriCu + 1;

        const khung = khungRef.current;
        if (khung) {
          khung.scrollTo({
            left: khung.clientWidth * chiSoMoi,
            behavior: "smooth",
          });
        }

        return chiSoMoi;
      });
    }, THOI_GIAN_TU_DONG);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
      <div
        ref={khungRef}
        onScroll={xuLyScroll}
        onPointerDown={xuLyPointerDown}
        onPointerMove={xuLyPointerMove}
        onPointerUp={xuLyPointerUp}
        onPointerCancel={xuLyPointerUp}
        className="hide-scrollbar flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory select-none"
        style={{
          cursor: dangKeo ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        {DANH_SACH_BANNER.map((banner) => (
          <div
            key={banner.id}
            className="relative h-[400px] w-full shrink-0 snap-start"
          >
            <img
              src={banner.hinhAnh}
              alt={banner.nhan}
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: banner.lopPhu }}
            />

            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-secondary" />

            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
              <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {banner.nhan}
              </span>

              <h1 className="mb-4 max-w-xl whitespace-pre-line text-5xl font-extrabold leading-tight">
                {banner.tieuDe}
              </h1>

              <Link
                to="/doctor"
                className="w-fit rounded-2xl bg-white px-8 py-4 font-bold text-primary transition-all hover:bg-slate-100"
              >
                {banner.nutText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={denBannerTruoc}
        aria-label="Banner trước"
        className="absolute top-1/2 left-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={denBannerSau}
        aria-label="Banner sau"
        className="absolute top-1/2 right-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  );
}

export default PromoBanner;

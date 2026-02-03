import { useEffect, useState } from "react";

function DoctorAppointment() {
  interface Doctor {
    id: string;
    fullName: string;
    gender: "MALE" | "FEMALE";
    avatarUrl: string | null;
    title: string | null;
    specialty: string;
    yearsOfExperience: number;
    address: string | null;

    defaultConsultationFee: string;
    primaryHospital?: {
      id: string;
      name: string;
    };
  }
  interface TimeSlot {
    id: string;
    startTime: string; // ISO string
    endTime: string;
    isAvailable: boolean;
  }
  // Helpers functions

  // hàm định dạng ngày tháng từ ISO string
  const formatDate = (iso: string) =>
    iso.slice(0, 10); // YYYY-MM-DD
  // hàm định dạng giờ từ ISO string
  // const formatTime = (iso: string) =>
  //   new Date(iso).toLocaleTimeString("vi-VN", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // hàm lấy nhãn ngày (Hôm nay, Ngày mai, dd/mm/yyyy)
  const getDayLabel = (iso: string) => {
    const date = iso.slice(0, 10);

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().slice(0, 10);

    if (date === todayStr) return "Hôm nay";
    if (date === tomorrowStr) return "Ngày mai";

    return new Date(iso).toLocaleDateString("vi-VN");
  };


  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [schedules, setSchedules] = useState<Record<string, TimeSlot[]>>({});

  const [filters, setFilters] = useState({
    specialty: "ALL",        // ALL | Hô hấp | Tim mạch | Nhi khoa
    gender: "ALL",           // ALL | MALE | FEMALE
    experience: "ALL",       // ALL | 5 | 10
    region: "ALL",           // ALL | Hà Nội | TP. Hồ Chí Minh | ...
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const specialties = Array.from(
    new Set(doctors.map((d) => d.specialty).filter(Boolean))
  );

  const regions = Array.from(
    new Set(doctors.map((d) => d.primaryHospital?.name).filter(Boolean))
  );
  
  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch(
        // `http://localhost:3000/doctors?page=${page}&limit=5`
        `http://localhost:3000/public/doctors?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const json = await res.json();
      setDoctors(json.data.items);
      setTotalPages(json.data.meta.totalPages);
      // setDoctors(json.data);
      // setTotalPages(json.meta.totalPages);
    };

    fetchDoctors();
  }, [page]);

  // hàm lấy các khung giờ của ngày gần nhất có lịch trống
  const getNearestAvailableDateSlots = (slots: TimeSlot[]) => {
    const today = new Date().toISOString().slice(0, 10);

    // group slot theo ngày
    const grouped: Record<string, TimeSlot[]> = {};

    slots.forEach((slot) => {
      if (!slot.isAvailable) return;

      const date = formatDate(slot.startTime);
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(slot);
    });

    // tìm ngày >= hôm nay gần nhất
    const nearestDate = Object.keys(grouped)
      .filter((date) => date >= today)
      .sort()[0];

    return nearestDate ? grouped[nearestDate] : [];
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      const result: Record<string, TimeSlot[]> = {};

      await Promise.all(
        doctors.map(async (doctor) => {
          const res = await fetch(
            `http://localhost:3000/public/doctors/${doctor.id}/time-slots`
          );

          const json = await res.json();

          const slots: TimeSlot[] = json.data ?? [];

          result[doctor.id] = getNearestAvailableDateSlots(slots);
        })
      );

      setSchedules(result);
    };

    if (doctors.length) fetchTimeSlots();
  }, [doctors]);

  // lọc bác sĩ dựa trên filters
  const filteredDoctors = doctors.filter((doctor) => {
    // lọc chuyên khoa
    if (
      filters.specialty !== "ALL" &&
      doctor.specialty !== filters.specialty
    ) {
      return false;
    }

    // lọc giới tính
    if (
      filters.gender !== "ALL" &&
      doctor.gender !== filters.gender
    ) {
      return false;
    }

    // lọc kinh nghiệm
    if (filters.experience === "5" && doctor.yearsOfExperience < 5) {
      return false;
    }
    if (filters.experience === "10" && doctor.yearsOfExperience < 10) {
      return false;
    }

    // lọc khu vực (tạm dùng tên bệnh viện / địa chỉ)
    if (
      filters.region !== "ALL" &&
      !doctor.primaryHospital?.name?.includes(filters.region)
    ) {
      return false;
    }

    return true;
  });

  return (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
      <a className="hover:text-primary" href="#">Trang chủ</a>
      <span className="material-symbols-outlined text-xs">chevron_right</span>
      <span className="font-medium text-slate-900 dark:text-white">
        Đặt lịch bác sĩ
      </span>
    </div>

    <h1 className="text-2xl font-bold mb-8">Đặt lịch bác sĩ</h1>

    <div className="flex flex-col lg:flex-row gap-8">
      {/* ===== FILTER ===== */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                filter_list
              </span>
              Bộ lọc tìm kiếm
            </h2>
            <button
              onClick={() =>
                setFilters({
                  specialty: "ALL",
                  gender: "ALL",
                  experience: "ALL",
                  region: "ALL",
                })
              }
              className="text-xs text-primary font-medium hover:underline"
            >
              Xóa tất cả
            </button>

          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium block mb-3">
                Chuyên khoa
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input
                    className="text-primary focus:ring-primary/20"
                    type="radio"
                    name="specialty"
                    checked={filters.specialty === "ALL"}
                    onChange={() =>
                      setFilters((f) => ({ ...f, specialty: "ALL" }))
                    }
                  />
                  <span className="group-hover:text-primary transition-colors">
                    Tất cả
                  </span>
                </label>
                {specialties.map((sp) => (
                  <label
                    key={sp}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="specialty"
                      checked={filters.specialty === sp}
                      onChange={() =>
                        setFilters((f) => ({ ...f, specialty: sp }))
                      }
                    />
                    <span>{sp}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-3">
                Khu vực
              </label>
              <select
                value={filters.region}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, region: e.target.value }))
                }
                className="w-full text-sm rounded-lg border"
              >
                <option value="ALL">Tất cả khu vực</option>

                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-3">
                Kinh nghiệm
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input
                    className="text-primary focus:ring-primary/20"
                    type="radio"
                    name="experience"
                    checked={filters.experience === "ALL"}
                    onChange={() =>
                      setFilters((f) => ({ ...f, experience: "ALL" }))
                    }
                  />
                  <span className="group-hover:text-primary transition-colors">
                    Tất cả
                  </span>
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input
                    className="text-primary focus:ring-primary/20"
                    type="radio"
                    name="experience"
                    checked={filters.experience === "5"}
                    onChange={() =>
                      setFilters((f) => ({ ...f, experience: "5" }))
                    }
                  />
                  <span className="group-hover:text-primary transition-colors">
                    Trên 5 năm
                  </span>
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input
                    className="text-primary focus:ring-primary/20"
                    type="radio"
                    name="experience"
                    checked={filters.experience === "10"}
                    onChange={() =>
                      setFilters((f) => ({ ...f, experience: "10" }))
                    }
                  />
                  <span className="group-hover:text-primary transition-colors">
                    Trên 10 năm
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-3">
                Giới tính
              </label>
              <div className="grid grid-cols-3 gap-2">
                {/* <button className="py-2 text-sm rounded-lg border border-primary bg-primary/5 text-primary font-medium">
                  Nam
                </button>
                <button className="py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">
                  Nữ
                </button> */}
                <button
                  onClick={() =>
                    setFilters((f) => ({ ...f, gender: "ALL" }))
                  }
                  className={`py-2 text-sm rounded-lg border ${
                    filters.gender === "ALL"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  Tất cả
                </button>
                <button onClick={() =>
                    setFilters((f) => ({ ...f, gender: "MALE" }))
                  }
                  className={`py-2 text-sm rounded-lg border ${
                    filters.gender === "MALE"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-200"
                  }`}>
                  Nam
                </button>
                <button
                  onClick={() =>
                    setFilters((f) => ({ ...f, gender: "FEMALE" }))
                  }
                  className={`py-2 text-sm rounded-lg border ${
                    filters.gender === "FEMALE"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-200"
                  }`}
                >
                  Nữ
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== DOCTOR LIST + PAGINATION ===== */}
      <div className="flex-1">
        <div className="space-y-4">
          {filteredDoctors.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">
              <div className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-5xl text-slate-400">
                  sentiment_dissatisfied
                </span>

                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  Không có bác sĩ nào phù hợp
                </p>

                <p className="text-sm text-slate-500">
                  Vui lòng thay đổi hoặc xóa bớt bộ lọc để xem thêm kết quả.
                </p>
              </div>
            </div>
          ) :
          (filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-6 relative group transition-all hover:shadow-md"
            >
              <div className="flex-shrink-0 relative">
                  <img
                    src={doctor.avatarUrl ?? "https://via.placeholder.com/150"}
                    alt={doctor.fullName}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800"
                  />
                  {/* <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] fill-current">
                        star
                    </span>
                    4.9
                  </div> */}
              </div>
              <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {doctor.title}
                        </p>
                        <h3 className="text-xl font-bold mb-2">{doctor.fullName}</h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full">
                            {doctor.specialty}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="material-symbols-outlined text-sm">history</span>
                            {doctor.yearsOfExperience} năm kinh nghiệm
                        </span>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600">
                        <p className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">
                            location_on
                            </span>
                            {doctor.primaryHospital?.name}
                        </p>
                        <p className="flex items-center gap-2 text-secondary">
                            <span className="material-symbols-outlined text-lg">
                            calendar_today
                            </span>
                            {schedules[doctor.id]?.length ? (
                              <div className="flex flex-row items-center gap-1">
                                <span className="text-xs font-medium text-slate-500">
                                  {getDayLabel(schedules[doctor.id][0].startTime)}:
                                </span>

                                <div className="flex flex-wrap gap-2">
                                  {schedules[doctor.id].slice(0, 3).map((slot) => (
                                    <span
                                      key={slot.id}
                                      className="px-2 py-1 border rounded-lg text-xs bg-green-50"
                                    >
                                      {new Date(slot.startTime).toLocaleTimeString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                      {" - "}
                                      {new Date(slot.endTime).toLocaleTimeString("vi-VN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-400">Chưa có lịch</span>
                            )}
                        </p>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:text-right">
                        <p className="text-xs text-slate-400 mb-1">Giá khám</p>
                        <p className="text-lg font-bold text-primary">
                          {Number(doctor.defaultConsultationFee).toLocaleString()}đ
                        </p>
                    </div>
                    
                  </div>

                  <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-xl">
                      <span className="material-symbols-outlined">videocam</span>
                      Tư vấn
                  </button>
                  <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl">
                      <span className="material-symbols-outlined">
                      event_available
                      </span>
                      Đặt lịch
                  </button>
                  <button className="p-2.5 border rounded-xl items-center justify-center flex">
                      <span className="material-symbols-outlined">favorite</span>
                  </button>
                  </div>
              </div>
            </div>
          )))
        }
        </div>
        {/* ===== PAGINATION ===== */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                page === i + 1
                  ? "bg-primary text-white"
                  : "border text-slate-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  </main>

    )
}

export default DoctorAppointment;  
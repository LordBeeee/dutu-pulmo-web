/**
 * @deprecated Route /doctor-appointment now aliases to /doctor via redirect in App.tsx.
 * Keep this file temporarily for cleanup phase only.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDoctors } from '@/hooks/use-doctors';
import { doctorService, type TimeSlotResponse } from '@/services/doctor';
import type { Doctor, DoctorFilters } from '@/types/doctor';

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

function getDayLabel(iso: string) {
  const date = iso.slice(0, 10);

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  if (date === todayStr) return 'Hôm nay';
  if (date === tomorrowStr) return 'Ngày mai';

  return new Date(iso).toLocaleDateString('vi-VN');
}

function getNearestAvailableDateSlots(slots: TimeSlotResponse[]) {
  const today = new Date().toISOString().slice(0, 10);
  const grouped: Record<string, TimeSlotResponse[]> = {};

  slots.forEach((slot) => {
    if (!slot.isAvailable) return;

    const date = formatDate(slot.startTime);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(slot);
  });

  const nearestDate = Object.keys(grouped)
    .filter((date) => date >= today)
    .sort()[0];

  return nearestDate ? grouped[nearestDate] : [];
}

const EMPTY_DOCTORS: Doctor[] = [];

function DoctorAppointment() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    specialty: 'ALL',
    gender: 'ALL',
    experience: 'ALL',
    region: 'ALL',
  });

  const [page, setPage] = useState(1);
  const [schedules, setSchedules] = useState<Record<string, TimeSlotResponse[]>>({});

  const doctorFilters = useMemo<DoctorFilters>(() => ({
    search: '',
    specialty: filters.specialty,
    hospitalId: '',
    appointmentType: 'all',
    sort: 'createdAt',
    order: 'DESC',
  }), [filters.specialty]);

  const doctorsQuery = useDoctors(page, doctorFilters);
  const doctors = doctorsQuery.data?.data.items ?? EMPTY_DOCTORS;
  const totalPages = doctorsQuery.data?.data.meta.totalPages ?? 1;

  useEffect(() => {
    let mounted = true;

    const fetchSchedules = async () => {
      const result: Record<string, TimeSlotResponse[]> = {};

      await Promise.all(
        doctors.map(async (doctor) => {
          const slots = await doctorService.getDoctorTimeSlots(doctor.id);
          result[doctor.id] = getNearestAvailableDateSlots(slots);
        }),
      );

      if (mounted) {
        setSchedules(result);
      }
    };

    if (!doctors.length) {
      return () => {
        mounted = false;
      };
    }

    void fetchSchedules();

    return () => {
      mounted = false;
    };
  }, [doctors]);

  const specialties = Array.from(new Set(doctors.map((d) => d.specialty).filter(Boolean)));
  const regions = Array.from(new Set(doctors.map((d) => d.primaryHospital?.name).filter(Boolean)));

  const filteredDoctors = doctors.filter((doctor) => {
    if (filters.specialty !== 'ALL' && doctor.specialty !== filters.specialty) return false;
    if (filters.gender !== 'ALL' && doctor.gender !== filters.gender) return false;
    if (filters.experience === '5' && doctor.yearsOfExperience < 5) return false;
    if (filters.experience === '10' && doctor.yearsOfExperience < 10) return false;
    if (filters.region !== 'ALL' && !doctor.primaryHospital?.name?.includes(filters.region)) return false;
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <a className="hover:text-primary" href="#">Trang chủ</a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-slate-900 dark:text-white">Đặt lịch bác sĩ</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Đặt lịch bác sĩ</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">filter_list</span>
                Bộ lọc tìm kiếm
              </h2>
              <button
                onClick={() =>
                  setFilters({
                    specialty: 'ALL',
                    gender: 'ALL',
                    experience: 'ALL',
                    region: 'ALL',
                  })
                }
                className="text-xs text-primary font-medium hover:underline"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium block mb-3">Chuyên khoa</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer group">
                    <input className="text-primary focus:ring-primary/20" type="radio" name="specialty" checked={filters.specialty === 'ALL'} onChange={() => setFilters((f) => ({ ...f, specialty: 'ALL' }))} />
                    <span className="group-hover:text-primary transition-colors">Tất cả</span>
                  </label>
                  {specialties.map((sp) => (
                    <label key={sp} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="specialty" checked={filters.specialty === sp} onChange={() => setFilters((f) => ({ ...f, specialty: sp }))} />
                      <span>{sp}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-3">Khu vực</label>
                <select value={filters.region} onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))} className="w-full text-sm rounded-lg border">
                  <option value="ALL">Tất cả khu vực</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {doctorsQuery.isLoading ? (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border">Đang tải danh sách bác sĩ...</div>
          ) : doctorsQuery.isError ? (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border text-red-500">Không thể tải danh sách bác sĩ.</div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-6 relative group transition-all hover:shadow-md">
                  <div className="flex-shrink-0 relative">
                    <img src={doctor.avatarUrl ?? 'https://via.placeholder.com/150'} alt={doctor.fullName} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{doctor.title}</p>
                        <h3 className="text-xl font-bold mb-2">{doctor.fullName}</h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full">{doctor.specialty}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="material-symbols-outlined text-sm">history</span>
                            {doctor.yearsOfExperience} năm kinh nghiệm
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600">
                          <p className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">location_on</span>
                            {doctor.primaryHospital?.name}
                          </p>
                          <p className="flex items-center gap-2 text-secondary">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            {schedules[doctor.id]?.length ? (
                              <div className="flex flex-row items-center gap-1">
                                <span className="text-xs font-medium text-slate-500">{getDayLabel(schedules[doctor.id][0].startTime)}:</span>
                                <div className="flex flex-wrap gap-2">
                                  {schedules[doctor.id].slice(0, 3).map((slot) => (
                                    <span key={slot.id} className="px-2 py-1 border rounded-lg text-xs bg-green-50">
                                      {new Date(slot.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                      {' - '}
                                      {new Date(slot.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
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
                        <p className="text-lg font-bold text-primary">{Number(doctor.defaultConsultationFee).toLocaleString()}đ</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl" onClick={() => navigate('/appointment', { state: { doctorId: doctor.id } })}>
                        <span className="material-symbols-outlined">event_available</span>
                        Đặt lịch
                      </button>
                      <button className="p-2.5 border rounded-xl items-center justify-center flex">
                        <span className="material-symbols-outlined">favorite</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  page === i + 1 ? 'bg-primary text-white' : 'border text-slate-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DoctorAppointment;









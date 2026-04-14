import { useMemo, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useMedicalRecords } from '@/hooks/use-medical-records';
import MedicalRecordCard from '@/components/medical/MedicalRecordCard';
import type { MedicalRecordStatus } from '@/types/medical.types';
import DoctorPagination from '@/components/Doctor/DoctorPagination';

const STATUS_OPTIONS: { label: string; value: MedicalRecordStatus }[] = [
  { label: 'Nháp', value: 'DRAFT' },
  { label: 'Đang xử lý', value: 'IN_PROGRESS' },
  { label: 'Hoàn thành', value: 'COMPLETED' },
  { label: 'Đã hủy', value: 'CANCELLED' },
];

const ITEMS_PER_PAGE = 10;

export default function MedicalRecordsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: records = [], isLoading, isError, refetch } = useMedicalRecords();

  const [searchInput, setSearchInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  // Params
  const search = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateParams = (next: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams);
    // Object.entries(next).forEach(([key, value]) => {
    //   if (!value) params.delete(key);
    //   else params.set(key, String(value));
    // });
    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  // Client-side filtering
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        !search ||
        r.recordNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
        r.doctor?.fullName.toLowerCase().includes(search.toLowerCase());

      const matchStatus = !status || r.status === status;

      const recordDate = new Date(r.createdAt);
      const matchStart = !startDate || recordDate >= new Date(startDate);
      // End date includes the entire day
      const matchEnd = !endDate || recordDate <= new Date(new Date(endDate).setHours(23, 59, 59));

      return matchSearch && matchStatus && matchStart && matchEnd;
    });
  }, [records, search, status, startDate, endDate]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecords, page]);

  useEffect(() => {
    if (isComposing) return;

    const timer = window.setTimeout(() => {
      const normalizedCurrent = search ?? '';
      const normalizedInput = searchInput ?? '';

      if (normalizedInput !== normalizedCurrent) {
        updateParams({
          search: normalizedInput,
          page: 1,
        });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput, isComposing, search]);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-slate-900">Hồ sơ y tế</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hồ sơ y tế của tôi</h1>
          <p className="text-slate-500 mt-1">Xem và quản lý lịch sử khám bệnh, chẩn đoán và kết quả điều trị</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Tổng số: <span className="font-semibold">{filteredRecords.length}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">filter_list</span>
                Bộ lọc
              </h2>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-primary font-medium hover:underline"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium block mb-2">Tìm kiếm</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-1 top-1 text-slate-400 text-lg">search</span>
                  <input
                  type="text"
                  value={searchInput}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={(event) => {
                    setIsComposing(false);
                    setSearchInput(event.currentTarget.value);
                  }}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                  }}
                  placeholder="Mã hồ sơ, bác sĩ..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm pl-5"
                />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => updateParams({ status: e.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none"
                >
                  <option value="">Tất cả</option>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Từ ngày</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => updateParams({ startDate: e.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Đến ngày</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => updateParams({ endDate: e.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* List Content */}
        <div className="flex-1">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl border border-red-100 p-8 text-center">
              <span className="material-symbols-outlined text-red-400 text-4xl mb-2">error</span>
              <p className="text-slate-600">Đã có lỗi xảy ra khi tải dữ liệu.</p>
              <button
                onClick={() => void refetch()}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium"
              >
                Thử lại
              </button>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-20">inventory_2</span>
              <p>Không tìm thấy hồ sơ nào phù hợp với bộ lọc.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedRecords.map((record) => (
                <MedicalRecordCard key={record.id} record={record} />
              ))}

              {totalPages > 1 && (
                <div className="mt-8">
                  <DoctorPagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(p) => updateParams({ page: p })}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

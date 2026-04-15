import { useMemo, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePrescriptions } from '@/hooks/use-prescriptions';
import PrescriptionCard from '@/components/medical/PrescriptionCard';
import type { PrescriptionStatus } from '@/types/medical.types';
import DoctorPagination from '@/components/Doctor/DoctorPagination';

const STATUS_OPTIONS: { label: string; value: PrescriptionStatus }[] = [
  { label: 'Chờ xử lý', value: 'PENDING' },
  { label: 'Đang áp dụng', value: 'ACTIVE' },
  { label: 'Hoàn thành', value: 'COMPLETED' },
  { label: 'Đã hủy', value: 'CANCELLED' },
  { label: 'Hết hạn', value: 'EXPIRED' },
];

const ITEMS_PER_PAGE = 10;

export default function PrescriptionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: prescriptions = [], isLoading, isError, refetch } = usePrescriptions();

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
    Object.entries(next).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, String(value));
    });
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  // Client-side filtering
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((p) => {
      const matchSearch =
        !search ||
        p.prescriptionNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
        p.doctor?.fullName.toLowerCase().includes(search.toLowerCase());

      const matchStatus = !status || p.status === status;

      const recordDate = new Date(p.createdAt);
      const matchStart = !startDate || recordDate >= new Date(startDate);
      const matchEnd = !endDate || recordDate <= new Date(new Date(endDate).setHours(23, 59, 59));

      return matchSearch && matchStatus && matchStart && matchEnd;
    });
  }, [prescriptions, search, status, startDate, endDate]);

  // Pagination
  const totalPages = Math.ceil(filteredPrescriptions.length / ITEMS_PER_PAGE);
  const paginatedPrescriptions = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredPrescriptions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPrescriptions, page]);

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
        <span className="font-medium text-slate-900">Đơn thuốc</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Đơn thuốc của tôi</h1>
          <p className="text-slate-500 mt-1">Theo dõi các loại thuốc đang sử dụng, liều lượng và chỉ dẫn từ bác sĩ</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Tổng số: <span className="font-semibold">{filteredPrescriptions.length}</span>
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
                  <span className="material-symbols-outlined absolute left-3 top-1 text-slate-400 text-lg">search</span>
                  {/* <input
                    type="text"
                    value={search}
                    onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
                    placeholder="Mã đơn, bác sĩ..."
                    className="w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2 text-sm focus:border-primary outline-none"
                  /> */}
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
                    placeholder="Mã đơn, bác sĩ..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm pl-10"
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
              <p className="text-slate-600">Lỗi khi tải đơn thuốc.</p>
              <button
                onClick={() => void refetch()}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium"
              >
                Thử lại
              </button>
            </div>
          ) : filteredPrescriptions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-20">pill</span>
              <p>Chưa có đơn thuốc nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedPrescriptions.map((p) => (
                <PrescriptionCard key={p.id} prescription={p} />
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

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import DoctorPagination from '@/components/Doctor/DoctorPagination';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import PendingPaymentBanner from '@/components/appointments/PendingPaymentBanner';
import { APPOINTMENT_STATUS_OPTIONS } from '@/constants/appointment-status';
import { useAppointments } from '@/hooks/use-appointments';
import type { AppointmentListQuery } from '@/services/appointment.service';

const DEFAULT_LIMIT = 10;

type AppointmentSort = 'createdAt' | 'scheduledAt' | 'updatedAt';
type SortOrder = 'ASC' | 'DESC';

const APPOINTMENT_SORT_OPTIONS: Array<{ value: AppointmentSort; label: string }> = [
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'scheduledAt', label: 'Ngày khám' },
  { value: 'updatedAt', label: 'Cập nhật gần nhất' },
];

function parsePositiveNumber(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseSort(value: string | null): AppointmentSort {
  return value === 'scheduledAt' || value === 'updatedAt' ? value : 'createdAt';
}

function parseOrder(value: string | null): SortOrder {
  return value === 'ASC' ? 'ASC' : 'DESC';
}

function AppointmentSchedule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);


  const page = parsePositiveNumber(searchParams.get('page'), 1);
  const limit = parsePositiveNumber(searchParams.get('limit'), DEFAULT_LIMIT);
  const search = searchParams.get('search') ?? '';
  const sort = parseSort(searchParams.get('sort'));
  const order = parseOrder(searchParams.get('order'));
  const status = searchParams.get('status') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const isInvalidDateRange = Boolean(startDate && endDate && startDate > endDate);
  const safeStartDate = isInvalidDateRange ? undefined : startDate || undefined;
  const safeEndDate = isInvalidDateRange ? undefined : endDate || undefined;

  useEffect(() => {
    setSearchInput(search);
  }, [search]);
  const queryParams: AppointmentListQuery = {
    page,
    limit,
    search: search || undefined,
    sort,
    order,
    status: (status || undefined) as AppointmentListQuery['status'],
    startDate: safeStartDate,
    endDate: safeEndDate,
  };

  const appointmentsQuery = useAppointments(queryParams);
  const appointments = appointmentsQuery.data?.items ?? [];

  const totalPages = appointmentsQuery.data?.meta?.totalPages ?? 1;
  const totalItems = appointmentsQuery.data?.meta?.totalItems ?? appointments.length;

  const updateParams = (next: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams);

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
    setSearchParams({
      page: '1',
      limit: String(DEFAULT_LIMIT),
      sort: 'createdAt',
      order: 'DESC',
    });
  };
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
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-slate-900">Lịch khám</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Lịch khám của tôi</h1>
          <p className="text-slate-500 mt-1">Quản lý lịch khám theo trạng thái, ngày khám và thông tin tìm kiếm</p>
        </div>

        {status !== 'PENDING_PAYMENT' && <div className="mt-4"><PendingPaymentBanner /></div>}

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            Tổng số lịch: <span className="font-semibold">{totalItems}</span>
          </span>
          <Link to="/doctor" className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-2.5 text-sm font-semibold hover:opacity-95">
            <span className="material-symbols-outlined text-base">add</span>
            Đặt lịch mới
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">filter_list</span>
                Bộ lọc tìm kiếm
              </h2>

              <button type="button" onClick={handleResetFilters} className="text-xs text-primary font-medium hover:underline">
                Xóa tất cả
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium block mb-2">Từ khóa</label>
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
                  placeholder="Bác sĩ, mã lịch..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Trạng thái</label>
                <select
                  value={status}
                  onChange={(event) => updateParams({ status: event.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="">Tất cả trạng thái</option>
                  {APPOINTMENT_STATUS_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Ngày bắt đầu</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => updateParams({ startDate: event.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Ngày kết thúc</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(event) => updateParams({ endDate: event.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              {isInvalidDateRange ? (
                <p className="text-sm text-red-600">
                  Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.
                </p>
              ) : null}

              <div>
                <label className="text-sm font-medium block mb-2">Sắp xếp theo</label>
                <select
                  value={sort}
                  onChange={(event) => updateParams({ sort: event.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {APPOINTMENT_SORT_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Thứ tự</label>
                <select
                  value={order}
                  onChange={(event) => updateParams({ order: event.target.value as SortOrder, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="DESC">Giảm dần (mới nhất)</option>
                  <option value="ASC">Tăng dần (cũ nhất)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Số lượng mỗi trang</label>
                <select
                  value={String(limit)}
                  onChange={(event) => updateParams({ limit: event.target.value, page: 1 })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {appointmentsQuery.isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-44 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : appointmentsQuery.isError ? (
            <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
              <p className="text-red-600">Không thể tải lịch khám. Vui lòng thử lại.</p>
              <button
                type="button"
                onClick={() => void appointmentsQuery.refetch()}
                className="mt-4 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200"
              >
                Thử lại
              </button>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">Không có lịch khám phù hợp</h3>
              <p className="text-sm text-slate-500 mt-2">Bạn có thể đổi bộ lọc hoặc đặt lịch mới.</p>
              <Link to="/doctor" className="inline-flex mt-5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold">
                Tìm bác sĩ và đặt lịch
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {appointments.map((item) => (
                  <AppointmentCard key={item.id} appointment={item} />
                ))}
              </div>

              <DoctorPagination page={page} totalPages={totalPages} onPageChange={(nextPage) => updateParams({ page: nextPage })} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default AppointmentSchedule;

import { useNavigate } from 'react-router-dom';
import { usePendingPaymentAppointments } from '@/hooks/use-pending-payment';

export default function PendingPaymentBanner() {
  const navigate = useNavigate();
  const { data } = usePendingPaymentAppointments();
  const items = data?.items ?? [];

  if (items.length === 0) return null;

  // Chỉ show appointment gần nhất
  const latest = items[0];

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-amber-600">payments</span>
        </div>
        <div>
          <p className="text-sm font-bold text-amber-800">
            Bạn có {items.length} lịch khám chưa thanh toán
          </p>
          <p className="text-xs text-amber-600 mt-0.5">
            Bác sĩ {latest.doctor?.fullName || '---'} · {
              latest.scheduledAt
                ? new Date(latest.scheduledAt).toLocaleDateString('vi-VN')
                : '---'
            }
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => navigate('/appointment-schedule?status=PENDING_PAYMENT')}
            className="text-xs text-amber-700 font-semibold hover:underline"
          >
            Xem tất cả
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate(`/payment?appointmentId=${latest.id}`)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
}

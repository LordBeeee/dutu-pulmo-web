import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePrescriptionDetail } from '@/hooks/use-prescriptions';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { PrescriptionStatus } from '@/types/medical.types';

const STATUS_MAP: Record<PrescriptionStatus, { label: string; color: string; bg: string; icon: string }> = {
  PENDING: { label: 'Chờ xử lý', color: 'text-amber-600', bg: 'bg-amber-100', icon: 'pending' },
  ACTIVE: { label: 'Đang dùng', color: 'text-blue-600', bg: 'bg-blue-100', icon: 'clock_loader_40' },
  COMPLETED: { label: 'Đã hoàn tất', color: 'text-green-600', bg: 'bg-green-100', icon: 'check_circle' },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-100', icon: 'cancel' },
  EXPIRED: { label: 'Hết hạn', color: 'text-slate-600', bg: 'bg-slate-100', icon: 'history' },
};

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon: string }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
        <h2 className="font-bold text-slate-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function InfoRow({ label, value, isLast = false }: { label: string; value?: string | number | null; isLast?: boolean }) {
  if (value === undefined || value === null || value === '') return null;
  
  return (
    <div className={`flex items-center justify-between py-3 ${isLast ? '' : 'border-b border-slate-50'}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default function PrescriptionDetailPage() {
  const { prescriptionId } = useParams();
  const navigate = useNavigate();
  const { data: prescription, isLoading, isError } = usePrescriptionDetail(prescriptionId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
        <div className="space-y-6">
          <div className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !prescription) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="material-symbols-outlined text-red-400 text-6xl mb-4">error</span>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy đơn thuốc</h1>
        <p className="text-slate-500 mb-8">Đơn thuốc không tồn tại hoặc bạn không có quyền xem.</p>
        <button onClick={() => navigate('/prescriptions')} className="px-6 py-2 bg-primary text-white rounded-xl font-semibold">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const status = STATUS_MAP[prescription.status] || STATUS_MAP.PENDING;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-primary">Trang chủ</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/prescriptions" className="hover:text-primary">Đơn thuốc</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="font-medium text-slate-900">{prescription.prescriptionNumber}</span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 flex flex-col md:flex-row justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">pill</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">Chi tiết đơn thuốc</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color} flex items-center gap-1`}>
                <span className="material-symbols-outlined text-sm">{status.icon}</span>
                {status.label}
              </span>
            </div>
            <div className="space-y-1 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 w-32">Mã đơn thuốc:</span>
                <span className="font-semibold text-slate-900">{prescription.prescriptionNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 w-32">Bác sĩ kê đơn:</span>
                <span className="font-semibold text-slate-900">{prescription.doctor?.fullName || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 w-32">Ngày kê đơn:</span>
                <span className="font-semibold text-slate-900">
                  {prescription.createdAt
                    ? format(new Date(prescription.createdAt), 'dd/MM/yyyy', { locale: vi })
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {prescription.pdfUrl && (
            <a
              href={prescription.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
              In đơn thuốc
            </a>
          )}
          {prescription.medicalRecordId && (
            <Link
              to={`/medical-records/${prescription.medicalRecordId}`}
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl font-bold hover:bg-slate-50"
            >
              <span className="material-symbols-outlined">description</span>
              Xem hồ sơ liên quan
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* ── DANH SÁCH THUỐC ── */}
        <Section title={`Danh sách thuốc (${prescription.items?.length || 0})`} icon="medication">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prescription.items?.map((item, idx) => (
              <div key={item.id || idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* Medicine name header */}
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                  <p className="text-sm font-bold text-blue-800">
                    {idx + 1}. {item.medicineName || 'Thuốc'}
                  </p>
                </div>
                <div className="p-4">
                  <InfoRow label="Liều dùng" value={item.dosage} />
                  <InfoRow label="Tần suất" value={item.frequency} />
                  <InfoRow 
                    label="Thời gian" 
                    value={item.duration || '—'} 
                  />
                  <InfoRow 
                    label="Số lượng" 
                    value={item.quantity != null ? `${item.quantity} ${item.unit || ''}`.trim() : '—'} 
                  />
                  {item.instructions && (
                    <InfoRow label="Hướng dẫn" value={item.instructions} isLast />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── GHI CHÚ ── */}
        {prescription.notes && (
          <Section title="Ghi chú" icon="description">
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
              {prescription.notes}
            </p>
          </Section>
        )}

        {/* ── TƯ VẤN (Keep this as high value add) ── */}
        <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Lời khuyên sử dụng thuốc</p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Uống thuốc đúng giờ và đủ liều lượng quy định.</li>
                <li>Theo dõi các phản ứng phụ và báo ngay cho bác sĩ nếu có dấu hiệu bất thường.</li>
              </ul>
            </div>
          </div>
          {prescription.pdfUrl && (
            <a
              href={prescription.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <span className="material-symbols-outlined text-xl">download</span>
              Tải đơn thuốc PDF
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <button
          onClick={() => navigate('/prescriptions')}
          className="flex items-center gap-2 text-slate-500 font-semibold hover:text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Quay lại danh sách đơn thuốc
        </button>
      </div>
    </main>
  );
}

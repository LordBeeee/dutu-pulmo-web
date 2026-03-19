import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { MedicalRecord, MedicalRecordStatus } from '@/types/medical.types';

interface MedicalRecordCardProps {
  record: MedicalRecord;
}

const STATUS_MAP: Record<MedicalRecordStatus, { label: string; color: string; bg: string }> = {
  DRAFT: { label: 'Nháp', color: 'text-slate-600', bg: 'bg-slate-100' },
  IN_PROGRESS: { label: 'Đang xử lý', color: 'text-blue-600', bg: 'bg-blue-100' },
  COMPLETED: { label: 'Hoàn thành', color: 'text-green-600', bg: 'bg-green-100' },
  CANCELLED: { label: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-100' },
};

export default function MedicalRecordCard({ record }: MedicalRecordCardProps) {
  const status = STATUS_MAP[record.status] || STATUS_MAP.DRAFT;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary text-2xl">description</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-bold text-slate-900">{record.recordNumber}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                {status.label}
              </span>
            </div>
            <p className="text-sm text-slate-500 line-clamp-1 mb-2">
              Chẩn đoán: <span className="text-slate-700 font-medium">{record.diagnosis || 'Chưa có chẩn đoán'}</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">person</span>
                Bác sĩ: {record.doctor?.fullName || 'N/A'}
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                Ngày khám: {format(new Date(record.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <Link
            to={`/medical-records/${record.id}`}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Chi tiết
          </Link>
          {record.pdfUrl && (
            <a
              href={record.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="Xem PDF"
            >
              <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

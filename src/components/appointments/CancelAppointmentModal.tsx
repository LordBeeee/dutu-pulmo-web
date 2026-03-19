import { useState } from 'react';
import type { FormEvent } from 'react';

type CancelAppointmentModalProps = {
  open: boolean;
  isPending?: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void> | void;
};

function CancelAppointmentModal({ open, isPending, onClose, onConfirm }: CancelAppointmentModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      setError('Vui lòng nhập lý do hủy lịch.');
      return;
    }

    setError('');
    await onConfirm(trimmedReason);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-900">Hủy lịch khám</h3>
        <p className="text-sm text-slate-500 mt-1">Vui lòng nhập lý do để hoàn tất yêu cầu hủy lịch.</p>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            placeholder="Nhập lý do hủy lịch..."
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={handleClose} disabled={isPending} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-60">
              Hủy
            </button>
            <button type="submit" disabled={isPending} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60">
              {isPending ? 'Đang xử lý...' : 'Xác nhận hủy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelAppointmentModal;

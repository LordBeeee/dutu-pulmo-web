import { useMemo, useState } from 'react';

import { useDoctorAvailableSlots } from '@/hooks/use-doctors';
import type { TimeSlotResponse } from '@/services/doctor';

export type TimeSlot = TimeSlotResponse;

type TimeSlotSectionProps = {
  doctorId: string;
  selectedDate: string | null;
  appointmentType: 'all' | 'online' | 'offline';
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
};

type SessionType = 'morning' | 'afternoon';

const EMPTY_SLOTS: TimeSlot[] = [];

function formatVietnamTime(dateString: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(dateString));
}

function getVietnamHour(dateString: string) {
  const hourString = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(dateString));

  return Number(hourString);
}

function getDisplayFee(slot: TimeSlot) {
  return slot.finalConsultationFee ?? slot.baseConsultationFee ?? 0;
}

function formatCurrency(amount: number, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function slotMatchesAppointmentType(slot: TimeSlot, appointmentType: 'all' | 'online' | 'offline') {
  if (appointmentType === 'all') return true;
  if (!slot.allowedAppointmentTypes || slot.allowedAppointmentTypes.length === 0) return true;

  const normalized = slot.allowedAppointmentTypes.map((item) => item.toUpperCase());
  if (appointmentType === 'online') {
    return normalized.includes('ONLINE') || normalized.includes('VIDEO');
  }

  return normalized.includes('OFFLINE') || normalized.includes('IN_CLINIC');
}

function TimeSlotSection({ doctorId, selectedDate, appointmentType, selectedSlotId, onSelectSlot }: TimeSlotSectionProps) {
  const [activeSession, setActiveSession] = useState<SessionType>('morning');

  const slotsQuery = useDoctorAvailableSlots(doctorId, selectedDate || undefined, appointmentType);
  const slots = (slotsQuery.data ?? EMPTY_SLOTS).filter((slot) =>
    slotMatchesAppointmentType(slot, appointmentType),
  );

  const morningSlots = useMemo(() => slots.filter((slot) => getVietnamHour(slot.startTime) < 12), [slots]);
  const afternoonSlots = useMemo(() => slots.filter((slot) => getVietnamHour(slot.startTime) >= 12), [slots]);
  const morningCount = morningSlots.length;
  const afternoonCount = afternoonSlots.length;

  const displayedSlots = activeSession === 'morning' ? morningSlots : afternoonSlots;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <span className="material-icons text-primary">schedule</span>
        <h4 className="font-bold">Chọn giờ khám</h4>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex mb-6">
        <button
          type="button"
          onClick={() => setActiveSession('morning')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
            activeSession === 'morning' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500'
          }`}
        >
          Buổi sáng ({morningCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveSession('afternoon')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
            activeSession === 'afternoon' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500'
          }`}
        >
          Buổi chiều ({afternoonCount})
        </button>
      </div>

      {!selectedDate && <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 py-10 text-center text-slate-500">Vui lòng chọn ngày khám trước</div>}

      {selectedDate && slotsQuery.isLoading && (
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 py-10 text-center text-slate-500">Đang tải khung giờ khám...</div>
      )}

      {selectedDate && !slotsQuery.isLoading && displayedSlots.length === 0 && (
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 py-10 text-center text-slate-500">
          {activeSession === 'morning' ? 'Không có khung giờ buổi sáng' : 'Không có khung giờ buổi chiều'}
        </div>
      )}

      {selectedDate && !slotsQuery.isLoading && displayedSlots.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedSlots.map((slot) => {
            const isSelected = selectedSlotId === slot.id;
            const remainingSlots = Math.max(slot.capacity - slot.bookedCount, 0);
            const displayFee = getDisplayFee(slot);

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => onSelectSlot(slot)}
                className={`py-4 rounded-xl text-center transition-all border ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-transparent bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`text-sm font-bold block ${isSelected ? 'text-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                  {formatVietnamTime(slot.startTime)} - {formatVietnamTime(slot.endTime)}
                </span>

                <span className="block mt-2 text-xs font-medium text-emerald-600">{formatCurrency(displayFee, slot.currency || 'VND')}</span>

                <span className={`text-[11px] mt-2 inline-block px-2 py-1 rounded-full ${isSelected ? 'bg-primary text-white' : 'bg-blue-50 text-primary'}`}>
                  Còn {remainingSlots} slot
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TimeSlotSection;



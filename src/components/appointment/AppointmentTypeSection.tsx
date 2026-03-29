import type { AppointmentTypeFilter } from '@/services/doctor';

type AppointmentTypeSectionProps = {
  value: AppointmentTypeFilter;
  onChange: (value: AppointmentTypeFilter) => void;
};

function AppointmentTypeSection({ value, onChange }: AppointmentTypeSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <span className="material-icons text-primary">event_note</span>
        <h4 className="font-bold">Chọn loại lịch</h4>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onChange('all')}
          className={`py-2 text-sm rounded-lg border ${
            value === 'all'
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-slate-200 text-slate-600'
          }`}
        >
          Tất cả
        </button>
        <button
          type="button"
          onClick={() => onChange('online')}
          className={`py-2 text-sm rounded-lg border ${
            value === 'online'
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-slate-200 text-slate-600'
          }`}
        >
          Online
        </button>
        <button
          type="button"
          onClick={() => onChange('offline')}
          className={`py-2 text-sm rounded-lg border ${
            value === 'offline'
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-slate-200 text-slate-600'
          }`}
        >
          Tại viện
        </button>
      </div>
    </div>
  );
}

export default AppointmentTypeSection;

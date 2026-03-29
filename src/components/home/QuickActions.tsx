import { Link } from 'react-router-dom';

export type QuickAction = {
  key: string;
  label: string;
  iconName: string;
  color: string;
  bg: string;
  to: string;
};

type QuickActionsProps = {
  actions: QuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
      <div className="grid grid-cols-4 gap-x-3 gap-y-6">
        {actions.map((item) => (
          <div key={item.key} className="flex flex-col items-center">
            <Link
              to={item.to}
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-opacity hover:opacity-90"
              style={{ backgroundColor: item.bg }}
            >
              <span className="material-icons-round text-[26px]" style={{ color: item.color }}>
                {item.iconName}
              </span>
            </Link>
            <span className="text-[10px] font-bold text-gray-800 text-center mt-2 leading-tight whitespace-pre-line">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;

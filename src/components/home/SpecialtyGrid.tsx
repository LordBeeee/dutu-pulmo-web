import { Link } from 'react-router-dom';

import { getSpecialtyConfig } from './SpecialtyConfig';

type SpecialtyGridProps = {
  items: string[];
};

export function SpecialtyGrid({ items }: SpecialtyGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.slice(0, 4).map((specialty) => {
        const { label, icon, color, bg } = getSpecialtyConfig(specialty);

        return (
          <Link
            key={specialty}
            to={`/doctor?specialty=${encodeURIComponent(specialty)}`}
            className="bg-card-light p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer group"
          >
            <span
              className="material-symbols-rounded group-hover:scale-110 transition-transform flex items-center justify-center"
              style={{
                color,
                backgroundColor: bg,
                borderRadius: '0.75rem',
                padding: '0.5rem',
                fontSize: '24px',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {icon}
            </span>

            <span className="text-xs font-semibold text-center line-clamp-2">
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default SpecialtyGrid;

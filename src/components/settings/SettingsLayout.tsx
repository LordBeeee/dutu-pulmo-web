import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingRowProps {
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle?: string;
  description?: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isLast?: boolean;
}

export function SettingRow({
  icon: Icon,
  iconColor = '#0A7CFF',
  iconBg = '#EFF6FF',
  title,
  subtitle,
  description,
  value,
  onPress,
  rightElement,
  isLast = false,
}: SettingRowProps) {
  const content = (
    <div className="flex flex-1 items-center gap-4">
      {Icon && (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={20} color={iconColor} />
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {rightElement ?? (value ? <span className="text-sm text-slate-400">{value}</span> : null)}
    </div>
  );

  const containerClasses = cn(
    "flex w-full items-center text-left px-4 py-4 transition-colors",
    onPress ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" : "",
    !isLast && "border-b border-slate-100 dark:border-slate-800"
  );


  if (onPress) {
    return (
      <button onClick={onPress} className={containerClasses}>
        {content}
      </button>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </h3>
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}

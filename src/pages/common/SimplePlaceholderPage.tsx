import type { ReactNode } from 'react';

type SimplePlaceholderPageProps = {
  title: string;
  description?: string;
  extra?: ReactNode;
};

export default function SimplePlaceholderPage({
  title,
  description = 'Trang đang được phát triển.',
  extra,
}: SimplePlaceholderPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
        {extra ? <div className="mt-4 text-slate-500 text-sm">{extra}</div> : null}
      </div>
    </main>
  );
}

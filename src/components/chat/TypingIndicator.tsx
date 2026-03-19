import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex items-end gap-2 mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 mb-1 shrink-0">
        <Bot size={18} className="text-blue-600" />
      </div>
      <div className="flex items-center justify-center rounded-2xl bg-white border border-slate-100 px-4 h-10 shadow-sm">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

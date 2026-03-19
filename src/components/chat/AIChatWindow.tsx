import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RotateCcw, Sparkles, X } from 'lucide-react';
import { useAIChatStore, type Message } from '@/store/ai-chat.store';
import { aiChatBotService } from '@/services/ai-chatbot.service';
import { TypingEffect } from './TypingEffect';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils';

interface AIChatWindowProps {
  onClose?: () => void;
  isFullPage?: boolean;
}

export const AIChatWindow: React.FC<AIChatWindowProps> = ({ onClose, isFullPage = false }) => {
  const [inputText, setInputText] = useState('');
  const { messages, sessionId, isLoading, addMessage, setSessionId, setLoading, clearHistory } = useAIChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText || isLoading) return;

    if (!text) setInputText('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMsg);

    setLoading(true);
    try {
      const response = await aiChatBotService.sendMessage(messageText, sessionId ?? undefined);
      
      if (response.success) {
        if (response.meta.sessionId) {
          setSessionId(response.meta.sessionId);
        }

        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.data.message,
          timestamp: response.data.timestamp,
          suggestedActions: response.data.suggestedActions,
        };
        addMessage(aiMsg);
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Xin lỗi, có lỗi xảy ra khi kết nối với máy chủ AI. Vui lòng thử lại sau.',
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(
      "flex flex-col bg-slate-50 overflow-hidden",
      isFullPage ? "h-full w-full" : "h-[500px] w-[380px] rounded-2xl shadow-2xl border border-slate-200"
    )}>
      {/* Header */}
      <div className="bg-blue-600 p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Trợ lý AI DuTu Pulmo</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[10px] text-blue-100 uppercase font-medium tracking-wider">Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={clearHistory}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            title="Xóa lịch sử"
          >
            <RotateCcw size={18} />
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-40 text-center px-6">
            <div className="mb-4 p-5 bg-blue-100 rounded-full text-blue-600">
              <Sparkles size={48} />
            </div>
            <h4 className="text-lg font-bold text-slate-700">Chào mừng bạn!</h4>
            <p className="text-sm text-slate-500 mt-2">
              Tôi là Trợ lý AI chuyên về sức khỏe hô hấp. Tôi có thể giúp gì cho bạn hôm nay?
            </p>
          </div>
        )}

        {messages.map((item, index) => {
          const isAi = item.role === 'assistant';
          const isLatestAi = isAi && index === messages.length - 1;
          
          return (
            <div key={item.id} className={cn("flex gap-2 max-w-[85%]", isAi ? "self-start" : "self-end flex-row-reverse")}>
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                isAi ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-600"
              )}>
                {isAi ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className="flex flex-col gap-1">
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                  isAi ? "bg-white border border-slate-100 text-slate-800 shadow-sm" : "bg-blue-600 text-white shadow-md"
                )}>
                  {isLatestAi ? (
                    <TypingEffect text={item.content} />
                  ) : (
                    <span>{item.content}</span>
                  )}
                </div>

                {isAi && item.suggestedActions && item.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action)}
                        className="text-xs px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-xl transition-all",
              !inputText.trim() || isLoading 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
            )}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

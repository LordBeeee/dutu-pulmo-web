import React from 'react';
import { AIChatWindow } from '@/components/chat/AIChatWindow';
import { Sparkles, Shield, Clock } from 'lucide-react';

const AIChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
        
        {/* Left Side: Info & Features */}
        <div className="lg:col-span-4 space-y-6 hidden lg:block">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Sparkles size={24} />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Trợ lý AI</h1>
            </div>
            
            <p className="text-slate-600 leading-relaxed mb-8">
              Chào mừng bạn đến với hệ thống tư vấn sức khỏe hô hấp thông minh. Tôi được huấn luyện để hỗ trợ bạn giải đáp các thắc mắc về y tế.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-green-500"><Shield size={18} /></div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">An toàn & Bảo mật</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Dữ liệu của bạn được mã hóa hoàn toàn.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-blue-500"><Clock size={18} /></div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">Hỗ trợ 24/7</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Sẵn sàng giải đáp mọi lúc, mọi nơi.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-xl shadow-blue-200">
            <h4 className="font-bold mb-2">Lưu ý quan trọng</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Trợ lý AI chỉ cung cấp thông tin tham khảo. Kết quả này không thay thế cho chẩn đoán chuyên môn của bác sĩ. Trong trường hợp khẩn cấp, vui lòng gọi 115 hoặc đến cơ sở y tế gần nhất.
            </p>
          </div>
        </div>

        {/* Right Side: Chat Window */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <AIChatWindow isFullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;

import { useParams, Link, useNavigate } from 'react-router-dom';
import { SAMPLE_NEWS, NEWS_CATEGORIES } from '@/constants/news-data';
import { useMemo } from 'react';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const news = useMemo(() => SAMPLE_NEWS.find((n) => n.id === id), [id]);

  if (!news) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <span className="material-icons-round text-6xl text-slate-200">find_in_page</span>
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy bài viết</h2>
        <p className="text-slate-500 text-lg">Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
        <button
          onClick={() => navigate('/news')}
          className="px-8 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const relatedNews = SAMPLE_NEWS.filter((n) => n.category === news.category && n.id !== news.id).slice(0, 3);
  const categoryLabel = NEWS_CATEGORIES.find(c => c.value === news.category)?.label;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/news')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold py-2"
        >
          <span className="material-icons-round text-lg">arrow_back</span>
          Quay lại
        </button>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="material-icons-round text-xs">chevron_right</span>
          <Link to="/news" className="hover:text-primary transition-colors">Tin tức</Link>
          <span className="material-icons-round text-xs">chevron_right</span>
          <span className="text-slate-700">{categoryLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Article Body */}
        <article className="lg:col-span-8 space-y-10">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">
                {categoryLabel}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                <span className="material-icons-round text-sm">schedule</span>
                Đăng ngày {news.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15]">
              {news.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
              {news.description}
            </p>
          </header>

          <div className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl">
            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
          </div>

          {/* Render content as HTML - In real app use a sanitizer or specialized component */}
          <div 
            className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Social Share Placeholder */}
          <div className="pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-500">Chia sẻ bài viết:</span>
              <div className="flex gap-2">
                {['facebook', 'twitter', 'link'].map(icon => (
                  <button key={icon} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-rounded text-lg">{icon === 'link' ? 'link' : 'share'}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link to="/news" className="text-primary font-bold flex items-center gap-1 hover:underline">
              Xem thêm các tin khác <span className="material-icons-round text-sm">arrow_forward</span>
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b-2 border-primary/10 pb-4">
                Bài viết cùng danh mục
              </h3>
              <div className="space-y-8">
                {relatedNews.map(n => (
                  <Link key={n.id} to={`/news/${n.id}`} className="group block space-y-3">
                    <div className="aspect-video rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                      <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">
                      {n.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{n.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Promo Card */}
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-[32px] p-8 text-white space-y-6 shadow-xl shadow-primary/20">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="material-symbols-rounded text-3xl">medical_services</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold italic">Bạn cần tư vấn sức khỏe?</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                Đội ngũ bác sĩ chuyên khoa tại Dutu Pulmo luôn sẵn sàng lắng nghe và hỗ trợ bạn.
              </p>
            </div>
            <Link 
              to="/doctor" 
              className="block w-full text-center py-4 bg-white text-primary font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Đặt lịch khám ngay
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

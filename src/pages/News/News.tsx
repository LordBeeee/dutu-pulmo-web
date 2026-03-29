import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_NEWS, NEWS_CATEGORIES, type NewsCategory } from '@/constants/news-data';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = useMemo(() => {
    return SAMPLE_NEWS.filter((item) => {
      const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const featuredNews = SAMPLE_NEWS.find(n => n.badge === 'Nổi bật') || SAMPLE_NEWS[0];
  const otherNews = filteredNews.filter(n => n.id !== (activeCategory === 'ALL' && !searchTerm ? featuredNews.id : null));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Categories */}
      <section className="space-y-8 mb-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Tin tức & Kiến thức y khoa</h1>
          <p className="text-slate-500">Cập nhật những thông tin mới nhất về sức khỏe và hệ thống Dutu Pulmo</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              activeCategory === 'ALL' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/40'
            }`}
          >
            Tất cả
          </button>
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                activeCategory === cat.value 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Search Bar Mobile/Tablet */}
          <div className="relative lg:hidden">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Featured Article (only when no filter) */}
          {activeCategory === 'ALL' && !searchTerm && (
            <Link to={`/news/${featuredNews.id}`} className="group block space-y-6">
              <div className="aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl relative">
                <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">{featuredNews.badge}</span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {NEWS_CATEGORIES.find(c => c.value === featuredNews.category)?.label}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  {featuredNews.title}
                </h2>
                <p className="text-slate-500 line-clamp-2 text-lg">
                  {featuredNews.description}
                </p>
                <div className="flex items-center text-slate-400 text-sm gap-4">
                  <span className="flex items-center gap-1">
                    <span className="material-icons-round text-baseCondensed">calendar_today</span>
                    {featuredNews.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-primary font-bold">Xem chi tiết</span>
                </div>
              </div>
            </Link>
          )}

          {/* Articles List */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {activeCategory !== 'ALL' || searchTerm ? 'Kết quả tìm kiếm' : 'Bài viết mới nhất'}
              <span className="text-slate-400 text-sm font-normal">({filteredNews.length})</span>
            </h3>

            {otherNews.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <span className="material-icons-round text-4xl text-slate-300 mb-2">find_in_page</span>
                <p className="text-slate-500">Không tìm thấy bài viết nào.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherNews.map((news) => (
                  <Link key={news.id} to={`/news/${news.id}`} className="group bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-5 relative">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold rounded-md uppercase tracking-wider">
                        {NEWS_CATEGORIES.find(c => c.value === news.category)?.label}
                      </span>
                    </div>
                    <div className="flex-1 space-y-3 px-2">
                      <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {news.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-50 px-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-icons-round text-sm">schedule</span>
                        {news.date}
                      </span>
                      <span className="text-primary font-bold group-hover:underline">Chi tiết</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Desktop Search */}
          <div className="hidden lg:block relative">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Trending/Side List */}
          <div className="bg-slate-50 rounded-[32px] p-8 space-y-6">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <span className="material-icons-round text-orange-500">trending_up</span>
              Xu hướng
            </h3>
            <div className="space-y-6">
              {SAMPLE_NEWS.slice(0, 3).map((news, idx) => (
                <Link key={news.id} to={`/news/${news.id}`} className="group flex gap-4 items-start">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-primary/20 transition-colors">0{idx + 1}</span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-sm text-slate-800 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{news.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Sidebar */}
          <div className="space-y-6 px-4">
            <h3 className="font-bold text-slate-900 text-lg">Khám phá danh mục</h3>
            <div className="flex flex-col gap-2">
              {NEWS_CATEGORIES.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    activeCategory === cat.value ? 'bg-primary/5 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm">{cat.label}</span>
                  <span className="material-icons-round text-sm">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

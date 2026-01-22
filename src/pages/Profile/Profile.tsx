import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-72 space-y-6">

          {/* Profile card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8oXlt405qK_Rck7wdacjVQ0hZH0-1aZEL-AsNUGU5SAXPV0GGONnK7oU3CR2-Wd9RRmPHTMXttSXAWt9CP1evJQZoTrTRi52UEZewHgXBYI9dZ6MEp3ZIFf8MlBU5YM_i7KvvYZ7JsgVa3DNtkSxWo756Hs2xHkDKpcKJValSiRVz8L-nEKAhgHzH-oDWBJvvVoZJjP0rTng_opf8LaQVsd-Rv6vCelDcJZhQiyKFgl4d_UOXZc6nvQmla4jBVpVXcLzttRqpbw"
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <span className="material-icons-outlined text-xs">edit</span>
                </button>
              </div>

              <h3 className="font-bold text-lg">Nguyễn Văn A</h3>
              <p className="text-sm text-slate-500">+84 923 739 836</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-2">
            <ul className="space-y-1">
              <li>
                <a className="flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium" href="#">
                  <span className="material-icons-outlined text-[20px]">assignment_ind</span>
                  <span className="text-sm">Hồ sơ y tế</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">favorite_border</span>
                  <span className="text-sm">Danh sách quan tâm</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">gavel</span>
                  <span className="text-sm">Điều khoản & Quy định</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">groups</span>
                  <span className="text-sm">Tham gia cộng đồng</span>
                </a>
              </li>

              <div className="py-2 px-4">
                <hr className="border-slate-100 dark:border-slate-800" />
              </div>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">share</span>
                  <span className="text-sm">Chia sẻ ứng dụng</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">headset_mic</span>
                  <span className="text-sm">Liên hệ & hỗ trợ</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">settings</span>
                  <span className="text-sm">Cài đặt</span>
                </a>
              </li>

              <div className="pt-2 px-4">
                <hr className="border-slate-100 dark:border-slate-800" />
              </div>

              <li className="pt-4">
                {/* <a className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium" href="#">
                  <span className="material-icons-outlined text-[20px]">logout</span>
                  <span className="text-sm">Đăng xuất</span>
                </a> */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                >
                  <span className="material-icons-outlined text-[20px]">logout</span>
                  <span className="text-sm">Đăng xuất</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">

          {/* Profile form */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">Thông tin cá nhân</h2>
              <p className="text-slate-500 text-sm">
                Quản lý thông tin hồ sơ của bạn để bảo mật tài khoản
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Họ và tên</label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Văn A"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Giới tính</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Ngày sinh</label>
                  <input type="date" defaultValue="1995-06-15" className="w-full px-4 py-2.5 border rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <input type="email" defaultValue="du.nguyen@example.com" className="w-full px-4 py-2.5 border rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Số điện thoại</label>
                  <input readOnly value="+84 923 739 836" className="w-full px-4 py-2.5 bg-slate-100 border rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Nghề nghiệp</label>
                  <input placeholder="Nhập nghề nghiệp" className="w-full px-4 py-2.5 border rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Địa chỉ</label>
                <textarea rows={3} className="w-full px-4 py-2.5 border rounded-xl">
                  123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                </textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" className="px-6 py-2 rounded-xl">
                  Hủy
                </button>
                <button type="submit" className="px-8 py-2 bg-primary text-white rounded-xl">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </section>

        </div>
      </div>
      {showLogoutModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <h3 className="text-lg font-bold mb-2">Xác nhận đăng xuất</h3>
          <p className="text-slate-500 text-sm mb-6">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded-xl border"
            >
              Hủy
            </button>

            <button
              onClick={() => {
                setShowLogoutModal(false);

                // Xử lý đăng xuất
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-xl"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    )}

    </main>
  );
}

export default Profile;

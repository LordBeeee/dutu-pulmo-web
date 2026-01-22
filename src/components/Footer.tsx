function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

        {/* Logo + description */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-100 h-24 rounded-lg flex items-center justify-center">
                <img src="/src/assets/Logo/chu_ngang_ko.png" alt=""/>
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Nền tảng chăm sóc sức khỏe phổi hàng đầu, kết nối bệnh nhân với đội ngũ
            chuyên gia và công nghệ AI hiện đại.
          </p>
        </div>

        {/* Services */}
        <div>
          <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
            Dịch vụ
          </h5>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary transition-colors" href="#">Đặt khám bác sĩ</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Tư vấn video</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Phân tích kết quả AI</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Chăm sóc tại nhà</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
            Hỗ trợ
          </h5>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li><a className="hover:text-primary transition-colors" href="#">Câu hỏi thường gặp</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Chính sách bảo mật</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Điều khoản sử dụng</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Liên hệ hỗ trợ</a></li>
          </ul>
        </div>

        {/* App download */}
        <div>
          <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
            Tải ứng dụng
          </h5>

          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-700 hover:bg-black transition-colors"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbLBv6mC0kUD8wq7fzafIfTgRz8quvxnZmnOqKa-0BKAQ8vcV7j_xeVV7Sad0ljHCfhdeMZ1KQPMoCV1OCQ7qoeuhzdOBRwzF-42ORyC-RVLbgfflrL2d4d3KHuDhms10SB5O8ca1HNp9KEy9aTmXjuYmW1G6iI7bUjE08dfEQPbbz-v5JA3aMS8RW7A5SGyOHPXFTz1Zvom-Bn8MHDmurZcRSoX1NAOwQoL925mCqSYV785j_WoMXr4Q8fYiDHPTDIZMklkaSWQ"
                alt="Apple logo"
                className="w-5"
              />
              <div className="text-left">
                <p className="text-[10px] opacity-70 leading-none">
                  Download on the
                </p>
                <p className="text-sm font-bold leading-tight">
                  App Store
                </p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-xl border border-slate-700 hover:bg-black transition-colors"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXvs8uXmQ2mpzvUWRz56v_GyEKJQQ_J4cIBGVMNbX-uVjzwKuT4tsPfD1jl5bPAfXOA8jvag2pjmya7x28tNykCBgcU5CZrzAWBLeHXYKS9cBnBTU5cqjOqSr9-kvzJNMWqVnjkz7Yh5lqgHdYiVA97y8lFBRR_9S6xQNtnzBXTCQNnoTry75udnDRSSOsLTBA0bZZX9UYcmDYC5QPSV-LZLUEgb-pqQL8rXlWqKLQGixo0N59y311dbV71ohZRCiPkG_rw2C7Dw"
                alt="Google Play logo"
                className="w-5"
              />
              <div className="text-left">
                <p className="text-[10px] opacity-70 leading-none">
                  GET IT ON
                </p>
                <p className="text-sm font-bold leading-tight">
                  Google Play
                </p>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-400">
          © 2023 Dutu Pulmo. All rights reserved. Designed for Health.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

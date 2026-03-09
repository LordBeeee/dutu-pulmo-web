export default function PaymentSecurityNotice() {
  return (
    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
      <span className="material-icons text-primary text-xl mt-0.5">
        lock
      </span>

      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        Dữ liệu thanh toán của bạn được mã hóa theo tiêu chuẩn bảo mật quốc tế
        (PCI DSS), đảm bảo thông tin cá nhân và tài chính luôn được bảo vệ.
      </p>
    </div>
  );
}
export default function PaymentMethodList() {
  return (
    <div className="space-y-4">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest px-1">
            Chọn phương thức thanh toán
          </h3>

          <div className="space-y-3">
            <label className="group relative flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary cursor-pointer transition-all shadow-sm">
              <input
                defaultChecked
                className="sr-only peer"
                name="payment_method"
                type="radio"
              />
              <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mr-4">
                <span className="material-icons text-purple-600">
                  qr_code_2
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Thanh toán qua PayOS
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Chuyển khoản ngân hàng qua mã VietQR
                </p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
            </label>

            <label className="group relative flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary cursor-pointer transition-all shadow-sm">
              <input
                className="sr-only peer"
                name="payment_method"
                type="radio"
              />
              <div className="w-12 h-12 rounded-lg bg-pink-50 dark:bg-pink-900/20 flex items-center justify-center mr-4">
                <span className="material-icons text-pink-600">
                  account_balance_wallet
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Ví điện tử MoMo
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Miễn phí thanh toán
                </p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
            </label>

            <label className="group relative flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary cursor-pointer transition-all shadow-sm">
              <input
                className="sr-only peer"
                name="payment_method"
                type="radio"
              />
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-4">
                <span className="material-icons text-blue-600">
                  account_balance_wallet
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Ví ZaloPay
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Miễn phí thanh toán
                </p>
                
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
            </label>

            <label className="group relative flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary cursor-pointer transition-all shadow-sm">
              <input
                className="sr-only peer"
                name="payment_method"
                type="radio"
              />
              <div className="w-12 h-12 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-4">
                <span className="material-icons text-green-600">
                  credit_card
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Thẻ ATM nội địa
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Internet Banking
                </p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
            </label>

            <label className="group relative flex items-center p-4 bg-card-light dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary cursor-pointer transition-all shadow-sm">
              <input
                className="sr-only peer"
                name="payment_method"
                type="radio"
              />
              <div className="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mr-4">
                <span className="material-icons text-orange-600">payments</span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Thẻ quốc tế
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visa, Mastercard, JCB
                </p>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
              </div>
            </label>
        </div>
    </div>
  );
}
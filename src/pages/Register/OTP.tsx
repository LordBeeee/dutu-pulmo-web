function OTP() {
    return(
        <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 transition-colors duration-300">

        {/* Card */}
        <div className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl p-10 relative overflow-hidden">

            {/* Back button */}
            <button className="absolute top-8 left-8 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[28px]">
                    chevron_left
                </span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-8">
                    Xác thực OTP
                </h1>

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-3xl">
                        lock
                    </span>
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                    Mã xác thực đã được gửi đến số điện thoại
                </p>
                <p className="text-slate-800 dark:text-white font-bold text-lg">
                    0923xxxx36
                </p>
            </div>

            {/* OTP inputs */}
            <div className="flex gap-4 justify-center mb-8">
            {[0, 1, 2, 3].map((i) => (
                <input
                key={i}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-center text-2xl font-bold bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white outline-none focus:border-primary transition-all"
                />
            ))}
            </div>

            {/* Countdown */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-primary dark:text-blue-400 rounded-full text-xs font-semibold mb-3">
                    <span className="material-symbols-outlined text-sm">
                    schedule
                    </span>
                    Gửi lại mã sau 59s
                </div>

                <div>
                    <a
                    href="#"
                    className="text-slate-400 dark:text-slate-500 text-sm hover:text-primary transition-colors"
                    >
                    Không nhận được mã?
                    </a>
                </div>
            </div>

            {/* Submit */}
            <button
            className="w-full bg-primary hover:bg-blue-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
            Xác nhận
                <span className="material-symbols-outlined text-xl">
                    arrow_right_alt
                </span>
            </button>

        </div>
        </div>
    )
}

export default OTP
function AdditionalInfoSection() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
                <span className="material-icons text-primary">info</span>
                <h4 className="font-bold">Thông tin bổ sung (không bắt buộc)</h4>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-8 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
                    Bạn có thể cung cấp thêm các thông tin như lý do khám, triệu chứng, đơn thuốc sử dụng gần đây.
                </p>

                <button className="text-primary font-bold text-sm flex items-center justify-center mx-auto hover:underline">
                    Tôi muốn gửi thêm thông tin
                    <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}

export default AdditionalInfoSection;
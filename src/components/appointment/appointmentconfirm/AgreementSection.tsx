// import React from "react";

// export default function AgreementSection() {
//   return (
//     <div className="pt-4 text-center">
//       <div className="flex items-start justify-center gap-3 mb-6 text-left max-w-xl mx-auto">
//         <input
//           id="terms"
//           type="checkbox"
//           defaultChecked
//           className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
//         />

//         <label
//           htmlFor="terms"
//           className="text-xs text-slate-500 leading-relaxed"
//         >
//           Bằng việc đăng ký / thanh toán bạn đã đọc và đồng ý với các{" "}
//           <a className="text-blue-600 font-medium" href="#">
//             điều khoản
//           </a>{" "}
//           và{" "}
//           <a className="text-blue-600 font-medium" href="#">
//             điều kiện sử dụng
//           </a>{" "}
//           của chúng tôi.
//         </label>
//       </div>

//       <button className="w-full max-w-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
//         Xác nhận đặt lịch
//       </button>

//       <p className="text-xs text-slate-400 mt-4">
//         Lịch khám của bạn sẽ được xác nhận ngay sau khi hoàn tất bước này.
//       </p>
//     </div>
//   );
// }
import React from "react";

interface AgreementSectionProps {
  onConfirm: () => void;
  loading?: boolean;
}

export default function AgreementSection({
  onConfirm,
  loading = false,
}: AgreementSectionProps) {
  return (
    <div className="pt-4 text-center">
      <div className="flex items-start justify-center gap-3 mb-6 text-left max-w-xl mx-auto">
        <input
          id="terms"
          type="checkbox"
          defaultChecked
          className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
        />

        <label
          htmlFor="terms"
          className="text-xs text-slate-500 leading-relaxed"
        >
          Bằng việc đăng ký / thanh toán bạn đã đọc và đồng ý với các{" "}
          <a className="text-blue-600 font-medium" href="#">
            điều khoản
          </a>{" "}
          và{" "}
          <a className="text-blue-600 font-medium" href="#">
            điều kiện sử dụng
          </a>{" "}
          của chúng tôi.
        </label>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={loading}
        className={`w-full max-w-lg text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all active:scale-95 ${
          loading
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
        }`}
      >
        {loading ? "Đang xác nhận..." : "Xác nhận đặt lịch"}
      </button>

      <p className="text-xs text-slate-400 mt-4">
        Lịch khám của bạn sẽ được xác nhận ngay sau khi hoàn tất bước này.
      </p>
    </div>
  );
}
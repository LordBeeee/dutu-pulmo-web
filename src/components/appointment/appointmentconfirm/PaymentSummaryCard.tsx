// import React from "react";

// export default function PaymentSummaryCard() {
//   return (
//     <section>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
//           Chi tiết thanh toán
//         </h2>

//         <button className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-1">
//           Đổi thẻ
//         </button>
//       </div>

//       <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100 space-y-4">
//         <div className="flex justify-between text-sm">
//           <span className="text-slate-500 font-medium">Phí khám</span>
//           <span className="font-bold">0đ</span>
//         </div>

//         <div className="flex justify-between text-sm">
//           <span className="text-slate-500 font-medium">Phí tiện ích</span>
//           <span className="font-bold text-green-600">Miễn phí</span>
//         </div>

//         <div className="pt-4 border-t flex justify-between items-center">
//           <span className="font-bold">Tổng thanh toán</span>
//           <span className="text-xl font-bold text-blue-600">0đ</span>
//         </div>
//       </div>
//     </section>
//   );
// }
import type { TimeSlot } from "../TimeSlotSection";

interface PaymentSummaryCardProps {
  selectedSlot?: TimeSlot | null;
  utilityFee?: number;
}

function getDisplayFee(slot?: TimeSlot | null) {
  if (!slot) return 0;
  return Number(slot.finalConsultationFee ?? slot.baseConsultationFee ?? 0);
}

function formatCurrency(amount: number, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PaymentSummaryCard({
  selectedSlot,
  utilityFee = 0,
}: PaymentSummaryCardProps) {
  const consultationFee = getDisplayFee(selectedSlot);
  const currency = selectedSlot?.currency || "VND";
  const total = consultationFee + Number(utilityFee);
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Chi tiết thanh toán
        </h2>

        <button
          type="button"
          className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-1"
        >
          Đổi thẻ
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium">Phí khám</span>
          <span className="font-bold">
            {formatCurrency(consultationFee, currency)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium">Phí tiện ích</span>
          <span className={`font-bold ${utilityFee > 0 ? "text-slate-900" : "text-green-600"}`}>
            {utilityFee > 0 ? formatCurrency(utilityFee, currency) : "Miễn phí"}
          </span>
        </div>

        {selectedSlot?.discountPercent ? (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Ưu đãi</span>
            <span className="font-bold text-emerald-600">
              -{selectedSlot.discountPercent}%
            </span>
          </div>
        ) : null}

        <div className="pt-4 border-t flex justify-between items-center">
          <span className="font-bold">Tổng thanh toán</span>
          <span className="text-xl font-bold text-blue-600">
            {formatCurrency(total, currency)}
          </span>
        </div>
      </div>
    </section>
  );
}
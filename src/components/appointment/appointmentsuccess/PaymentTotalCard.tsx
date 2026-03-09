// interface Props {
//   amount: number;
// }

// function formatCurrency(amount: number) {
//   return new Intl.NumberFormat("vi-VN", {
//     style: "currency",
//     currency: "VND",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export default function PaymentTotalCard({ amount }: Props) {
//   return (
//     <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center mb-8">
//       <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
//         Tổng thanh toán
//       </p>

//       <h2 className="text-4xl font-extrabold text-primary">
//         {formatCurrency(amount)}
//       </h2>
//     </div>
//   );
// }
import type { TimeSlot } from "../TimeSlotSection";

interface Props {
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

export default function PaymentTotalCard({
  selectedSlot,
  utilityFee = 0,
}: Props) {
  const consultationFee = getDisplayFee(selectedSlot);
  const currency = selectedSlot?.currency || "VND";
  const total = consultationFee + Number(utilityFee);

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center mb-8">
      <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
        Tổng thanh toán
      </p>

      <h2 className="text-4xl font-extrabold text-primary">
        {formatCurrency(total, currency)}
      </h2>
    </div>
  );
}
// import { useLocation } from "react-router-dom";
// import type { Doctor } from "../../types/doctor";
// import type { UserProfile } from "../../types/user";
// import type { TimeSlot } from "../../components/appointment/TimeSlotSection";
// import PaymentTotalCard from "../../components/appointment/appointmentsuccess/PaymentTotalCard";
// import PaymentMethodList from "../../components/appointment/appointmentsuccess/PaymentMethodList";
// import PaymentSecurityNotice from "../../components/appointment/appointmentsuccess/PaymentSecurityNotice";
// import { useState } from "react";

// interface AppointmentResponse {
//   id: string;
// }
// interface AppointmentSuccessState {
//   appointment?: AppointmentResponse;
//   doctor: Doctor;
//   user: UserProfile;
//   selectedDate: string;
//   selectedSlot: TimeSlot;
// }

// function AppointmentSuccess() {
//   const location = useLocation();
//   const state = location.state as AppointmentSuccessState | null;
//   const [loading, setLoading] = useState(false);
//   if (!state) {
//     return (
//       <main className="flex-grow py-8 px-4">
//         <div className="max-w-2xl mx-auto text-center">
//           <p className="text-red-500">Không có dữ liệu thanh toán.</p>
//         </div>
//       </main>
//     );
//   }

//   // const { selectedSlot } = state;
//   const { selectedSlot, appointment } = state;
//   const handlePayNow = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         alert("Bạn chưa đăng nhập.");
//         return;
//       }

//       const appointmentId = appointment?.id;
//       if (!appointmentId) {
//         alert("Không tìm thấy appointmentId.");
//         return;
//       }

//       const res = await fetch("https://dutu-pulmo-be.onrender.com/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           appointmentId,
//         }),
//       });

//       const data = await res.json();
//       console.log("payment create response:", data);

//       if (!res.ok) {
//         const errorMessage =
//           typeof data?.message === "string"
//             ? data.message
//             : data?.error || "Tạo link thanh toán thất bại";

//         throw new Error(errorMessage);
//       }

//       const checkoutUrl = data?.checkoutUrl || data?.data?.checkoutUrl;

//       if (!checkoutUrl) {
//         throw new Error("Không nhận được checkoutUrl từ hệ thống.");
//       }

//       window.location.href = checkoutUrl;
//     } catch (error) {
//       console.error("Lỗi tạo payment:", error);
//       alert(
//         error instanceof Error
//           ? error.message
//           : "Có lỗi xảy ra khi tạo thanh toán"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="flex-grow py-8 px-4">
//       <div className="max-w-2xl mx-auto">

//         <PaymentTotalCard selectedSlot={selectedSlot} />

//         <PaymentMethodList />

//         <PaymentSecurityNotice />

//         {/* <button className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30">
//           Thanh toán ngay
//           <span className="material-icons">arrow_forward</span>
//         </button> */}
//         <button
//           type="button"
//           onClick={handlePayNow}
//           disabled={loading}
//           className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           {loading ? "Đang tạo link thanh toán..." : "Thanh toán ngay"}
//           {!loading && <span className="material-icons">arrow_forward</span>}
//         </button>
//       </div>
//     </main>
//   );
// }

// export default AppointmentSuccess;
import { useLocation } from "react-router-dom";
import type { Doctor } from "../../types/doctor";
import type { UserProfile } from "../../types/user";
import type { TimeSlot } from "../../components/appointment/TimeSlotSection";
import PaymentTotalCard from "../../components/appointment/appointmentsuccess/PaymentTotalCard";
import PaymentMethodList from "../../components/appointment/appointmentsuccess/PaymentMethodList";
import PaymentSecurityNotice from "../../components/appointment/appointmentsuccess/PaymentSecurityNotice";
import { useState } from "react";

interface AppointmentResponse {
  id: string;
}

interface AppointmentSuccessState {
  appointment?: AppointmentResponse;
  doctor: Doctor;
  user: UserProfile;
  selectedDate: string;
  selectedSlot: TimeSlot;
}

function AppointmentSuccess() {
  const location = useLocation();
  const state = location.state as AppointmentSuccessState | null;
  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <main className="flex-grow py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-500">Không có dữ liệu thanh toán.</p>
        </div>
      </main>
    );
  }

  const { selectedSlot, appointment } = state;

  const handlePayNow = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Bạn chưa đăng nhập.");
        return;
      }

      const appointmentId = appointment?.id;
      if (!appointmentId) {
        alert("Không tìm thấy appointmentId.");
        return;
      }

      const res = await fetch("https://dutu-pulmo-be.onrender.com/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appointmentId,
        }),
      });

      const data = await res.json();
      console.log("payment create response:", data);

      if (!res.ok) {
        const errorMessage =
          typeof data?.message === "string"
            ? data.message
            : data?.error || "Tạo link thanh toán thất bại";

        throw new Error(errorMessage);
      }

      const checkoutUrl = data?.checkoutUrl || data?.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Không nhận được checkoutUrl từ hệ thống.");
      }

      localStorage.setItem("payment_success_context", JSON.stringify(state));
      localStorage.setItem("currentAppointmentId", appointmentId);

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Lỗi tạo payment:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi tạo thanh toán"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <PaymentTotalCard selectedSlot={selectedSlot} />

        <PaymentMethodList />

        <PaymentSecurityNotice />

        <button
          type="button"
          onClick={handlePayNow}
          disabled={loading}
          className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Đang tạo link thanh toán..." : "Thanh toán ngay"}
          {!loading && <span className="material-icons">arrow_forward</span>}
        </button>
      </div>
    </main>
  );
}

export default AppointmentSuccess;
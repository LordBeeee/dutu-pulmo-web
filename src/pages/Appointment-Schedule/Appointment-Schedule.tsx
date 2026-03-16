// function AppointmentSchedule() {
//     return (        
//     <div>
//         <section className="bg-primary pt-8 pb-16">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
//                 <div>
//                     <h1 className="text-3xl font-bold text-white mb-2">
//                     Lịch khám
//                     </h1>
//                     <p className="text-blue-100">
//                     Quản lý và theo dõi các cuộc hẹn khám bệnh của bạn
//                     </p>
//                 </div>

//                 <div className="relative w-full md:max-w-md">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <span className="material-icons-round text-blue-300">
//                         search
//                     </span>
//                     </div>

//                     <input
//                     type="text"
//                     placeholder="Search by appointment ID, patient name..."
//                     className="block w-full pl-10 pr-12 py-3 bg-blue-600/30 border border-blue-400/30 text-white placeholder-blue-200 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all outline-none"
//                     />

//                     <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                     <span className="material-icons-round text-blue-100 hover:text-white transition-colors">
//                         tune
//                     </span>
//                     </button>
//                 </div>

//                 </div>
//             </div>
//         </section>
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 flex-grow">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

//                 {/* Card 1 */}
//                 <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
//                 <div className="flex justify-between items-start mb-4">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
//                     Đã đặt lịch
//                     </span>

//                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
//                     <span className="material-icons-round">more_vert</span>
//                     </button>
//                 </div>

//                 <div className="flex items-center gap-4 mb-6">
//                     <img
//                     alt="Doctor Profile"
//                     className="w-16 h-16 rounded-full object-cover ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800"
//                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfRF9sNwlaFm-hQLtk7MxCzqD19EJ997IoqQ32op16PhJ_h-UumhBzQEOkc_zEWPDG2OUx6skpB5qjLYwEQELUfQr6dprWhiZUnFM0XjeeGEjwdnnzkqIvCTdGBfIrXdUCJ3xGJt_XburN2OU83cRrOJosKCvH0DESm_UD5hEzEmYp_rjO9FFtXQnANbjL8m2t5osjyNlMJEAxBWdvMyft_IuxpLX7shBLtRZkTNGEugsMdpnIaC42fLC_4rg3QVCP7E6rI7SIouu"
//                     />

//                     <div>
//                     <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase">
//                         NGUYỄN VĂN A
//                     </h3>
//                     <p className="text-sm text-slate-500 dark:text-slate-400">
//                         Chuyên khoa Hô hấp
//                     </p>
//                     </div>
//                 </div>

//                 <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                     <div className="flex justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Bệnh nhân</span>
//                     <span className="font-semibold">Du</span>
//                     </div>

//                     <div className="flex justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Thời gian</span>
//                     <span className="font-semibold">09:30, 24/10/2023</span>
//                     </div>
//                 </div>

//                 <button className="w-full mt-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary transition-all">
//                     Xem chi tiết
//                 </button>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
//                     <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></span>
//                     Đã hủy
//                     </span>

//                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
//                     <span className="material-icons-round">more_vert</span>
//                     </button>
//                 </div>

//                 <div className="flex items-center gap-4 mb-6">
//                     <img
//                     alt="Doctor Profile"
//                     className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 ring-offset-2 dark:ring-offset-slate-800"
//                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSy68BwfYWsiI_vlgDPxnLewwEFBQYY85TxSbdq7L3pqiK9X1aFXBMX9os45mzWDmvmzEYKTWkGxB6gcfQr-JYCcDN1GKTO2As9ETVbTyMiwN_bor4Hju65pE_fod9p3_EwA5LvTakhcBvrgHOJKAwnyGycval3uTakAoO0UIl2hjK4XcKTDH2W5Gg9Pm9lkwm-2oQ4IxxdnMX_iqm6_9IA6hFGYpI_MUQfLYz6sg5jST8OAvockeQAXf-XZdDDDdGDNXkgEVBLvZM"
//                     />

//                     <div>
//                     <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase">
//                         NGUYỄN VĂN A
//                     </h3>
//                     <p className="text-sm text-slate-500 dark:text-slate-400">
//                         Chuyên khoa Hô hấp
//                     </p>
//                     </div>
//                 </div>

//                 <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                     <div className="flex justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Bệnh nhân</span>
//                     <span className="font-semibold">Duc</span>
//                     </div>

//                     <div className="flex justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Thời gian</span>
//                     <span className="font-semibold">14:00, 22/10/2023</span>
//                     </div>
//                 </div>

//                 <button className="w-full mt-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary transition-all">
//                     Xem chi tiết
//                 </button>
//                 </div>

//                 <button className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:border-primary hover:text-primary transition-all group min-h-[300px]">
//                 <span className="material-icons-round text-4xl mb-2 group-hover:scale-110 transition-transform">
//                     add_circle_outline
//                 </span>
//                 <span className="font-medium">Đặt lịch khám mới</span>
//                 </button>

//             </div>
//         </main>
//     </div>
//     );
// }

// export default AppointmentSchedule;
// import { useEffect, useState } from "react";

// interface Appointment {
//   id: string;
//   scheduledAt: string;
//   status: string;
//   doctor: {
//     fullName: string;
//     avatarUrl: string;
//     specialty: string;
//   };
//   patient: {
//     id: string;
//   };
// }

// function AppointmentSchedule() {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAppointments = async () => {
//     try {
//       const res = await fetch("https://dutu-pulmo-be.onrender.com/appointments/my/patient?page=1&limit=10");
//       const data = await res.json();
//       setAppointments(data.items);
//     } catch (error) {
//       console.error("Fetch appointment error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleString("vi-VN");
//   };

//   const getStatusColor = (status: string) => {
//     if (status === "CONFIRMED") return "bg-emerald-100 text-emerald-700";
//     if (status === "CANCELLED") return "bg-orange-100 text-orange-700";
//     return "bg-blue-100 text-blue-700";
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <section className="bg-primary pt-8 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Lịch khám</h1>
//             <p className="text-blue-100">
//               Quản lý và theo dõi các cuộc hẹn khám bệnh của bạn
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* LIST */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 flex-grow">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

//           {loading && <p>Đang tải lịch khám...</p>}

//           {!loading &&
//             appointments.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow"
//               >
//                 {/* STATUS */}
//                 <div className="flex justify-between mb-4">
//                   <span
//                     className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
//                       item.status
//                     )}`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>

//                 {/* DOCTOR */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <img
//                     src={item.doctor?.avatarUrl}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />

//                   <div>
//                     <h3 className="font-bold uppercase">
//                       {item.doctor?.fullName}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {item.doctor?.specialty}
//                     </p>
//                   </div>
//                 </div>

//                 {/* INFO */}
//                 <div className="space-y-3 border-t pt-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Bệnh nhân</span>
//                     <span className="font-semibold">{item.patient?.id}</span>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Thời gian</span>
//                     <span className="font-semibold">
//                       {formatDate(item.scheduledAt)}
//                     </span>
//                   </div>
//                 </div>

//                 <button className="w-full mt-6 py-2 bg-gray-100 rounded-xl hover:bg-primary hover:text-white transition">
//                   Xem chi tiết
//                 </button>
//               </div>
//             ))}

//           {/* ADD NEW */}
//           <button className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-primary min-h-[300px]">
//             <span className="material-icons-round text-4xl mb-2">
//               add_circle_outline
//             </span>
//             <span>Đặt lịch khám mới</span>
//           </button>

//         </div>
//       </main>
//     </div>
//   );
// }

// export default AppointmentSchedule;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Appointment {
  id: string;
  scheduledAt: string;
  status: string;
  appointmentType?: string;
  appointmentNumber?: string;
  doctor?: {
    id?: string;
    userId?: string;
    fullName?: string;
    avatarUrl?: string;
    specialty?: string;
  };
  patient?: {
    id?: string;
    userId?: string;
    user?: {
      fullName?: string;
    };
  };
}

function AppointmentSchedule() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const navigate = useNavigate();
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Không tìm thấy access token");
      }

      const res = await fetch(
        "https://dutu-pulmo-be.onrender.com/appointments/my/patient?page=1&limit=10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();
      console.log("appointments response:", response);

      if (!res.ok) {
        throw new Error(
          response?.message || `HTTP ${res.status} - ${res.statusText}`
        );
      }

      setAppointments(
        Array.isArray(response?.data?.items) ? response.data.items : []
      );
    } catch (err) {
      console.error("Fetch appointment error:", err);
      setAppointments([]);
      setError("Không thể tải lịch khám. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (date?: string) => {
    if (!date) return "---";
    return new Date(date).toLocaleString("vi-VN");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "PENDING_PAYMENT":
        return "bg-yellow-100 text-yellow-700";
      case "PENDING":
        return "bg-blue-100 text-blue-700";
      case "CHECKED_IN":
        return "bg-purple-100 text-purple-700";
      case "IN_PROGRESS":
        return "bg-indigo-100 text-indigo-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "RESCHEDULED":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "Đã xác nhận";
      case "CANCELLED":
        return "Đã hủy";
      case "PENDING_PAYMENT":
        return "Chờ thanh toán";
      case "PENDING":
        return "Chờ xác nhận";
      case "CHECKED_IN":
        return "Đã check-in";
      case "IN_PROGRESS":
        return "Đang khám";
      case "COMPLETED":
        return "Hoàn thành";
      case "RESCHEDULED":
        return "Đã dời lịch";
      default:
        return status || "---";
    }
  };

  const getAppointmentTypeLabel = (type?: string) => {
    switch (type) {
      case "VIDEO":
        return "Khám video";
      case "OFFLINE":
      case "IN_CLINIC":
        return "Khám tại phòng khám";
      case "ONLINE":
        return "Khám online";
      default:
        return type || "---";
    }
  };

  return (
    <div>
      <section className="bg-primary pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Lịch khám</h1>
            <p className="text-blue-100">
              Quản lý và theo dõi các cuộc hẹn khám bệnh của bạn
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 flex-grow">
        {loading && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
            <p className="text-gray-600">Đang tải lịch khám...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border mb-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Chưa có lịch khám nào</h3>
            <p className="text-gray-500">
              Bạn chưa có cuộc hẹn nào trong hệ thống. Hãy đặt lịch khám mới để bắt đầu.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {!loading &&
            appointments.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4 gap-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusLabel(item.status)}
                  </span>

                  {item.appointmentNumber && (
                    <span className="text-xs text-gray-400">
                      #{item.appointmentNumber}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={item.doctor?.avatarUrl || "https://via.placeholder.com/150"}
                    alt={item.doctor?.fullName || "Doctor"}
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                  <div>
                    <h3 className="font-bold uppercase text-gray-800">
                      {item.doctor?.fullName || "Chưa có tên bác sĩ"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.doctor?.specialty || "Chưa có chuyên khoa"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-gray-500">Bệnh nhân</span>
                    <span className="font-semibold text-right">
                      {item.patient?.user?.fullName || item.patient?.id || "---"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-gray-500">Thời gian</span>
                    <span className="font-semibold text-right">
                      {formatDate(item.scheduledAt)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm gap-3">
                    <span className="text-gray-500">Hình thức</span>
                    <span className="font-semibold text-right">
                      {getAppointmentTypeLabel(item.appointmentType)}
                    </span>
                  </div>
                </div>

                {/* <button className="w-full mt-6 py-2 bg-gray-100 rounded-xl hover:bg-primary hover:text-white transition">
                  Xem chi tiết
                </button> */}
                <button
                onClick={() => navigate(`/appointment-schedule/${item.id}`)}
                className="w-full mt-6 py-2 bg-gray-100 rounded-xl hover:bg-primary hover:text-white transition"
                >
                Xem chi tiết
                </button>
              </div>
            ))}
            <a href="/doctor-appointment" className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition min-h-[300px]">
                <span className="material-icons-round text-4xl mb-2">
                add_circle_outline
                </span>
                <span>Đặt lịch khám mới</span>
            </a>
            {/* <button className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition min-h-[300px]">
                <span className="material-icons-round text-4xl mb-2">
                add_circle_outline
                </span>
                <span>Đặt lịch khám mới</span>
            </button> */}
        </div>
      </main>
    </div>
  );
}

export default AppointmentSchedule;
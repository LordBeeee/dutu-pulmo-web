import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface AppointmentDetail {
  id: string;
  appointmentNumber?: string;
  scheduledAt?: string;
  status: string;
  appointmentType?: string;
  subType?: string;
  sourceType?: string;
  durationMinutes?: number;
  chiefComplaint?: string;
  patientNotes?: string;
  doctorNotes?: string;
  symptoms?: string[];
  feeAmount?: string;
  paidAmount?: string;
  refunded?: boolean;
  timezone?: string;
  createdAt?: string;
  updatedAt?: string;
  meetingUrl?: string;
  queueNumber?: number;
  cancellationReason?: string;
  cancelledAt?: string;

  doctor?: {
    id?: string;
    fullName?: string;
    avatarUrl?: string;
    specialty?: string;
    title?: string;
    phone?: string;
    email?: string;
  };

  patient?: {
    id?: string;
    profileCode?: string;
    user?: {
      fullName?: string;
      phone?: string;
      email?: string;
      gender?: string;
      dateOfBirth?: string;
    };
  };
}

const AppointmentScheduleDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [appointment, setAppointment] = useState<AppointmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  const fetchAppointmentDetail = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Không tìm thấy access token");
      }

      const res = await fetch(
        `https://dutu-pulmo-be.onrender.com/appointments/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();
      console.log("appointment detail response:", response);

      if (!res.ok) {
        throw new Error(
          response?.message || `HTTP ${res.status} - ${res.statusText}`
        );
      }

      setAppointment(response?.data ?? null);
    } catch (err) {
      console.error("Fetch appointment detail error:", err);
      setError("Không thể tải chi tiết lịch khám.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAppointmentDetail();
    }
  }, [id]);

  const formatDateTime = (date?: string) => {
    if (!date) return "---";
    return new Date(date).toLocaleString("vi-VN");
  };

  const formatDateOnly = (date?: string) => {
    if (!date) return "---";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const formatTimeOnly = (date?: string) => {
    if (!date) return "---";
    return new Date(date).toLocaleTimeString("vi-VN");
  };

  const formatMoney = (value?: string) => {
    if (!value) return "---";
    return Number(value).toLocaleString("vi-VN") + " VNĐ";
  };

  const getStatusLabel = (status?: string) => {
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

  const getStatusClass = (status?: string) => {
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

  const getAppointmentTypeLabel = (type?: string) => {
    switch (type) {
      case "VIDEO":
        return "Khám video";
      case "IN_CLINIC":
        return "Khám tại phòng khám";
      case "ONLINE":
        return "Khám online";
      default:
        return type || "---";
    }
  };

  const getPaymentStatus = () => {
    const fee = Number(appointment?.feeAmount || 0);
    const paid = Number(appointment?.paidAmount || 0);

    if (paid > 0 && paid >= fee) return "Đã thanh toán";
    if (paid > 0 && paid < fee) return "Thanh toán một phần";
    return "Chưa thanh toán";
  };

  const getPaymentClass = () => {
    const fee = Number(appointment?.feeAmount || 0);
    const paid = Number(appointment?.paidAmount || 0);

    if (paid > 0 && paid >= fee) return "bg-green-100 text-green-700";
    if (paid > 0 && paid < fee) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const canCancelAppointment = () => {
    if (!appointment) return false;
    return ["PENDING", "PENDING_PAYMENT", "CONFIRMED"].includes(
      appointment.status
    );
  };

  const getDoctorInitial = () => {
    const name = appointment?.doctor?.fullName?.trim();
    if (!name) return "B";
    return name.charAt(0).toUpperCase();
  };

  const handleCancelAppointment = async () => {
  if (!appointment) return;

  const confirmed = window.confirm("Bạn có chắc muốn hủy lịch khám này không?");
  if (!confirmed) return;

  const reason = window.prompt("Nhập lý do hủy lịch khám:", "") || "Người dùng hủy lịch khám";

  try {
    setCancelLoading(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Không tìm thấy access token");
    }

    const res = await fetch(
      `https://dutu-pulmo-be.onrender.com/appointments/${appointment.id}/cancel`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      }
    );

    const response = await res.json().catch(() => null);
    console.log("cancel appointment response:", response);

    if (!res.ok) {
      throw new Error(
        response?.message || `HTTP ${res.status} - ${res.statusText}`
      );
    }

    alert("Hủy lịch khám thành công.");
    fetchAppointmentDetail();
  } catch (err) {
    console.error("Cancel appointment error:", err);
    alert("Không thể hủy lịch khám. Vui lòng thử lại.");
  } finally {
    setCancelLoading(false);
  }
};

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <p className="text-gray-600">Đang tải chi tiết lịch khám...</p>
        </div>
      </main>
    );
  }

  if (error || !appointment) {
    return (
      <main className="max-w-4xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <p className="text-red-500 mb-4">
            {error || "Không tìm thấy lịch khám"}
          </p>
          <button
            onClick={() => navigate("/appointment-schedule")}
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold"
          >
            Quay lại danh sách
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 mt-7 bg-gray-50 border-b border-gray-100 flex justify-between items-center gap-4 flex-wrap ">
          <span
            className={`${getStatusClass(
              appointment.status
            )} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}
          >
            {getStatusLabel(appointment.status)}
          </span>
          <span className="text-sm text-gray-500">
            Mã: #{appointment.appointmentNumber || appointment.id}
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex items-center gap-6" data-purpose="doctor-profile">
            {appointment.doctor?.avatarUrl ? (
              <img
                src={appointment.doctor.avatarUrl}
                alt={appointment.doctor.fullName || "Doctor"}
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                {getDoctorInitial()}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-900 uppercase">
                {appointment.doctor?.fullName || "Chưa có tên bác sĩ"}
              </h2>
              <p className="text-blue-600 font-medium">
                {appointment.doctor?.specialty || "Chưa có chuyên khoa"}
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Bệnh nhân</span>
                <span className="font-semibold text-gray-900 text-right">
                  {appointment.patient?.user?.fullName || "---"}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Thời gian khám</span>
                <span className="font-semibold text-gray-900 text-right">
                  {formatTimeOnly(appointment.scheduledAt)}
                  <br />
                  {formatDateOnly(appointment.scheduledAt)}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Hình thức</span>
                <span className="font-semibold text-gray-900 text-right">
                  {getAppointmentTypeLabel(appointment.appointmentType)}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Thời lượng</span>
                <span className="font-semibold text-gray-900 text-right">
                  {appointment.durationMinutes
                    ? `${appointment.durationMinutes} phút`
                    : "---"}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Mã hồ sơ</span>
                <span className="font-semibold text-gray-900 text-right">
                  {appointment.patient?.profileCode || "---"}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Lý do/Triệu chứng</span>
                <span className="font-semibold text-gray-900 text-right">
                  {appointment.chiefComplaint ||
                    (appointment.symptoms && appointment.symptoms.length > 0
                      ? appointment.symptoms.join(", ")
                      : "---")}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Phí khám</span>
                <span className="font-bold text-blue-600 text-lg text-right">
                  {formatMoney(appointment.feeAmount)}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Thanh toán</span>
                <span
                  className={`${getPaymentClass()} px-2 py-0.5 rounded text-xs font-bold uppercase`}
                >
                  {getPaymentStatus()}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Đã thanh toán</span>
                <span className="font-semibold text-gray-900 text-right">
                  {formatMoney(appointment.paidAmount)}
                </span>
              </div>

              <div className="flex justify-between items-start border-b border-gray-50 pb-2 gap-4">
                <span className="text-gray-500 text-sm">Nguồn tạo</span>
                <span className="font-semibold text-gray-900 text-right">
                  {appointment.sourceType || "---"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                Thông tin bác sĩ
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Họ tên: </span>
                  <span className="font-semibold">
                    {appointment.doctor?.fullName || "---"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Chuyên khoa: </span>
                  <span className="font-semibold">
                    {appointment.doctor?.specialty || "---"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Email: </span>
                  <span className="font-semibold">
                    {appointment.doctor?.email || "---"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Điện thoại: </span>
                  <span className="font-semibold">
                    {appointment.doctor?.phone || "---"}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                Thông tin bệnh nhân
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Họ tên: </span>
                  <span className="font-semibold">
                    {appointment.patient?.user?.fullName || "---"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Email: </span>
                  <span className="font-semibold">
                    {appointment.patient?.user?.email || "---"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Điện thoại: </span>
                  <span className="font-semibold">
                    {appointment.patient?.user?.phone || "---"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Ngày sinh: </span>
                  <span className="font-semibold">
                    {formatDateOnly(appointment.patient?.user?.dateOfBirth)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {(appointment.patientNotes ||
            appointment.doctorNotes ||
            appointment.cancellationReason) && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                Ghi chú
              </h3>

              <div className="space-y-2 text-sm">
                {appointment.patientNotes && (
                  <p className="text-blue-700">
                    <span className="font-semibold">Bệnh nhân: </span>
                    {appointment.patientNotes}
                  </p>
                )}

                {appointment.doctorNotes && (
                  <p className="text-blue-700">
                    <span className="font-semibold">Bác sĩ: </span>
                    {appointment.doctorNotes}
                  </p>
                )}

                {appointment.cancellationReason && (
                  <p className="text-blue-700">
                    <span className="font-semibold">Lý do hủy: </span>
                    {appointment.cancellationReason}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-bold text-blue-800 mb-1 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Lưu ý quan trọng
            </h3>

            <p className="text-sm text-blue-700">
              Vui lòng có mặt tại phòng khám ít nhất 15 phút trước giờ hẹn. Mang
              theo thẻ BHYT và các hồ sơ bệnh án cũ nếu có.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate("/appointment-schedule")}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Quay lại
            </button>

            {canCancelAppointment() && (
              <button
                onClick={handleCancelAppointment}
                disabled={cancelLoading}
                className="flex-1 bg-red-50 text-red-600 border border-red-200 py-3 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                {cancelLoading ? "Đang hủy..." : "Hủy lịch khám"}
              </button>
            )}

            {appointment.meetingUrl && appointment.appointmentType === "VIDEO" && (
              <a
                href={appointment.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                Vào phòng khám
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentScheduleDetail;
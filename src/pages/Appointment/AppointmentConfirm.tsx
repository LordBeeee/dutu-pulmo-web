import { useLocation, useNavigate } from "react-router-dom";
import type { Doctor } from "../../types/doctor";
import type { UserProfile } from "../../types/user";
import AppointmentBreadcrumb from "../../components/appointment/AppointmentBreadcrumb";
import AppointmentSteps from "../../components/appointment/AppointmentSteps";
import AppointmentInfoCard from "../../components/appointment/appointmentconfirm/AppointmentInfoCard";
import PatientInfoCard from "../../components/appointment/appointmentconfirm/PatientInfoCard";
import AgreementSection from "../../components/appointment/appointmentconfirm/AgreementSection";
import PaymentSummaryCard from "../../components/appointment/appointmentconfirm/PaymentSummaryCard";
import type { TimeSlot } from "../../components/appointment/TimeSlotSection";
import { useState } from "react";

interface AppointmentConfirmState {
  doctor: Doctor;
  user: UserProfile;
  selectedDate: string;
  selectedSlotId: string;
  selectedSlot: TimeSlot;
}
export default function AppointmentConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const state = location.state as AppointmentConfirmState | null;
  
  if (!state) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
        <p className="text-red-500 mb-4">Không có dữ liệu đặt lịch.</p>
        <button
          onClick={() => navigate("/appointment")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Quay lại
        </button>
      </main>
    );
  }

  const { doctor, user, selectedDate, selectedSlot, selectedSlotId } = state;
  // const handleConfirmAppointment = async () => {
  //   try {
  //     setLoading(true);

  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       alert("Bạn chưa đăng nhập.");
  //       return;
  //     }

  //     // Ghi log để xem đúng dữ liệu trước khi gửi
  //     const payload = {
  //       timeSlotId: selectedSlotId,
  //       patientId: user.patientId,
  //       hospitalId: doctor.primaryHospital?.id, // hoặc hospital.id nếu bạn có
  //       subType: "SCHEDULED",
  //       sourceType: "EXTERNAL",
  //       chiefComplaint: "Khám bệnh",
  //       symptoms: [],
  //       patientNotes: "",
  //     };

  //     console.log("Payload tạo lịch:", payload);

  //     const res = await fetch("https://dutu-pulmo-be.onrender.com/appointments", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       console.error("Create appointment error:", data);
  //       throw new Error(data?.message || "Tạo lịch hẹn thất bại");
  //     }

  //     alert("Đặt lịch thành công!");

  //     // nếu backend trả về appointment mới tạo
  //     // có thể chuyển sang trang thanh toán / trang thành công
  //     navigate("/appointment-success", {
  //       state: {
  //         appointment: data.data,
  //         doctor,
  //         user,
  //         selectedDate,
  //         selectedSlot,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Lỗi tạo lịch:", error);
  //     alert(error instanceof Error ? error.message : "Có lỗi xảy ra khi tạo lịch");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleConfirmAppointment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Bạn chưa đăng nhập.");
        return;
      }

      if (!doctor.primaryHospital?.id) {
        alert("Không tìm thấy bệnh viện của bác sĩ.");
        return;
      }

      // 1. Lấy patient hiện tại từ token user
      const patientRes = await fetch("https://dutu-pulmo-be.onrender.com/patients/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const patientData = await patientRes.json();

      if (!patientRes.ok) {
        const patientError =
          typeof patientData?.message === "string"
            ? patientData.message
            : patientData?.message?.message ||
              patientData?.error ||
              "Không lấy được thông tin bệnh nhân";

        throw new Error(patientError);
      }

      const patientId = patientData?.data?.id || patientData?.id;

      if (!patientId) {
        throw new Error("Không tìm thấy patientId");
      }

      // 2. Tạo payload đúng
      const payload = {
        timeSlotId: selectedSlotId,
        patientId: patientId,
        hospitalId: doctor.primaryHospital.id,
        subType: "SCHEDULED",
        sourceType: "EXTERNAL",
        chiefComplaint: "Khám bệnh",
        symptoms: [],
        patientNotes: "",
      };

      console.log("Patient me:", patientData);
      console.log("Payload tạo lịch:", payload);

      // 3. Gọi API tạo lịch
      const res = await fetch("https://dutu-pulmo-be.onrender.com/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Create appointment error:", data);

        const errorMessage =
          typeof data?.message === "string"
            ? data.message
            : data?.message?.message || data?.error || "Tạo lịch hẹn thất bại";

        throw new Error(errorMessage);
      }

      alert("Đặt lịch thành công!");

      navigate("/appointment-success", {
        state: {
          appointment: data.data,
          doctor,
          user,
          selectedDate,
          selectedSlot,
        },
      });
    } catch (error) {
      console.error("Lỗi tạo lịch:", error);
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra khi tạo lịch");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
      <AppointmentBreadcrumb />
      <h1 className="text-2xl font-bold mb-8">Đặt lịch khám</h1>
      <AppointmentSteps currentStep={2} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AppointmentInfoCard
            doctor={doctor}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
          <PatientInfoCard user={user} />

          {/* <AgreementSection /> */}
          <AgreementSection
            onConfirm={handleConfirmAppointment}
            loading={loading}
          />
        </div>

        <div className="space-y-6">
          <PaymentSummaryCard selectedSlot={selectedSlot}/>
        </div>
      </div>
    </main>
  );
}
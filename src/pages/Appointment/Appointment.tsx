import { useEffect, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import type { Doctor } from "../../types/doctor";
import type { UserProfile } from "../../types/user";
import AppointmentBreadcrumb from "../../components/appointment/AppointmentBreadcrumb";
import AppointmentSteps from "../../components/appointment/AppointmentSteps";
import DoctorCard from "../../components/appointment/DoctorCard";
import PatientProfileCard from "../../components/appointment/PatientProfileCard";
import CalendarSection from "../../components/appointment/CalendarSection";
import TimeSlotSection, { type TimeSlot } from "../../components/appointment/TimeSlotSection";
import AdditionalInfoSection from "../../components/appointment/AdditionalInfoSection";
import ContinueButton from "../../components/appointment/ContinueButton";


function Appointment() {
    const location = useLocation();
    const navigate = useNavigate();
    const doctorId = location.state?.doctorId;

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    // const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    // const [patientNotes, setPatientNotes] = useState("");
    useEffect(() => {
        setSelectedSlotId(null);
        setSelectedSlot(null);
    }, [selectedDate]);
    useEffect(() => {
        if (!doctorId) return;

        fetch(`https://dutu-pulmo-be.onrender.com/public/doctors/${doctorId}`)
            .then((res) => res.json())
            .then((data) => {
                setDoctor(data.data);
            })
            .catch((error) => {
                console.error("Lỗi lấy thông tin bác sĩ:", error);
            });
    }, [doctorId]); 
    useEffect(() => {
        const token = localStorage.getItem("accessToken"); // sửa lại nếu bạn lưu tên khác

        if (!token) {
            console.error("Không tìm thấy token");
            return;
        }

        fetch("https://dutu-pulmo-be.onrender.com/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Không lấy được thông tin user");
                }
                return res.json();
            })
            .then((data) => {
                // docs của bạn đang cho thấy response có thể là object trực tiếp
                setUser(data.data   );
            })
            .catch((error) => {
                console.error("Lỗi lấy thông tin user:", error);
            });
    }, []);

    const handleContinue = () => {
        // !selectedSlot
        // if (!doctor || !user || !selectedDate || !selectedSlotId) {
        if (!doctor || !user || !selectedDate || !selectedSlotId || !selectedSlot) {
            alert("Vui lòng chọn đầy đủ ngày và giờ khám");
            return;
        }

        navigate("/appointment-confirm", {
            state: {
                doctor,
                user,
                selectedDate,
                selectedSlotId,
                selectedSlot,
                // patientNotes,
            },
        });
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
            <AppointmentBreadcrumb />
            <h1 className="text-2xl font-bold mb-8">Đặt lịch khám</h1>

            <AppointmentSteps currentStep={1}/>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-4 space-y-6">
                    <DoctorCard doctor={doctor} />
                    <PatientProfileCard user={user}/>

                    <button className="w-full flex items-center justify-center space-x-2 text-primary font-medium py-3 border border-dashed border-primary/40 rounded-xl hover:bg-primary/5 transition-colors">
                        <span>Chọn hoặc tạo hồ sơ khác</span>
                        <span className="material-icons text-sm">arrow_forward</span>
                    </button>
                </aside>

                <div className="lg:col-span-8 space-y-6">
                    {doctorId && (
                        <CalendarSection
                            doctorId={doctorId}
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                        />
                    )}
                    {/* <CalendarSection /> */}
                    {doctorId && (
                        <TimeSlotSection
                            doctorId={doctorId}
                            selectedDate={selectedDate}
                            selectedSlotId={selectedSlotId}
                            // onSelectSlot={setSelectedSlotId}
                            onSelectSlot={(slot) => {
                                setSelectedSlotId(slot.id);
                                setSelectedSlot(slot);
                            }}
                        />
                    )}
                    {/* <TimeSlotSection /> */}
                    <AdditionalInfoSection />
                    <ContinueButton
                        onClick={handleContinue}
                        disabled={!selectedDate || !selectedSlotId}
                    />
                    {/* <ContinueButton /> */}
                </div>
            </div>
        </main>
    );
}

export default Appointment;
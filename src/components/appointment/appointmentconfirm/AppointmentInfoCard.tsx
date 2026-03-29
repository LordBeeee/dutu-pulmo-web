import type { Doctor } from "../../../types/doctor";
import type { TimeSlot } from "../TimeSlotSection";


interface AppointmentInfoCardProps {
  doctor: Doctor;
  selectedDate: string;
  selectedSlot: TimeSlot;
  appointmentType: 'all' | 'online' | 'offline';
}

export default function AppointmentInfoCard({
  doctor,
  selectedDate,
  selectedSlot,
  appointmentType,
}: AppointmentInfoCardProps) {
  const isOnline = appointmentType === 'online';

  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
        Thông tin đăng ký
      </h2>

      <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex items-start gap-4 flex-1">
            <img
              alt={doctor.fullName || "Bác sĩ"}
              className="w-20 h-20 rounded-xl object-cover"
              src={doctor.avatarUrl || "https://via.placeholder.com/150"}
            />

            <div>
              <p className="text-xs text-slate-400 mb-1">
                {doctor.title || "Bác sĩ"}
              </p>
              <h3 className="font-bold text-blue-600 text-lg">
                {doctor.fullName || "Chưa cập nhật"}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {doctor.specialty || "Chưa cập nhật"}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    isOnline
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}
                >
                  {isOnline ? "Khám Online" : "Khám tại phòng khám"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-12 pt-4 sm:pt-0 sm:border-l sm:pl-8">
            <div>
              <p className="text-xs text-slate-400 mb-1">Giờ khám</p>
              <p className="font-bold">
                {formatVietnamTime(selectedSlot.startTime)} -{" "}
                {formatVietnamTime(selectedSlot.endTime)}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Ngày khám</p>
              <p className="font-bold">{selectedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatVietnamTime(dateString: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(dateString));
}
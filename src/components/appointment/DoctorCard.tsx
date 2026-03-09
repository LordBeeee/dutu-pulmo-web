import type { Doctor } from "../../types/doctor";

interface DoctorCardProps {
    doctor: Doctor | null;
}

function DoctorCard({ doctor }: DoctorCardProps) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            {doctor && (
                <div className="flex space-x-4">
                    <div className="relative">
                        <img
                            src={doctor.avatarUrl ?? "https://via.placeholder.com/150"}
                            alt={doctor.fullName}
                            className="w-16 h-16 rounded-xl object-cover"
                        />
                    </div>

                    <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {doctor.title ?? "Bác sĩ"}
                        </p>

                        <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase">
                            {doctor.fullName}
                        </h3>

                        <p className="text-xs text-primary font-medium">
                            Chuyên khoa: {doctor.specialty}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DoctorCard;
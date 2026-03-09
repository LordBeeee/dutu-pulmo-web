import type { UserProfile } from "../../types/user";

interface PatientProfileCardProps {
    user: UserProfile | null;
}

function PatientProfileCard({ user }: PatientProfileCardProps) {
    const formatGender = (gender?: string) => {
        if (gender === "MALE") return "Nam";
        if (gender === "FEMALE") return "Nữ";
        return "";
    };

    const formatDate = (date?: string) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("vi-VN");
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
                <span className="material-icons text-primary">person</span>
                <h4 className="font-bold">Hồ sơ bệnh nhân</h4>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-400 shrink-0">Họ và tên</span>
                    <span className="font-semibold text-right break-words">
                        {user?.fullName || ""}
                    </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-400 shrink-0">Giới tính</span>
                    <span className="font-semibold text-right">
                        {formatGender(user?.gender)}
                    </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-400 shrink-0">Ngày sinh</span>
                    <span className="font-semibold text-right">
                        {formatDate(user?.dateOfBirth)}
                    </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-400 shrink-0">Điện thoại</span>
                    <span className="font-semibold text-right">
                        {user?.phone || ""}
                    </span>
                </div>
            </div>

            <div className="mt-8 flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button className="text-primary text-xs font-semibold flex items-center">
                    Xem chi tiết
                </button>
                <button className="text-primary text-xs font-semibold flex items-center">
                    Sửa hồ sơ
                </button>
            </div>
        </div>
    );
}

export default PatientProfileCard;
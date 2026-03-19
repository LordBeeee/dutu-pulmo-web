import { useState } from 'react';

import type { UserProfile } from '@/types/user';

interface PatientProfileCardProps {
  user: UserProfile | null;
}

function PatientProfileCard({ user }: PatientProfileCardProps) {
  const [expanded, setExpanded] = useState(false);
  const formatGender = (gender?: string) => {
    if (gender === 'MALE') return 'Nam';
    if (gender === 'FEMALE') return 'Nữ';
    return 'Khác';
  };

  const formatDate = (date?: string) => {
    if (!date) return '---';
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN');
  };

  const detailRows = [
    { label: 'Email', value: user?.email || '---' },
    { label: 'CCCD', value: user?.CCCD || '---' },
    { label: 'Nghề nghiệp', value: user?.occupation || '---' },
    { label: 'Quốc tịch', value: user?.nationality || '---' },
    { label: 'Dân tộc', value: user?.ethnicity || '---' },
    { label: 'Địa chỉ', value: user?.address || '---' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <span className="material-icons text-primary">person</span>
        <h4 className="font-bold">Hồ sơ bệnh nhân</h4>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-slate-400 shrink-0">Họ và tên</span>
          <span className="font-semibold text-right break-words">{user?.fullName || '---'}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-slate-400 shrink-0">Giới tính</span>
          <span className="font-semibold text-right">{formatGender(user?.gender)}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-slate-400 shrink-0">Ngày sinh</span>
          <span className="font-semibold text-right">{formatDate(user?.dateOfBirth)}</span>
        </div>

        <div className="flex justify-between gap-4 text-sm">
          <span className="text-slate-400 shrink-0">Điện thoại</span>
          <span className="font-semibold text-right">{user?.phone || '---'}</span>
        </div>
      </div>

      {expanded ? (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {detailRows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 text-sm">
              <span className="text-slate-400 shrink-0">{row.label}</span>
              <span className="font-semibold text-right break-words">{row.value}</span>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-5 text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
      >
        {expanded ? 'Thu gọn' : 'Xem thêm'}
        <span className="material-icons text-sm">{expanded ? 'expand_less' : 'expand_more'}</span>
      </button>
    </div>
  );
}

export default PatientProfileCard;

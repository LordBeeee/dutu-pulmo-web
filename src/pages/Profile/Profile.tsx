import { useEffect, useMemo, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { toast } from 'sonner';

import {
  useCountries,
  useEthnicities,
  useMyPatient,
  useProfile,
  useProvinces,
  useUpdateMyPatient,
  useUpdateMyUser,
  useWards,
} from '@/hooks/use-profile';
import { profileService } from '@/services/profile.service';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';


type Option = {
  value: string;
  label: string;
};

type FormData = {
  fullName: string;
  gender: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  occupation: string;
  CCCD: string;
  nationality: string;
  ethnicity: string;
  province: string;
  ward: string;
  address: string;
  // Patient fields
  bloodType: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  insuranceProvider: string;
  insuranceNumber: string;
  insuranceExpiry: string;
};

const EMPTY_FORM: FormData = {
  fullName: '',
  gender: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  occupation: '',
  CCCD: '',
  nationality: '',
  ethnicity: '',
  province: '',
  ward: '',
  address: '',
  bloodType: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  insuranceProvider: '',
  insuranceNumber: '',
  insuranceExpiry: '',
};

function Profile() {
  const user = useAuthStore((state) => state.user);

  const profileQuery = useProfile();
  const myPatientQuery = useMyPatient();
  const countriesQuery = useCountries();
  const ethnicitiesQuery = useEthnicities();
  const provincesQuery = useProvinces();
  const updateUserMutation = useUpdateMyUser();
  const updatePatientMutation = useUpdateMyPatient();

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [occupationOption, setOccupationOption] = useState<Option | null>(null);

  const wardsQuery = useWards(formData.province || undefined);


  useEffect(() => {
    if (!profileQuery.data) return;

    const me = profileQuery.data;
    const patient = myPatientQuery.data;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      fullName: me.fullName ?? '',
      gender: me.gender ?? '',
      email: me.email ?? '',
      phone: me.phone ?? '',
      dateOfBirth: me.dateOfBirth ? me.dateOfBirth.split('T')[0] : '',
      occupation: me.occupation ?? '',
      CCCD: me.CCCD ?? '',
      nationality: me.nationality ?? '',
      ethnicity: me.ethnicity ?? '',
      province: me.provinceCode ?? '',
      ward: me.wardCode ?? '',
      address: me.address ?? '',
      bloodType: patient?.bloodType ?? '',
      emergencyContactName: patient?.emergencyContactName ?? '',
      emergencyContactPhone: patient?.emergencyContactPhone ?? '',
      emergencyContactRelationship: patient?.emergencyContactRelationship ?? '',
      insuranceProvider: patient?.insuranceProvider ?? '',
      insuranceNumber: patient?.insuranceNumber ?? '',
      insuranceExpiry: patient?.insuranceExpiry ? patient.insuranceExpiry.split('T')[0] : '',
    });
  }, [profileQuery.data, myPatientQuery.data]);

  useEffect(() => {
    const occupationCode = formData.occupation;
    if (!occupationCode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOccupationOption(null);
      return;
    }

    void profileService
      .getOccupationByCode(occupationCode)
      .then((occupation) => {
        setOccupationOption({
          value: occupation.code,
          label: occupation.name,
        });
      })
      .catch(() => {
        setOccupationOption({
          value: occupationCode,
          label: `Mã nghề: ${occupationCode}`,
        });
      });
  }, [formData.occupation]);

  const countries = countriesQuery.data ?? [];
  const ethnicities = ethnicitiesQuery.data ?? [];
  const provinces = provincesQuery.data ?? [];
  const wards = wardsQuery.data ?? [];

  const loading = updateUserMutation.isPending || updatePatientMutation.isPending;

  const loadOccupations = async (inputValue: string) => {
    const keyword = inputValue.trim();
    const items = await profileService.searchOccupations(keyword || undefined);

    return items.map((item) => ({
      value: item.code,
      label: item.name,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'province') {
      setFormData((prev) => ({
        ...prev,
        province: value,
        ward: '',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const payload = useMemo(
    () => ({
      fullName: formData.fullName,
      phone: formData.phone,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth || null,
      CCCD: formData.CCCD || null,
      nationality: formData.nationality || null,
      ethnicity: formData.ethnicity || null,
      occupation: formData.occupation || null,
      provinceCode: formData.province || null,
      wardCode: formData.ward || null,
      province: provinces.find((p) => String(p.code) === formData.province)?.name || null,
      ward: wards.find((w) => String(w.code) === formData.ward)?.name || null,
      address: formData.address || null,
    }),
    [formData, provinces, wards],
  );

  const patientPayload = useMemo(
    () => ({
      bloodType: formData.bloodType || null,
      emergencyContactName: formData.emergencyContactName || null,
      emergencyContactPhone: formData.emergencyContactPhone || null,
      emergencyContactRelationship: formData.emergencyContactRelationship || null,
      insuranceProvider: formData.insuranceProvider || null,
      insuranceNumber: formData.insuranceNumber || null,
      insuranceExpiry: formData.insuranceExpiry || null,
    }),
    [formData],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = user?.id || profileQuery.data?.id;
    console.log(payload);
    if (!userId) {
      toast.error('Không tìm thấy user id');
      return;
    }
    if (!formData.province) {
      toast.error('Vui lòng chọn tỉnh / thành phố');
      return;
    }
    
    if (!formData.ward) {
      toast.error('Vui lòng chọn phường / xã');
      return;
    }
    if (formData.dateOfBirth) {
      const selectedDate = new Date(formData.dateOfBirth);
      const today = new Date();

      if (selectedDate > today) {
        toast.error('Ngày sinh không được lớn hơn ngày hiện tại');
        return;
      }
    }
    try {
      const updatePromises: Promise<any>[] = [
        updateUserMutation.mutateAsync({ userId, payload }),
      ];

      if (myPatientQuery.data?.id) {
        updatePromises.push(
          updatePatientMutation.mutateAsync({
            patientId: myPatientQuery.data.id,
            payload: patientPayload,
          }),
        );
      }

      await Promise.all(updatePromises);
      toast.success('Cập nhật thông tin thành công');
    } catch (error) {
      const errorMessage =
        error instanceof Error && (error as any).response?.data?.message
          ? typeof (error as any).response.data.message === 'string'
            ? (error as any).response.data.message
            : (error as any).response.data.message.message
          : error instanceof Error
            ? error.message
            : 'Cập nhật thất bại';
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (profileQuery.isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border transition-colors">Đang tải hồ sơ...</div>
      </main>
    );
  }

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Thông tin cá nhân</h2>
          <p className="text-slate-500 text-sm">Quản lý thông tin hồ sơ của bạn để bảo mật tài khoản</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Họ và tên</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Giới tính</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none">
                <option value="">-- Chọn giới tính --</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Ngày sinh</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Email</label>
              <input type="email" value={formData.email} readOnly className="w-full px-4 py-2.5 border rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Số điện thoại</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Nghề nghiệp</label>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOccupations}
                value={occupationOption}
                placeholder="Chọn nghề nghiệp..."
                isClearable
                onChange={(option) => {
                  setOccupationOption(option as Option | null);
                  setFormData((prev) => ({
                    ...prev,
                    occupation: option ? String((option as Option).value) : '',
                  }));
                }}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold">CCCD / CMND</label>
              <input type="text" name="CCCD" value={formData.CCCD} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Quốc tịch</label>
              <select name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl bg-slate-50">
                <option value="">-- Chọn quốc gia --</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Dân tộc</label>
              <select name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl bg-slate-50">
                <option value="">-- Chọn dân tộc --</option>
                {ethnicities.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tỉnh / Thành phố</label>
              <select name="province" value={formData.province} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl bg-slate-50">
                <option value="">-- Chọn tỉnh / thành --</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Phường / Xã</label>
              <select name="ward" value={formData.ward} onChange={handleChange} disabled={wards.length === 0} className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 disabled:bg-slate-100">
                <option value="">-- Chọn phường / xã --</option>
                {wards.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Địa chỉ</label>
            <textarea rows={3} className="w-full px-4 py-2.5 border rounded-xl shadow-none" name="address" value={formData.address} onChange={handleChange}></textarea>
          </div>

          {/* EMERGENCY CONTACT SECTION */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500">contact_emergency</span>
                Thông tin người liên hệ khẩn cấp
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Họ và tên</label>
                <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} placeholder="Nhập tên người liên hệ" className="w-full px-4 py-2.5 border rounded-xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Số điện thoại</label>
                <input type="text" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} placeholder="Nhập số điện thoại" className="w-full px-4 py-2.5 border rounded-xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Mối quan hệ</label>
                <input type="text" name="emergencyContactRelationship" value={formData.emergencyContactRelationship} onChange={handleChange} placeholder="VD: Bố, Mẹ, Vợ..." className="w-full px-4 py-2.5 border rounded-xl outline-none" />
              </div>
            </div>
          </div>

          {/* INSURANCE SECTION */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">verified_user</span>
                Thông tin bảo hiểm & Y tế
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Nhà cung cấp bảo hiểm</label>
                <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} placeholder="VD: Bảo Hiểm Xã Hội Việt Nam" className="w-full px-4 py-2.5 border rounded-xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Số bảo hiểm y tế</label>
                <input type="text" name="insuranceNumber" value={formData.insuranceNumber} onChange={handleChange} placeholder="VD: GD1234567890" className="w-full px-4 py-2.5 border rounded-xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Ngày hết hạn</label>
                <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Nhóm máu</label>
                <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-xl outline-none bg-slate-50">
                  <option value="">-- Chọn nhóm máu --</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 items-center">
            <button
              type="button"
              onClick={async () => {
                try {
                  await authService.testPushNotification();
                  toast.success('Đã gửi yêu cầu test notification');
                } catch (error) {
                  toast.error('Gửi test notification thất bại');
                }
              }}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              Test Notification
            </button>
            <button type="submit" disabled={loading} className="px-8 py-2 bg-primary text-white rounded-xl">
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );

}

export default Profile;

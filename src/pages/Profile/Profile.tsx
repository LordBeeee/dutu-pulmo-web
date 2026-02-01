import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";

function Profile() {
  interface Province {
    code: number;
    name: string;
  }

  interface Ward {
    code: number;
    name: string;
  }
  // interface Country {
  //   id: string;
  //   name: string;
  // }

  // interface Ethnicity {
  //   id: string;
  //   name: string;
  // }
  interface Country {
    code: string;
    name: string;
  }

  interface Ethnicity {
    code: string;
    name: string;
  }

  interface Occupation {
    code: string;
    name: string;
  }

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [countries, setCountries] = useState<Country[]>([]);
  const [ethnicities, setEthnicities] = useState<Ethnicity[]>([]);

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [occupationOption, setOccupationOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [occupationReady, setOccupationReady] = useState(false);


  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    occupation: "",
    CCCD: "",
    nationality: "",
    ethnicity: "",
    province: "",
    ward: "",
    address: "",
  });

  // API LẤY TỈNH / THÀNH PHỐ
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/v2/")
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(console.error);
  }, []);

  const handleProvinceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceCode = e.target.value;

    setFormData(prev => ({
      ...prev,
      province: provinceCode,
      ward: ""
    }));

    if (!provinceCode) {
      setWards([]);
      return;
    }

    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`
      );
      const data = await res.json();

      // ✅ CHỈ LẤY wards
      setWards(data.wards || []);
    } catch (err) {
      console.error(err);
      setWards([]);
    }
  };
  // API LẤY PHƯỜNG / XÃ
  useEffect(() => {
    const loadWards = async () => {
      if (!formData.province) return;

      try {
        const res = await fetch(
          `https://provinces.open-api.vn/api/v2/p/${formData.province}?depth=2`
        );
        const data = await res.json();
        setWards(data.wards || []);
      } catch (err) {
        console.error(err);
        setWards([]);
      }
    };

    loadWards();
  }, [formData.province]);

  // API LẤY QUỐC GIA
  // useEffect(() => {
  //   fetch("http://localhost:3000/enums/countries?page=1&limit=1")
  //     .then(res => res.json())
  //     .then(data => setCountries(data.data ?? data))
  //     .catch(console.error);
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3000/enums/countries?page=1&limit=1")
      .then(res => res.json())
      .then(res => {
        setCountries(res.data?.items ?? []);
      })
      .catch(console.error);
  }, []);

  // API LẤY DÂN TỘC
  // useEffect(() => {
  //   fetch("http://localhost:3000/enums/ethnicities?page=1&limit=10")
  //     .then(res => res.json())
  //     .then(data => setEthnicities(data.data))
  //     .catch(console.error);
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3000/enums/ethnicities?page=1&limit=10")
      .then(res => res.json())
      .then(res => {
        setEthnicities(res.data?.items ?? []);
      })
      .catch(console.error);
  }, []);

  // API LẤY NGHỀ NGHIỆP
  // const loadOccupations = async (inputValue: string) => {
  //   // Không nhập gì thì không gọi API
  //   if (!inputValue || inputValue.trim().length < 1) {
  //     return [];
  //   }

  //   const res = await fetch(
  //     `http://localhost:3000/enums/occupations?limit=100&search=${encodeURIComponent(
  //       inputValue.trim()
  //     )}`
  //   );

  //   const json = await res.json();
  //   const data: Occupation[] = json.data ?? [];

  //   return data.map(item => ({
  //     value: item.code,
  //     label: item.name,
  //   }));
  // };
  // const loadOccupations = async (inputValue: string) => {
  //   if (!inputValue || inputValue.trim().length < 1) {
  //     return [];
  //   }

  //   const res = await fetch(
  //     `http://localhost:3000/enums/occupations?limit=20&search=${encodeURIComponent(
  //       inputValue.trim()
  //     )}`
  //   );

  //   const json = await res.json();

  //   const items: Occupation[] = json.data?.items ?? [];

  //   return items.map(item => ({
  //     value: item.code,
  //     label: item.name,
  //   }));
  // };
  const loadOccupations = async (inputValue: string) => {
    const keyword = inputValue.trim();

    const url = keyword
      ? `http://localhost:3000/enums/occupations?limit=20&search=${encodeURIComponent(keyword)}`
      : `http://localhost:3000/enums/occupations?limit=20`;

    const res = await fetch(url);
    const json = await res.json();

    const items: Occupation[] = json.data?.items ?? [];

    return items.map(item => ({
      value: item.code,
      label: item.name,
    }));
  };

  // API LẤY THÔNG TIN USER
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch("http://localhost:3000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      const user = json.data; // ⬅️ DÒNG QUAN TRỌNG NHẤT

      if (!user) return;

      setFormData({
        fullName: user.fullName ?? "",
        gender: user.gender ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        dateOfBirth: user.dateOfBirth ?? "",
        occupation: user.occupation ?? "",
        CCCD: user.CCCD ?? "",
        nationality: user.nationality ?? "",
        ethnicity: user.ethnicity ?? "",
        province: user.provinceCode ?? "",
        ward: user.wardCode ?? "",
        address: user.address ?? "",
      });

      // MAP CODE → name cho occupation
      // if (user.occupation) {
      //   const resOcc = await fetch(
      //     `http://localhost:3000/enums/occupations?limit=100`
      //   );
      //   const occJson = await resOcc.json();
      //   const items: Occupation[] = occJson.data?.items ?? [];

      //   const matched = items.find(
      //     x => String(x.code) === String(user.occupation)
      //   );

      //   if (matched) {
      //     setOccupationOption({
      //       value: matched.code,
      //       label: matched.name, // ✅ TÊN NGHỀ
      //     });
      //   }
      // }
      if (user.occupation) {
        try {
          const resOcc = await fetch(
            `http://localhost:3000/enums/occupations/${user.occupation}`
          );
          const occJson = await resOcc.json();

          if (occJson?.data) {
            setOccupationOption({
              value: occJson.data.code,
              label: occJson.data.name,
            });
          } else {
            // ✅ FALLBACK – QUAN TRỌNG
            setOccupationOption({
              value: String(user.occupation),
              label: `Mã nghề: ${user.occupation}`,
            });
          }
        } catch {
          setOccupationOption({
            value: String(user.occupation),
            label: `Mã nghề: ${user.occupation}`,
          });
        }
      }
      setOccupationReady(true); // ĐÁNH DẤU ĐÃ SẴN SÀNG
      setAvatarUrl(user.avatarUrl);
      };
    
    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadAvatar = async (file: File) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3000/upload/avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const json = await res.json();
    return json.data.url; // avatarUrl từ BE
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!token || !user.id) {
        throw new Error("Thiếu token hoặc userId");
      }

      const payload = {
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
        address: formData.address || null,

      };

      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      alert("✅ Cập nhật thông tin thành công");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-72 space-y-6">

          {/* Profile card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* <div className="relative mb-3">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8oXlt405qK_Rck7wdacjVQ0hZH0-1aZEL-AsNUGU5SAXPV0GGONnK7oU3CR2-Wd9RRmPHTMXttSXAWt9CP1evJQZoTrTRi52UEZewHgXBYI9dZ6MEp3ZIFf8MlBU5YM_i7KvvYZ7JsgVa3DNtkSxWo756Hs2xHkDKpcKJValSiRVz8L-nEKAhgHzH-oDWBJvvVoZJjP0rTng_opf8LaQVsd-Rv6vCelDcJZhQiyKFgl4d_UOXZc6nvQmla4jBVpVXcLzttRqpbw"
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
                  <span className="material-icons-outlined text-xs">edit</span>
                </button>
              </div> */}
              {/* lần 2 */}
              {/* <img
                src={avatarUrl || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />

              <label className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white cursor-pointer">
                <span className="material-icons-outlined text-xs">edit</span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setAvatarFile(file);
                    setAvatarUrl(URL.createObjectURL(file)); // preview ngay
                  }}
                />
              </label> */}
              {/* lần 3 */}
              <label className="relative inline-block cursor-pointer">
                <img
                  src={avatarUrl || "https://via.placeholder.com/150"}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border"
                />

                {/* icon edit */}
                <span className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="material-icons-outlined text-xs">edit</span>
                </span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setAvatarFile(file);
                    setAvatarUrl(URL.createObjectURL(file)); // preview

                    try {
                      const url = await uploadAvatar(file);
                      setAvatarUrl(url); // URL thật từ BE
                    } catch  {
                      alert("Upload avatar thất bại");
                    }
                  }}

                />
              </label>

              {/* <h3 className="font-bold text-lg" value={formData.fullName}>{formData.fullName}</h3> */}
              {/* <p className="text-sm text-slate-500" value={formData.phone}>{formData.phone}</p> */}
            </div>
          </div>

          {/* Menu */}
          <nav className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-2">
            <ul className="space-y-1">
              <li>
                <a className="flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium" href="#">
                  <span className="material-icons-outlined text-[20px]">assignment_ind</span>
                  <span className="text-sm">Hồ sơ y tế</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">favorite_border</span>
                  <span className="text-sm">Danh sách quan tâm</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">gavel</span>
                  <span className="text-sm">Điều khoản & Quy định</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">groups</span>
                  <span className="text-sm">Tham gia cộng đồng</span>
                </a>
              </li>

              <div className="py-2 px-4">
                <hr className="border-slate-100 dark:border-slate-800" />
              </div>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">share</span>
                  <span className="text-sm">Chia sẻ ứng dụng</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">headset_mic</span>
                  <span className="text-sm">Liên hệ & hỗ trợ</span>
                </a>
              </li>

              <li>
                <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors" href="#">
                  <span className="material-icons-outlined text-[20px]">settings</span>
                  <span className="text-sm">Cài đặt</span>
                </a>
              </li>

              <div className="pt-2 px-4">
                <hr className="border-slate-100 dark:border-slate-800" />
              </div>

              <li className="pt-4">
                {/* <a className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium" href="#">
                  <span className="material-icons-outlined text-[20px]">logout</span>
                  <span className="text-sm">Đăng xuất</span>
                </a> */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                >
                  <span className="material-icons-outlined text-[20px]">logout</span>
                  <span className="text-sm">Đăng xuất</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">

          {/* Profile form */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">Thông tin cá nhân</h2>
              <p className="text-slate-500 text-sm">
                Quản lý thông tin hồ sơ của bạn để bảo mật tài khoản
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Giới tính</label>
                  <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none">
                    <option value="">-- Chọn giới tính --</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Ngày sinh</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <input type="email" value={formData.email} readOnly className="w-full px-4 py-2.5 border rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="84 923 739 836"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Nghề nghiệp</label>
                  {/* <AsyncSelect
                    cacheOptions
                    loadOptions={loadOccupations}
                    defaultOptions
                    value={formData.occupation ? { value: formData.occupation, label: formData.occupation } : null}
                    placeholder="Chọn nghề nghiệp..."
                    isClearable
                    onChange={(option) =>
                      setFormData(prev => ({
                        ...prev,
                        occupation: option ? String(option.value) : "",
                      }))
                    }
                  /> */}
                  {/* <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOccupations}
                    value={occupationOption}   // 👈 DÙNG OPTION, KHÔNG DÙNG formData
                    placeholder="Chọn nghề nghiệp..."
                    isClearable
                    onChange={(option) => {
                      setOccupationOption(option);
                      setFormData(prev => ({
                        ...prev,
                        occupation: option ? String(option.value) : "",
                      }));
                    }}
                  /> */}
                  {occupationReady ? (
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOccupations}
                    value={occupationOption}
                    placeholder="Chọn nghề nghiệp..."
                    isClearable
                    onChange={(option) => {
                      setOccupationOption(option);
                      setFormData(prev => ({
                        ...prev,
                        occupation: option ? String(option.value) : "",
                      }));
                    }}
                  />
                ) : (
                  <div className="w-full px-4 py-2.5 border rounded-xl bg-slate-100 text-slate-500">
                    Đang tải nghề nghiệp...
                  </div>
                )}

                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">CCCD / CMND</label>
                  <input
                    type="text"
                    name="CCCD"
                    value={formData.CCCD}
                    onChange={handleChange}
                    placeholder="Nhập số CCCD"
                    className="w-full px-4 py-2.5 border rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Quốc tịch</label>
                  <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-xl bg-slate-50"
                  >
                    <option value="">-- Chọn quốc gia --</option>
                    {/* {countries.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))} */}
                    {countries.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Dân tộc</label>
                  <select
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-xl bg-slate-50"
                  >
                    <option value="">-- Chọn dân tộc --</option>
                    {/* {ethnicities.map(e => (
                       <option key={e.id} value={e.id}>
                      {e.name}
                      </option>
                    ))} */}
                    {ethnicities.map(e => (
                      <option key={e.code} value={e.code}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Tỉnh / Thành phố</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleProvinceChange}
                    className="w-full px-4 py-2.5 border rounded-xl bg-slate-50"
                  >
                    <option value="">-- Chọn tỉnh / thành --</option>
                    {provinces.map(p => (
                       <option key={p.code} value={p.code}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Phường / Xã</label>
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    disabled={wards.length === 0}
                    className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 disabled:bg-slate-100"
                  >
                    <option value="">-- Chọn phường / xã --</option>
                    {wards.map(w => (
                      <option key={w.code} value={w.code}>{w.name}</option>
                    ))}
                  </select>
                </div>

              </div>
              <div className="space-y-2">
                  <label className="text-sm font-semibold">Đường</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 border rounded-xl" placeholder="123 Đường Nguyễn Huệ"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  >
                  </textarea>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" className="px-6 py-2 rounded-xl">
                  Hủy
                </button>
                <button type="submit" disabled={loading} className="px-8 py-2 bg-primary text-white rounded-xl">
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </section>

        </div>
      </div>
      {showLogoutModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <h3 className="text-lg font-bold mb-2">Xác nhận đăng xuất</h3>
          <p className="text-slate-500 text-sm mb-6">
            Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded-xl border"
            >
              Hủy
            </button>

            <button
              onClick={() => {
                setShowLogoutModal(false);

                // Xử lý đăng xuất
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                navigate("/login");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-xl"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    )}

    </main>
  );
}

export default Profile;

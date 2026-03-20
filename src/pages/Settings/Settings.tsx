import { 
  Lock, 
  Bell, 
  Mail, 
  Globe, 
  Moon, 
  Sun, 
  ShieldCheck, 
  HelpCircle, 
  FileText, 
  Info,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSettingsStore } from '@/store/settings.store';
import { Switch } from '@/components/ui/switch';
import { SettingSection, SettingRow } from '@/components/settings/SettingsLayout';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { 
    theme, 
    setTheme, 
    emailNotifications, 
    toggleEmailNotifications,
    browserNotifications,
    toggleBrowserNotifications,
    language,
    setLanguage
  } = useSettingsStore();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Cài đặt</h1>
        <p className="text-slate-500 dark:text-slate-400">Quản lý các tùy chọn và bảo mật tài khoản của bạn.</p>
      </div>

      <div className="space-y-2">
        <SettingSection title="Tài khoản & Bảo mật">
          <SettingRow
            icon={Lock}
            iconColor="#7c3aed"
            iconBg="#F5F3FF"
            title="Bảo mật tài khoản"
            subtitle="Đổi mật khẩu bảo vệ tài khoản"
            onPress={() => navigate('/change-password')}
            rightElement={<ChevronRight size={20} className="text-slate-400" />}
          />
          <SettingRow
            icon={ShieldCheck}
            iconColor="#0891b2"
            iconBg="#ECFEFF"
            title="Xác thực 2 bước"
            subtitle="Tăng cường bảo mật (Sắp ra mắt)"
            isLast
          />
        </SettingSection>

        <SettingSection title="Thông báo">
          <SettingRow
            icon={Bell}
            iconColor="#d97706"
            iconBg="#FFFBEB"
            title="Thông báo trình duyệt"
            subtitle="Nhận thông báo trực tiếp trên trình duyệt"
            rightElement={
              <Switch 
                checked={browserNotifications} 
                onCheckedChange={toggleBrowserNotifications} 
              />
            }
          />
          <SettingRow
            icon={Mail}
            iconColor="#dc2626"
            iconBg="#FEF2F2"
            title="Thông báo Email"
            subtitle="Nhận thông tin cập nhật qua email"
            rightElement={
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={toggleEmailNotifications} 
              />
            }
            isLast
          />
        </SettingSection>

        <SettingSection title="Giao diện & Ngôn ngữ">
          <SettingRow
            icon={theme === 'dark' ? Moon : Sun}
            iconColor="#eab308"
            iconBg="#FEFCE8"
            title="Chế độ tối"
            subtitle="Thay đổi giao diện ứng dụng"
            rightElement={
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
              />
            }
          />
          <SettingRow
            icon={Globe}
            iconColor="#16a34a"
            iconBg="#F0FDF4"
            title="Ngôn ngữ"
            subtitle="Chọn ngôn ngữ hiển thị"
            value={language === 'vi' ? 'Tiếng Việt' : 'English'}
            onPress={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            isLast
          />
        </SettingSection>

        <SettingSection title="Hỗ trợ & Thông tin">
          <SettingRow
            icon={HelpCircle}
            iconColor="#64748b"
            iconBg="#F8FAFC"
            title="Trung tâm trợ giúp"
            subtitle="Xem các câu hỏi thường gặp"
            onPress={() => window.open('https://example.com/help', '_blank')}
          />
          <SettingRow
            icon={FileText}
            iconColor="#64748b"
            iconBg="#F8FAFC"
            title="Điều khoản & Chính sách"
            subtitle="Quyền riêng tư và điều khoản dịch vụ"
            onPress={() => window.open('https://example.com/terms', '_blank')}
          />
          <SettingRow
            icon={Info}
            iconColor="#64748b"
            iconBg="#F8FAFC"
            title="Phiên bản"
            value="1.0.0 (Web)"
            isLast
          />
        </SettingSection>
      </div>
      
      <div className="mt-8 text-center sm:text-left">
        <p className="text-xs text-slate-400">
          DuTu Pulmo • © {new Date().getFullYear()} DuTu Health
        </p>
      </div>
    </div>
  );
}

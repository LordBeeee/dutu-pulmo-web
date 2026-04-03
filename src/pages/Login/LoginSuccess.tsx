import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/auth.store';

function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const error = searchParams.get('error');
    if (error) {
      toast.error('Đăng nhập Google thất bại. Vui lòng thử lại.');
      navigate('/login', { replace: true });
      return;
    }

    const encodedData = searchParams.get('data');
    if (!encodedData) {
      toast.error('Không nhận được dữ liệu đăng nhập.');
      navigate('/login', { replace: true });
      return;
    }

    try {
      const decoded = JSON.parse(atob(encodedData)) as {
        accessToken: string;
        refreshToken: string;
        account: {
          id: string;
          email: string;
          roles: string[];
          isVerified: boolean;
          user: {
            id: string;
            fullName: string;
            avatarUrl?: string;
            status: string;
            CCCD?: string;
            phone?: string;
          };
          createdAt: string;
          updatedAt: string;
        };
        accountStatus: 'new' | 'existing';
      };

      setSession({
        accessToken: decoded.accessToken,
        refreshToken: decoded.refreshToken,
        user: {
          id: decoded.account.user.id,
          fullName: decoded.account.user.fullName,
          avatarUrl: decoded.account.user.avatarUrl,
          status: decoded.account.user.status,
          phone: decoded.account.user.phone,
          email: decoded.account.email,
        },
      });

      if (decoded.accountStatus === 'new') {
        toast.success('Đăng ký tài khoản thành công qua Google!');
      } else {
        toast.success('Đăng nhập Google thành công!');
      }

      navigate('/', { replace: true });
    } catch {
      toast.error('Dữ liệu đăng nhập không hợp lệ.');
      navigate('/login', { replace: true });
    }
  }, [searchParams, setSession, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Đang xử lý đăng nhập...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Vui lòng đợi trong giây lát
        </p>
      </div>
    </div>
  );
}

export default LoginSuccess;

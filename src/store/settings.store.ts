import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  language: 'vi' | 'en';
  emailNotifications: boolean;
  browserNotifications: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'vi' | 'en') => void;
  toggleEmailNotifications: () => void;
  toggleBrowserNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'vi',
      emailNotifications: true,
      browserNotifications: false,
      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
            // System theme handling could be more complex, keeping it simple for now
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
      },
      setLanguage: (language) => set({ language }),
      toggleEmailNotifications: () =>
        set((state) => ({ emailNotifications: !state.emailNotifications })),
      toggleBrowserNotifications: () =>
        set((state) => ({ browserNotifications: !state.browserNotifications })),
    }),
    {
      name: 'settings-storage',
    }
  )
);

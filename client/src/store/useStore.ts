import { create } from 'zustand';

type Theme = 'student' | 'admin' | 'company';

interface User {
  id: string;
  name: string;
  role: Theme;
  email: string;
}

interface Store {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useStore = create<Store>((set) => ({
  theme: 'student', // Default
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

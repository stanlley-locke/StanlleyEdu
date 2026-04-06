import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: 'student' | 'admin' | null;
  user: any | null; // Optional: store user details
  login: (token: string, role: string, user?: any) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('stanlleyhub_token'),
  role: localStorage.getItem('stanlleyhub_role') as 'student' | 'admin' | null,
  user: localStorage.getItem('stanlleyhub_user') ? JSON.parse(localStorage.getItem('stanlleyhub_user')!) : null,
  login: (token, role, user) => {
    localStorage.setItem('stanlleyhub_token', token);
    localStorage.setItem('stanlleyhub_role', role);
    if (user) localStorage.setItem('stanlleyhub_user', JSON.stringify(user));
    set({ token, role: role as 'student' | 'admin', user });
  },
  logout: () => {
    localStorage.removeItem('stanlleyhub_token');
    localStorage.removeItem('stanlleyhub_role');
    localStorage.removeItem('stanlleyhub_user');
    set({ token: null, role: null, user: null });
  },
}));

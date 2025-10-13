import { api } from './api';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
  institution_id: string;
  department: string;
  phone_number: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  institution_id: string;
  department: string;
  phone_number: string;
  is_approved: boolean;
  training_completed: boolean;
  is_active: boolean;
  date_joined: string;  
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export const authService = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/login/', data);
    const loginData: LoginResponse = response.data;
    
    if (loginData.access) {
      localStorage.setItem('access_token', loginData.access);
      localStorage.setItem('refresh_token', loginData.refresh);
      localStorage.setItem('user', JSON.stringify(loginData.user));
      console.log('✅ Tokens saved to localStorage:', {
        access_token: loginData.access.substring(0, 20) + '...',
        user: loginData.user.username
      });
    }
    return loginData;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    console.log('✅ Logged out - localStorage cleared');
  },

  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        console.log('✅ Found user in localStorage:', user.username);
        return user;
      }
    } catch (error) {
      console.error('❌ Error parsing user from localStorage:', error);
    }
    console.log('❌ No user found in localStorage');
    return null;
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    const hasToken = !!token;
    console.log('🔐 Authentication check:', hasToken);
    return hasToken;
  },
};
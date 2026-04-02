import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'company';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('elitex_token');
    const storedUser = localStorage.getItem('elitex_user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('elitex_token', token);
    localStorage.setItem('elitex_role', userData.role);
    localStorage.setItem('elitex_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('elitex_token');
    localStorage.removeItem('elitex_role');
    localStorage.removeItem('elitex_user');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('elitex_token');
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  const refreshProfile = async () => {
    try {
      const response = await getProfile();
      if (response.data.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('elitex_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      logout();
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    refreshProfile
  };
};

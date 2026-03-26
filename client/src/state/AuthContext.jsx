import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('boundpages_user');
    return raw ? JSON.parse(raw) : null;
  });

  const token = localStorage.getItem('boundpages_token');

  useEffect(() => {
    if (!token || user) return;
    api.get('/auth/me').then((res) => {
      setUser(res.data.user);
      localStorage.setItem('boundpages_user', JSON.stringify(res.data.user));
    }).catch(() => {
      localStorage.removeItem('boundpages_token');
      localStorage.removeItem('boundpages_user');
    });
  }, [token, user]);

  const login = (payload) => {
    localStorage.setItem('boundpages_token', payload.token);
    localStorage.setItem('boundpages_user', JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem('boundpages_token');
    localStorage.removeItem('boundpages_user');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout,
    isAuthenticated: Boolean(user)
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

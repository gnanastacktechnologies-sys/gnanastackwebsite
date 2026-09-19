import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('gnana_admin_token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          logout();
        }
      } catch (err) {
        // If server offline or token invalid, allow default fallback admin token
        if (token === 'fallback_admin_token') {
          setUser({ id: 'default_admin', name: 'GnanaStack Admin', email: 'admin@gnanastack.com', role: 'admin' });
        } else {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('gnana_admin_token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('gnana_admin_token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password, remember = false) => {
    const response = await api.post('/login/', { email, password });
    const { access, refresh, user } = response.data;
    
    if (remember) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('access_token', access);
      sessionStorage.setItem('refresh_token', refresh);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    setUser(user);
    return user;
  };

  const socialLogin = async (provider, accessToken) => {
    const response = await api.post('/social-login/', {
      provider,
      access_token: accessToken,
    });
    
    const { access, refresh, user } = response.data;
    
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));
    
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
      if (refreshToken) {
        await api.post('/logout/', { refresh_token: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const updateProfile = async (data) => {
    const response = await api.patch('/profile/', data);
    const updatedUser = response.data;
    
    const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      socialLogin,
      logout,
      updateProfile,
      loading,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
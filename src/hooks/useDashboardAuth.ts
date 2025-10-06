import { useState, useEffect } from 'react';

const AUTH_KEY = 'dashboard_auth_token';
const DASHBOARD_PASSWORD = 'profetico2024'; // Change in production

export const useDashboardAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === DASHBOARD_PASSWORD) {
      const token = `dashboard_${Date.now()}`;
      localStorage.setItem(AUTH_KEY, token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};

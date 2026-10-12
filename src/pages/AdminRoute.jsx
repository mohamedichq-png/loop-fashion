import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { useStore } from '../context/StoreContext';

export default function AdminRoute() {
  const { refreshProducts } = useStore();
  const [token, setToken] = useState(() => sessionStorage.getItem('loop_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('loop_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isVerifying, setIsVerifying] = useState(true);

  // Server-side token verification on mount
  useEffect(() => {
    const verifyServerSession = async () => {
      const storedToken = sessionStorage.getItem('loop_admin_token');
      if (!storedToken) {
        setIsVerifying(false);
        setToken(null);
        return;
      }

      try {
        const res = await fetch('/api/admin/verify', {
          headers: { 'Authorization': `Bearer ${storedToken}` }
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setToken(storedToken);
          setAdminUser(data.user);
        } else {
          // Token expired or invalid on server
          sessionStorage.removeItem('loop_admin_token');
          sessionStorage.removeItem('loop_admin_user');
          setToken(null);
          setAdminUser(null);
        }
      } catch (err) {
        console.error('Session verification error', err);
        sessionStorage.removeItem('loop_admin_token');
        sessionStorage.removeItem('loop_admin_user');
        setToken(null);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyServerSession();
  }, []);

  const handleLoginSuccess = (newToken, user) => {
    setToken(newToken);
    setAdminUser(user);
    if (refreshProducts) refreshProducts();
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.error(e);
      }
    }
    sessionStorage.removeItem('loop_admin_token');
    sessionStorage.removeItem('loop_admin_user');
    setToken(null);
    setAdminUser(null);
  };

  if (isVerifying) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B6862' }}>
        <span>Vérification de la session administrateur...</span>
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminDashboard 
      adminUser={adminUser} 
      token={token} 
      onLogout={handleLogout}
      onProductsUpdated={refreshProducts}
    />
  );
}

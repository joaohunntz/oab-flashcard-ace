
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    console.log('ProtectedRoute: User status', { loading, authenticated: !!user, path: location.pathname });
  }, [user, loading, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oab-blue"></div>
      </div>
    );
  }

  // Se não tiver usuário e não estiver na página de autenticação, redirecionar para /auth
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Se estiver na página raiz /, redirecionar para /home
  if (location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

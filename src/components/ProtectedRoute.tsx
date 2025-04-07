
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  console.log("ProtectedRoute check:", { user: user?.email, path: location.pathname, loading });

  // Se estiver carregando, mostrar indicador de carregamento
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oab-blue"></div>
      </div>
    );
  }

  // Se não autenticado, redirecionar para login
  if (!user) {
    console.log("User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  // Se estiver na rota raiz e autenticado, redirecionar para /home
  if (location.pathname === '/') {
    console.log("User at root path, redirecting to /home");
    return <Navigate to="/home" replace />;
  }

  // Se autenticado e não está na rota raiz, renderizar o conteúdo protegido
  return <>{children}</>;
};

export default ProtectedRoute;

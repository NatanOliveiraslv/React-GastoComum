import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute() {
  const { isAuthenticated, authInitialized } = useAuth();

  // Enquanto o auth ainda está carregando (ex: lendo token do localStorage)
  if (!authInitialized) {
    return null; // Ou um componente de carregamento (ex: <Loading />)
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Se estiver autenticado, libera as rotas internas
  return <Outlet />;
}

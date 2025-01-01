import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../appwrite/auth';

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-turquoise flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-classic-blue"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
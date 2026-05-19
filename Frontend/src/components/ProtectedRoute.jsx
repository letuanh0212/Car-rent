import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  
  console.log('ProtectedRoute check:', { isAuthenticated, loading, user: user?.id, authType: useAuth().authType });
  
  if (loading) {
    console.log('ProtectedRoute: loading, return Loading...');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: isAuthenticated = false, redirect to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute: authenticated, rendering children');
  return children;
};

export default ProtectedRoute;

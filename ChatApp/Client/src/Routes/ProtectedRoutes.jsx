import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';
import Loader from '../components/Loader';

export default function ProtectedRoutes({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (!isAuthenticated)
    return (<Navigate
      to="/login"
      replace
      state={{ from: location }} />);

  return <>{children}</>;
}

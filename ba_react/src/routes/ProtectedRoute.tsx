import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


interface ProtectedRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContextが見つかりません。AuthProviderで包んでいますか？');
  }

  const { isLoggedIn } = authContext;

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;

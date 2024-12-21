import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface RedirectIfLoggedInProps {
  children: JSX.Element;
  redirectTo: string;
}

const RedirectIfLoggedIn: React.FC<RedirectIfLoggedInProps> = ({ children, redirectTo }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContextが見つかりません。AuthProviderで包んでいますか？');
  }

  const { isLoggedIn } = authContext;

  // ログインしている場合はリダイレクト
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // ログインしていない場合は子コンポーネントを表示
  return children;
};

export default RedirectIfLoggedIn;

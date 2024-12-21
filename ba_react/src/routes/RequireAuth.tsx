import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface RequireAuthProps {
  children: JSX.Element;
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, redirectTo }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContextが見つかりません。AuthProviderで包んでいますか？');
  }

  const { isLoggedIn, isLoading } = authContext;
  
  // 認証情報の確認中はローディング表示を行い、リダイレクトを防ぐ
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ログインしていない場合はリダイレクト
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // ログインしている場合は子コンポーネントを表示
  return children;
};

export default RequireAuth;

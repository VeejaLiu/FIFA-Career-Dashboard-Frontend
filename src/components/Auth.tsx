import { useEffect, useState } from 'react';
import App from '../App.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import { UserApis } from '../service/UserApis.ts';

export const Auth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getLoginStatus = async () => {
    const result = await UserApis.verifyToken();
    setIsAuthenticated(result);
  };

  useEffect(() => {
    getLoginStatus().then();
  }, []);

  return <>{isAuthenticated ? <App /> : <LoginPage />}</>;
};

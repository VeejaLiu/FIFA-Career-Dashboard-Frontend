import { useEffect, useState } from 'react';
import App from '../App.tsx';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';
import { UserApis } from '../service/UserApis.ts';
import { Spin } from '@douyinfe/semi-ui';

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getLoginStatus = async () => {
    const result = await UserApis.verifyToken();
    setIsAuthenticated(result);
    setIsLoading(false);
  };

  useEffect(() => {
    getLoginStatus().then();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : isAuthenticated ? (
        <App />
      ) : (
        <LoginPage />
      )}
    </>
  );
};

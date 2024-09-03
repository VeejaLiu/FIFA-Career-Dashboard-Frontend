import { useEffect, useState } from 'react';
import App from '../App.tsx';
import { UserApis } from '../service/UserApis.ts';
import { LocaleProvider, Space, Spin } from '@douyinfe/semi-ui';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

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
    <LocaleProvider locale={en_GB}>
      {isLoading ? (
        <Space
          style={{
            width: '100vw',
            height: '100vh',
          }}
          align={'center'}
        >
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Spin size="large" />
          </div>
        </Space>
      ) : isAuthenticated ? (
        <App />
      ) : (
        <LoginPage />
      )}
    </LocaleProvider>
  );
};

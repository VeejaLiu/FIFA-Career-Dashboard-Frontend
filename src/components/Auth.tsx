import { useEffect, useState } from 'react';
import App from '../App.tsx';
import { UserApis } from '../service/UserApis.ts';
import { LocaleProvider, Spin } from '@douyinfe/semi-ui';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';

import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';

import customzh_CN from '../locales/zh_CN.ts';
import customen_GB from '../locales/en_GB.ts';

export const LANGUAGE_LOCAL_STORAGE_KEY = 'fcd-ui-default-language';

// [
//     "zh-CN",
//     "en",
//     "en-GB",
//     "en-US",
//     "zh"
// ]
const SUPPORTED_LANGUAGES: any = {
  en: { ...en_GB, ...customen_GB },
  en_GB: { ...en_GB, ...customen_GB },
  en_US: { ...en_GB, ...customen_GB },

  zh: { ...zh_CN, ...customzh_CN },
  zh_CN: { ...zh_CN, ...customzh_CN },
};

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [locale, setLocale] = useState(SUPPORTED_LANGUAGES.zh_CN);

  const getDefaultLanguage = () => {
    let defaultLanguage: any = 'en_GB';

    // Get from local storage first
    defaultLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
    if (defaultLanguage) {
      console.log(`Get from local storage`, defaultLanguage);
      return defaultLanguage;
    }

    // Get the browser language
    const languages = navigator.languages
      ? navigator.languages
      : [navigator.language];

    console.log('languages', languages);
    console.log(`SUPPORTED_LANGUAGES`, SUPPORTED_LANGUAGES);
    for (let i = 0; i < languages.length; i++) {
      const language = languages[i].replace('-', '_');
      if (language in SUPPORTED_LANGUAGES) {
        // save the language into local storage
        defaultLanguage = language;
        localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, defaultLanguage);
        break;
      }
    }

    return defaultLanguage;
  };

  const getLoginStatus = async () => {
    const result = await UserApis.verifyToken();
    setIsAuthenticated(result);
    setIsLoading(false);
  };

  useEffect(() => {
    const browserLanguage = getDefaultLanguage();
    console.log('browserLanguage', browserLanguage);
    if (browserLanguage in SUPPORTED_LANGUAGES) {
      // console.log('setLocale', SUPPORTED_LANGUAGES[browserLanguage]);
      setLocale(SUPPORTED_LANGUAGES[browserLanguage]);
    }

    getLoginStatus().then();
  }, []);

  return (
    <LocaleProvider locale={locale}>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Spin size="large" />
        </div>
      ) : isAuthenticated ? (
        <App />
      ) : (
        <LoginPage />
      )}
    </LocaleProvider>
  );
};

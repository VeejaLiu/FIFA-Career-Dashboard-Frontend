import {
  Button,
  Form,
  LocaleConsumer,
  Notification,
  Space,
} from '@douyinfe/semi-ui';
import { getContactUs } from './LoginPage.tsx';
import { UserApis } from '../../service/UserApis.ts';
import { useState } from 'react';
import styles from './RegisterComponent.module.scss';

export const RegisterComponent = ({ setIsLogin }: { setIsLogin: any }) => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  async function doRegister() {
    if (registerPassword !== registerPasswordConfirm) {
      Notification.error({
        position: 'top',
        title: 'Error',
        content: 'Passwords do not match.',
        duration: 3,
      });
    }
    console.log(
      `[doRegister] formInfo: ${JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        passwordConfirm: registerPasswordConfirm,
      })}`,
    );
    // setShowModal(true);
    const response = await UserApis.registerUser({
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      confirmPassword: registerPasswordConfirm,
    });
    if (response.success) {
      Notification.success({
        position: 'top',
        title: 'Welcome!!!',
        content: 'Register success! Will redirect to login page in 3 seconds',
        duration: 3,
      });
      // 3 seconds later, redirect to login page
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLogin(true);
    } else {
      Notification.error({
        position: 'top',
        title: 'Error',
        content: response.message,
        duration: 3,
      });
    }
  }

  return (
    <LocaleConsumer componentName={'RegisterComponent'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <Space vertical className={styles.register}>
          <div className={styles.component66}>
            <div className={styles.header}>
              <p className={styles.title}>{localeData.title}</p>
              <p className={styles.text}>
                <span className={styles.text1}>{localeData.text}</span>
              </p>
            </div>
          </div>
          <div className={styles.form}>
            <Form className={styles.inputs}>
              <Form.Input
                label={{ text: localeData.username }}
                field="username"
                placeholder={localeData.usernamePlaceholder}
                fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                onChange={(e) => setRegisterUsername(e)}
              />
              <Form.Input
                label={{ text: localeData.email }}
                field="register.email"
                placeholder={localeData.emailPlaceholder}
                fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                onChange={(e) => setRegisterEmail(e)}
              />
              <Form.Input
                mode={'password'}
                label={{ text: localeData.password }}
                field="password"
                placeholder={localeData.passwordPlaceholder}
                fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                onChange={(e) => setRegisterPassword(e)}
              />
              <Form.Input
                mode={'password'}
                label={{ text: localeData.confirmPassword }}
                field="password-confirm"
                placeholder={localeData.confirmPasswordPlaceholder}
                fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                onChange={(e) => setRegisterPasswordConfirm(e)}
              />
            </Form>
            <Button
              theme="solid"
              className={styles.button}
              onClick={doRegister}
            >
              {localeData.register}
            </Button>
            <Button
              theme={'outline'}
              className={styles.button}
              onClick={() => {
                setIsLogin(true);
              }}
            >
              {localeData.loginPrompt}
            </Button>
          </div>
          {getContactUs()}
        </Space>
      )}
    </LocaleConsumer>
  );
};

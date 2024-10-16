import {
  Button,
  Form,
  Image,
  LocaleConsumer,
  // Modal,
  Notification,
  Space,
  Typography,
} from '@douyinfe/semi-ui';
import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { UserApis } from '../../service/UserApis.ts';
import {
  // IconComment,
  IconGithubLogo,
  IconMailStroked1,
} from '@douyinfe/semi-icons';
import img_starter from '../../assets/image/img_starter.webp';
import img_existing from '../../assets/image/img_existing.webp';
import { setToken } from '../../common/common.ts';

const { Text } = Typography;

function getContactUs() {
  return (
    <Space
      vertical
      align={'start'}
      style={{
        marginTop: '50px',
      }}
    >
      <b>
        Discord:{' '}
        <Text link={{ href: 'https://discord.gg/aKfWAtbJ8F' }}>
          https://discord.gg/aKfWAtbJ8F
        </Text>
      </b>
      <b>
        GitHub:{' '}
        <Text
          icon={<IconGithubLogo />}
          link={{
            href: 'https://github.com/VeejaLiu/FIFA-Career-Dashboard-Frontend',
            target: '_blank',
          }}
          underline
        >
          FIFA-Career-Dashboard
        </Text>
      </b>
      <b>
        Email:{' '}
        <Text
          icon={<IconMailStroked1 />}
          link={{
            href: 'mailto:support@fccareer.top',
            target: '_blank',
          }}
        >
          support@fccareer.com
        </Text>
      </b>
    </Space>
  );
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  // const [showModal, setShowModal] = useState(false);

  async function doLogin() {
    const response = await UserApis.loginUser({
      username: loginUsername,
      password: loginPassword,
    });
    const { success, message, data } = response;
    if (success) {
      // {
      //   "success":true,
      //   "message":"success",
      //   "data": {
      //     "id":1,
      //     "username":"sss",
      //     "email":"ssss@gmail.com",
      //     "token":"......",
      //   }
      // }
      const { username, token } = data;
      console.log(`[doLogin] data: ${JSON.stringify(data)}`);
      setToken(token);
      Notification.success({
        position: 'top',
        title: 'Success',
        content: 'Welcome back, ' + username + '!',
        duration: 3,
      });

      // Navigate({ to: '/players' });
      window.location.href = '/players';
    } else {
      // console.log(`[doLogin] message: ${message}`);
      Notification.error({
        position: 'top',
        title: 'Error',
        content: message,
        duration: 3,
      });
    }
  }

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

  const LoginComponent = () => {
    return (
      <LocaleConsumer componentName={'LoginComponent'}>
        {(localeData: any, localeCode: string, dateFnsLocale: any) => (
          <Space vertical className={styles.login}>
            <div className={styles.component66}>
              <div className={styles.header}>
                <p className={styles.title}>
                  {/*Welcome to back*/}
                  {localeData.welcome}
                </p>
                <p className={styles.text}>
                  <span className={styles.text1}> FC-Career-Dashboard </span>
                </p>
              </div>
            </div>
            <div className={styles.form}>
              <Form className={styles.inputs}>
                <Form.Input
                  label={{ text: localeData.usernameEmail }}
                  field="email"
                  placeholder={localeData.usernameEmailPlaceholder}
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setLoginUsername(e)}
                />
                <Form.Input
                  mode={'password'}
                  label={{ text: localeData.password }}
                  field="password"
                  placeholder={localeData.passwordPlaceholder}
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setLoginPassword(e)}
                />
              </Form>
              <Button theme="solid" className={styles.button} onClick={doLogin}>
                {localeData.login}
              </Button>
              <Button
                theme="outline"
                className={styles.button}
                onClick={() => {
                  setIsLogin(false);
                }}
                size={'large'}
              >
                {localeData.registerPrompt}
              </Button>
            </div>
            {getContactUs()}
          </Space>
        )}
      </LocaleConsumer>
    );
  };

  const RegisterComponent = () => {
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

  return (
    <Space
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Left */}
      <Space vertical style={{ width: '50vw' }}>
        {isLogin ? (
          <LoginComponent />
        ) : (
          <Image
            preview={false}
            src={img_starter}
            width={'100%'}
            // height={'100%'}
          ></Image>
        )}
      </Space>

      {/* Right */}
      <Space vertical style={{ width: '50vw' }}>
        {!isLogin ? (
          <RegisterComponent />
        ) : (
          <Image
            preview={false}
            src={img_existing}
            // height={'100%'}
            width={'100%'}
          ></Image>
        )}
      </Space>
    </Space>
  );
};

export default LoginPage;

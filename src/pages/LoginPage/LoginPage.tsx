import {
  Button,
  Form,
  Image,
  Modal,
  Notification,
  Space,
  Typography,
} from '@douyinfe/semi-ui';
import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { UserApis } from '../../service/UserApis.ts';
import {
  IconComment,
  IconGithubLogo,
  IconMailStroked1,
} from '@douyinfe/semi-icons';
import img_starter from '../../assets/image/img_starter.webp';
import img_existing from '../../assets/image/img_existing.webp';

const { Text } = Typography;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  const [showModal, setShowModal] = useState(false);

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
      localStorage.setItem('fcd-token', token);
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
    // Notification.error({
    //   position: 'top',
    //   title: 'Error',
    //   content: 'Sorry, registration is not available yet.',
    //   duration: 3,
    // });
    console.log(
      `[doRegister] formInfo: ${JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
        passwordConfirm: registerPasswordConfirm,
      })}`,
    );
    setShowModal(true);
  }

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
          <Space vertical className={styles.login}>
            <div className={styles.component66}>
              <div className={styles.header}>
                <p className={styles.title}>Welcome to back</p>
                <p className={styles.text}>
                  <span className={styles.text1}> FC-Career-Dashboard </span>
                </p>
              </div>
            </div>
            <div className={styles.form}>
              <Form className={styles.inputs}>
                <Form.Input
                  label={{ text: 'Username / Email' }}
                  field="email"
                  placeholder="your username or email"
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setLoginUsername(e)}
                />
                <Form.Input
                  mode={'password'}
                  label={{ text: 'Password' }}
                  field="password"
                  placeholder="your password"
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setLoginPassword(e)}
                />
              </Form>
              <Button theme="solid" className={styles.button} onClick={doLogin}>
                Login
              </Button>

              <Button
                theme="outline"
                className={styles.button}
                onClick={() => {
                  setIsLogin(false);
                }}
                size={'large'}
              >
                Don't have an account? Register
              </Button>
            </div>
          </Space>
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
          <Space vertical className={styles.register}>
            <div className={styles.component66}>
              <div className={styles.header}>
                <p className={styles.title}>Start your great journey</p>
                <p className={styles.text}>
                  <span className={styles.text1}>Free to use, forever</span>
                </p>
              </div>
            </div>
            <div className={styles.form}>
              <Form className={styles.inputs}>
                <Form.Input
                  label={{ text: 'Username' }}
                  field="username"
                  placeholder="your username"
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setRegisterUsername(e)}
                />
                <Form.Input
                  label={{ text: 'Email' }}
                  field="register.email"
                  placeholder="your email"
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setRegisterEmail(e)}
                />
                <Form.Input
                  mode={'password'}
                  label={{ text: 'Password' }}
                  field="password"
                  placeholder="your password"
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setRegisterPassword(e)}
                />{' '}
                <Form.Input
                  mode={'password'}
                  label={{ text: 'Password' }}
                  field="password-confirm"
                  placeholder="confirm your password"
                  fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
                  onChange={(e) => setRegisterPasswordConfirm(e)}
                />
              </Form>
              <Button
                theme="solid"
                className={styles.button}
                onClick={doRegister}
              >
                Register
              </Button>
              <Button
                theme={'outline'}
                className={styles.button}
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                Already have an account? Login
              </Button>
            </div>
          </Space>
        ) : (
          <Image
            preview={false}
            src={img_existing}
            // height={'100%'}
            width={'100%'}
          ></Image>
        )}
      </Space>

      <Modal
        title="Request a account"
        visible={showModal}
        closeOnEsc={true}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={<Button onClick={() => setShowModal(false)}>OK</Button>}
      >
        You can email&nbsp;
        <Text
          icon={<IconMailStroked1 />}
          link={{
            href: 'mailto:support@fccareer.top',
            target: '_blank',
          }}
        >
          support@fccareer.com
        </Text>
        &nbsp;to request a test account. Once I receive your email, I will
        manually send you your login information.
        <br />
        Feel free to visit our&nbsp;
        <Text
          icon={<IconGithubLogo />}
          link={{
            href: 'https://github.com/VeejaLiu/FIFA-Career-Dashboard-Frontend',
            target: '_blank',
          }}
          underline
        >
          GitHub page
        </Text>
        &nbsp;to share your suggestions, or join our&nbsp;
        <Text
          icon={<IconComment />}
          link={{
            href: 'https://discord.gg/aKfWAtbJ8F',
            target: '_blank',
          }}
          underline
        >
          Discord server
        </Text>
        &nbsp;to apply or discuss.
      </Modal>
    </Space>
  );
};

export default LoginPage;

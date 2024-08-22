import { Form, Button, Space, Notification } from '@douyinfe/semi-ui';
import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { UserApis } from '../../service/UserApis.ts';
import { IconLink } from '@douyinfe/semi-icons';
import { Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function doLogin() {
    const response = await UserApis.loginUser({
      username,
      password,
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

  return (
    <Space
      align={'center'}
      style={{
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
      }}
      vertical
    >
      <div className={styles.login}>
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
              field="input"
              placeholder="your username or email"
              style={{ width: '100%' }}
              fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
              onChange={(e) => setUsername(e)}
            />
            <Form.Input
              mode={'password'}
              label={{ text: 'Password' }}
              field="field1"
              placeholder="your password"
              style={{ width: '100%' }}
              fieldStyle={{ alignSelf: 'stretch', padding: 0 }}
              onChange={(e) => setPassword(e)}
            />
          </Form>
          <Button theme="solid" className={styles.button} onClick={doLogin}>
            Login
          </Button>
        </div>
      </div>

      <div
        style={{
          width: '500px',
        }}
      >
        <p>
          We are currently in a closed beta phase. If you are interested in
          participating, please email&nbsp;
          <Text
            icon={<IconLink />}
            link={{
              href: 'mailto:veejaliu@gmail.com',
              target: '_blank',
            }}
          >
            veejaliu@gmail.com
          </Text>
          &nbsp;to request a test account.
        </p>
        <p>
          Once I receive your email, I will manually send you your login
          information, which you can use to access the application.
          Additionally, feel free to visit our&nbsp;
          <Text
            icon={<IconLink />}
            link={{
              href: 'https://github.com/VeejaLiu/FIFA-Career-Dashboard-Frontend',
              target: '_blank',
            }}
            underline
          >
            GitHub page
          </Text>
          &nbsp;to share your suggestions. Thank you for your cooperation!
        </p>
        <p>
          Please note that while we do not plan to delete your data, we cannot
          guarantee its persistence due to potential unforeseen issues.
        </p>
        <p>
          Or join our&nbsp;
          <Text
            icon={<IconLink />}
            link={{
              href: 'https://discord.gg/aKfWAtbJ8F',
              target: '_blank',
            }}
            underline
          >
            Discord server
          </Text>
          &nbsp;to discuss the project and provide feedback.
        </p>
      </div>
    </Space>
  );
};

export default LoginPage;

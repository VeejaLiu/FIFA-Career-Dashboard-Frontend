import { Image, Space, Typography } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { IconGithubLogo, IconMailStroked1 } from '@douyinfe/semi-icons';
import img_starter from '../../assets/image/img_starter.webp';
import img_existing from '../../assets/image/img_existing.webp';
import { LoginComponent } from './LoginComponent.tsx';
import { RegisterComponent } from './RegisterComponent.tsx';

const { Text } = Typography;

export function getContactUs() {
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

  // const [showModal, setShowModal] = useState(false);

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
          <LoginComponent setIsLogin={setIsLogin} />
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
          <RegisterComponent setIsLogin={setIsLogin} />
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

import * as React from 'react';
import { useEffect } from 'react';
import { Button, Input, Popover, Space } from '@douyinfe/semi-ui';
import { UserApis } from '../service/UserApis.ts';
import { IconCopy, IconRefresh2 } from '@douyinfe/semi-icons';
import { Notification } from '@douyinfe/semi-ui';

function SettingsPage(): React.ReactElement {
  const [secretKey, setSecretKey] = React.useState('');

  const fetchSecretKey = async () => {
    await UserApis.getSecretKey().then((key) => {
      console.log(`[fetchSecretKey] key: ${key}`);
      setSecretKey(key);
    });
  };

  useEffect(() => {
    fetchSecretKey().then();
  }, []);

  async function doRefreshSecretKey() {
    await UserApis.doRefreshSecretKey().then((key) => {
      console.log(`[doRefreshSecretKey] key: ${key}`);
      setSecretKey(key);
    });
  }

  return (
    <Space vertical style={{ padding: '10px' }} align={'start'}>
      <h1>Settings</h1>
      <Space vertical align={'start'}>
        <Space>
          <Space style={{ width: 'auto' }}>Your Secret API Key:</Space>
          <Input
            // mode="password"
            disabled={true}
            // contentEditable="false"
            defaultValue={secretKey}
            value={secretKey}
          ></Input>
          <Popover
            showArrow
            position={'top'}
            content={<p>Click to copy your secret key.</p>}
          >
            <Button
              onClick={() => {
                navigator.clipboard.writeText(secretKey).then(
                  () => {
                    Notification.success({
                      title: 'Success',
                      content: 'Secret key copied to clipboard',
                      duration: 3,
                    });
                  },
                  (err) => {
                    Notification.error({
                      title: 'Error',
                      content:
                        'Failed to copy secret key to clipboard, please try again',
                      duration: 3,
                    });
                  },
                );
              }}
            >
              <IconCopy />
            </Button>
          </Popover>
          <Popover
            showArrow
            position={'top'}
            content={<p>Click to refresh your secret key.</p>}
          >
            <Button
              onClick={async () => {
                await doRefreshSecretKey();
              }}
            >
              <IconRefresh2 />
            </Button>
          </Popover>
        </Space>
        <Space>
          <span
            style={{
              color: 'red',
              fontSize: '12px',
              fontWeight: 'bold',
              marginTop: '5px',
              display: 'block',
            }}
          >
            Warning: Do not share your secret key with anyone!
          </span>
        </Space>
      </Space>

      <h1>Login</h1>
      <Space vertical align={'start'}>
        <Input placeholder="Username"></Input>
        <Input placeholder="Password"></Input>
        <Button>Login</Button>
      </Space>

      <h1>Register</h1>
      <Space vertical align={'start'}>
        <Input placeholder="Username"></Input>
        <Input placeholder="Email"></Input>
        <Input placeholder="Password" mode={'password'}></Input>
        <Button>Register</Button>
      </Space>
    </Space>
  );
}

export default SettingsPage;

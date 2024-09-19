import * as React from 'react';
import { useEffect } from 'react';
import { Button, Input, Popover, Space, Switch } from '@douyinfe/semi-ui';
import { UserApis } from '../../service/UserApis.ts';
import { IconCopy, IconRefresh2 } from '@douyinfe/semi-icons';
import { Notification } from '@douyinfe/semi-ui';

function SettingsPage(): React.ReactElement {
  const [secretKey, setSecretKey] = React.useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [userSetting, setUserSetting] = React.useState<any>(null);
  const [isUserSettingLoading, setIsUserSettingLoading] =
    React.useState<boolean>(true);

  async function fetchSecretKey() {
    const key = await UserApis.getSecretKey();
    console.log(`[fetchSecretKey] key: ${key}`);
    setSecretKey(key);
    setIsLoading(false);
  }

  async function fetchUserSetting() {
    const userSetting = await UserApis.getUserSetting();
    console.log(`[getUserSetting] userSetting: ${JSON.stringify(userSetting)}`);
    setUserSetting(userSetting);
    setIsUserSettingLoading(false);
  }

  useEffect(() => {
    fetchSecretKey().then();
    fetchUserSetting().then();
  }, []);

  async function doRefreshSecretKey() {
    setIsLoading(true);
    const key = await UserApis.doRefreshSecretKey();
    console.log(`[doRefreshSecretKey] key: ${key}`);
    setSecretKey(key);
    Notification.success({
      title: 'Success',
      content: 'Secret key refreshed',
      duration: 3,
    });
    setIsLoading(false);
  }

  return (
    <Space vertical style={{ padding: '10px' }} align={'start'}>
      <h1>Settings</h1>
      <Space
        vertical
        align={'start'}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #e8e8e8',
          borderRadius: '5px',
        }}
      >
        <h4>API Secret Key</h4>
        <Space>
          <Space style={{ width: '300px' }}>Secret API Key:</Space>
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
              disabled={isLoading}
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

      <Space
        vertical
        align={'start'}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #e8e8e8',
          borderRadius: '5px',
        }}
      >
        <h4>Notifications</h4>
        <Space>
          <Space style={{ width: '300px' }}>Enable Notifications</Space>
          <Switch
            checked={userSetting?.enableNotification}
            loading={isUserSettingLoading}
            onChange={(v, e) => console.log(v)}
            aria-label="a switch for demo"
          ></Switch>
        </Space>
        <Space>
          <Space style={{ width: '300px' }}>
            Player Overall/Potential Update
          </Space>
          <Switch
            checked={userSetting?.notificationItems?.PlayerUpdate_Overall}
            loading={isUserSettingLoading}
            onChange={(v, e) => console.log(v)}
            aria-label="a switch for demo"
          ></Switch>
        </Space>
        <Space>
          <Space style={{ width: '300px' }}>Player Skill Move Update</Space>
          <Switch
            checked={userSetting?.notificationItems?.PlayerUpdate_SkillMove}
            loading={isUserSettingLoading}
            onChange={(v, e) => console.log(v)}
            aria-label="a switch for demo"
          ></Switch>
        </Space>
        <Space>
          <Space style={{ width: '300px' }}>Player Weak Foot Update</Space>
          <Switch
            checked={userSetting?.notificationItems?.PlayerUpdate_WeakFoot}
            loading={isUserSettingLoading}
            onChange={(v, e) => console.log(v)}
            aria-label="a switch for demo"
          ></Switch>
        </Space>
      </Space>

      <h1>Logout</h1>
      <Button
        onClick={() => {
          UserApis.doLogout().then((result) => {
            if (result) {
              Notification.success({
                title: 'Success',
                content: 'Logged out successfully',
                duration: 3,
              });
              window.location.href = '/';
            } else {
              Notification.error({
                title: 'Error',
                content: 'Failed to logout, please try again',
                duration: 3,
              });
              return;
            }
          });
        }}
      >
        Click here to logout
      </Button>
    </Space>
  );
}

export default SettingsPage;

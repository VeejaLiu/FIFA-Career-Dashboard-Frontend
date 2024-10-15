import * as React from 'react';
import { useEffect } from 'react';
import {
  Button,
  Input,
  LocaleConsumer,
  Popover,
  Space,
  Switch,
} from '@douyinfe/semi-ui';
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
  async function updateUserSetting({
    category,
    subItem,
    value,
  }: {
    category: string;
    subItem?: string;
    value: boolean;
  }) {
    setIsUserSettingLoading(true);
    await UserApis.updateUserSetting({
      category,
      subItem: subItem,
      value,
    });
    fetchUserSetting().then();
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
    <LocaleConsumer componentName={'SettingsPage'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <Space
          vertical
          style={{
            width: '50vw',
            minWidth: '600px',
          }}
          align={'start'}
        >
          <h3>{localeData?.Settings}</h3>
          <Space
            vertical
            align={'start'}
            style={{
              width: '90%',
              padding: '10px',
              border: '1px solid #e8e8e8',
              borderRadius: '5px',
            }}
          >
            <h5>{localeData?.APISecretKey}</h5>
            <Space>
              <div style={{ width: '300px' }}>{localeData?.APISecretKey}:</div>
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
                content={<p>{localeData?.ClickToCopy}</p>}
              >
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    navigator.clipboard.writeText(secretKey).then(
                      () => {
                        Notification.success({
                          title: 'Success',
                          content: localeData?.CopySuccessMessage,
                          duration: 3,
                        });
                      },
                      (err) => {
                        Notification.error({
                          title: 'Error',
                          content: localeData?.FailedToCopyMessage,
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
                content={<p>{localeData?.ClickToRefresh}</p>}
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
                {localeData?.DoNotShareSecretKey}
              </span>
            </Space>
          </Space>

          <Space
            vertical
            align={'start'}
            style={{
              width: '90%',
              padding: '10px',
              border: '1px solid #e8e8e8',
              borderRadius: '5px',
            }}
          >
            <h5>Notifications</h5>
            <Space>
              <Space style={{ width: '300px' }}>
                {localeData?.EnableNotifications}
              </Space>
              <Switch
                checked={userSetting?.enableNotification}
                loading={isUserSettingLoading}
                onChange={(v, e) => {
                  console.log('[onChange] enableNotification:', v);
                  updateUserSetting({
                    category: 'enable_notification',
                    value: v,
                  }).then();
                }}
                aria-label="a switch for demo"
              ></Switch>
            </Space>
            <Space>
              <Space style={{ width: '300px' }}>
                {localeData?.PlayerOverallPotentialUpdate}
              </Space>
              <Switch
                checked={
                  userSetting?.enableNotification &&
                  userSetting?.notificationItems?.PlayerUpdate_Overall
                }
                loading={isUserSettingLoading}
                onChange={(v, e) => {
                  console.log('[onChange] PlayerUpdate_Overall:', v);
                  updateUserSetting({
                    category: 'notification_items',
                    subItem: 'PlayerUpdate.Overall',
                    value: v,
                  }).then();
                }}
                aria-label="a switch for demo"
              ></Switch>
            </Space>
            <Space>
              <Space style={{ width: '300px' }}>
                {localeData?.PlayerSkillMoveUpdate}
              </Space>
              <Switch
                checked={
                  userSetting?.enableNotification &&
                  userSetting?.notificationItems?.PlayerUpdate_SkillMove
                }
                loading={isUserSettingLoading}
                onChange={(v, e) => {
                  console.log('[onChange] PlayerUpdate_SkillMove:', v);
                  updateUserSetting({
                    category: 'notification_items',
                    subItem: 'PlayerUpdate.SkillMove',
                    value: v,
                  }).then();
                }}
                aria-label="a switch for demo"
              ></Switch>
            </Space>
            <Space>
              <Space style={{ width: '300px' }}>
                {localeData?.PlayerWeakFootUpdate}
              </Space>
              <Switch
                checked={
                  userSetting?.enableNotification &&
                  userSetting?.notificationItems?.PlayerUpdate_WeakFoot
                }
                loading={isUserSettingLoading}
                onChange={(v, e) => {
                  console.log('[onChange] PlayerUpdate_WeakFoot:', v);
                  updateUserSetting({
                    category: 'notification_items',
                    subItem: 'PlayerUpdate.WeakFoot',
                    value: v,
                  }).then();
                }}
                aria-label="a switch for demo"
              ></Switch>
            </Space>
          </Space>

          <h3
            style={{
              marginTop: '20px',
            }}
          >
            {localeData?.Logout}
          </h3>
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
            {localeData?.ClickToLogout}
          </Button>
        </Space>
      )}
    </LocaleConsumer>
  );
}

export default SettingsPage;

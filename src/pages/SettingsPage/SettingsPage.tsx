import * as React from 'react';
import { useEffect } from 'react';
import {
  Button,
  LocaleConsumer,
  Notification,
  Space,
  Switch,
} from '@douyinfe/semi-ui';
import { UserApis } from '../../service/UserApis.ts';
import ApiSecretKeyComponent from './ApiSecretKeyComponent.tsx';

function SettingsPage(): React.ReactElement {
  const [userSetting, setUserSetting] = React.useState<any>(null);
  const [isUserSettingLoading, setIsUserSettingLoading] =
    React.useState<boolean>(true);

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
    fetchUserSetting().then();
  }, []);

  return (
    <LocaleConsumer componentName={'SettingsPage'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <Space
          vertical
          style={{
            width: '50vw',
            minWidth: '600px',
            padding: '20px',
          }}
          align={'start'}
        >
          <ApiSecretKeyComponent localeData={localeData} />

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

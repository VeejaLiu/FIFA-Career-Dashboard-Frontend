import { Button, Input, Notification } from '@douyinfe/semi-ui';
import * as React from 'react';
import { UserApis } from '../../service/UserApis.ts';

export interface ApiSecretKeyComponentProps {
  localeData: any;
}

function ChangePasswordComponent({
  localeData,
}: ApiSecretKeyComponentProps): React.ReactElement {
  const [oldPassword, setOldPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmNewPassword, setCofirmNewPassword] = React.useState<string>('');

  const changePassword = async () => {
    console.log(`Old Password: ${oldPassword}`);
    console.log(`New Password: ${newPassword}`);
    console.log(`Confirm New Password: ${confirmNewPassword}`);

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Notification.error({
        title: 'Error',
        content: 'Please fill in all fields',
        duration: 3,
        position: 'top',
      });

      return;
    }
    if (newPassword !== confirmNewPassword) {
      // Show error message
      Notification.error({
        title: 'Error',
        content: 'New password and confirm password do not match',
        duration: 3,
        position: 'top',
      });
      return;
    }
    // Call API to change password
    await UserApis.changePassword({
      oldPassword,
      newPassword,
      confirmNewPassword,
    });
  };

  return (
    <div
      style={{
        marginTop: '10px',
        border: '1px solid #e8e8e8',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
        style={{
          display: 'flex',
          marginTop: '8px',
          alignItems: 'center',
        }}
      >
        <span style={{ width: '200px', fontWeight: 'bold' }}>
          {localeData.OldPassword}
        </span>
        <Input
          mode="password"
          autoComplete={'off'}
          onChange={(e: string) => setOldPassword(e)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '8px',
          alignItems: 'center',
        }}
      >
        <span style={{ width: '200px', fontWeight: 'bold' }}>
          {localeData.NewPassword}
        </span>
        <Input
          mode="password"
          autoComplete={'off'}
          onChange={(e: string) => setNewPassword(e)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '8px',
          alignItems: 'center',
        }}
      >
        <span style={{ width: '200px', fontWeight: 'bold' }}>
          {localeData.ConfirmNewPassword}
        </span>
        <Input
          mode="password"
          autoComplete={'off'}
          onChange={(e: string) => setCofirmNewPassword(e)}
        />
      </div>
      <div style={{ marginTop: '16px', margin: 'auto' }}>
        <Button style={{ marginTop: '10px' }} onClick={() => changePassword()}>
          {localeData.ChangePassword}
        </Button>
      </div>
    </div>
  );
}

export default ChangePasswordComponent;

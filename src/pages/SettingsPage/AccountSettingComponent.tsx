import { Space } from '@douyinfe/semi-ui';
import * as React from 'react';
import { useEffect } from 'react';
import ChangePasswordComponent from './ChangePassword.tsx';

export interface ApiSecretKeyComponentProps {
  localeData: any;
}

function AccountSettingComponent({
  localeData,
}: ApiSecretKeyComponentProps): React.ReactElement {
  const [showChangePassword, setShowChangePassword] =
    React.useState<boolean>(false);

  useEffect(() => {
    // fetchSecretKey().then();
  }, []);

  return (
    <>
      <h3 style={{ marginTop: '20px' }}>{localeData?.AccountInfo}</h3>

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
        {/* Account Info - Username */}
        <div style={{ display: 'flex' }}>
          <div style={{ width: '300px' }}>
            <h5>{localeData?.AccountUsername}</h5>
          </div>
          <span style={{ color: 'gray', fontWeight: 500 }}>Veeja Liu</span>
        </div>

        {/* Account Info - Email */}
        <div style={{ display: 'flex', marginTop: '8px' }}>
          <div style={{ width: '300px' }}>
            <h5>{localeData?.AccountEmail}</h5>
          </div>
          <span style={{ color: 'gray', fontWeight: 500 }}>
            veejaliu@gmail.com
          </span>
        </div>

        {/* Account Info - Change Password ---- START*/}
        <div>
          <div style={{ display: 'flex', marginTop: '8px' }}>
            <div style={{ width: '300px' }}>
              <h5>{localeData?.AccountChangePassword}</h5>
            </div>
            <span style={{ fontWeight: 200 }}>
              <a
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={() => setShowChangePassword(!showChangePassword)}
              >
                Click to Change
              </a>
            </span>
          </div>
          {showChangePassword && (
            <ChangePasswordComponent localeData={localeData} />
          )}
        </div>
        {/* Account Info - Change Password ---- END*/}
      </Space>
    </>
  );
}

export default AccountSettingComponent;

import * as React from 'react';
import { useEffect } from 'react';
import { Button, Input, Popover, Space, Toast } from '@douyinfe/semi-ui';
import { UserApis } from '../service/UserApis.ts';
import { IconCopy, IconRefresh2 } from '@douyinfe/semi-icons';

function SettingsPage(): React.ReactElement {
  const [secretKey, setSecretKey] = React.useState(
    'wqrqwerqwrqwrqwreqwrqwrqwrqwrxwww',
  );

  const fetchSecretKey = async () => {
    await UserApis.getSecretKey().then((key) => {
      setSecretKey(key);
    });
  };

  useEffect(() => {
    // fetchSecretKey().then();
  }, []);

  return (
    <Space vertical style={{ padding: '10px' }} align={'start'}>
      <h1>Settings</h1>

      <Space vertical align={'start'}>
        <Space>
          <Space style={{ width: 'auto' }}>Your Secret API Key:</Space>
          <Input
            mode="password"
            defaultValue=""
            value={secretKey}
            suffix={
              <Popover
                showArrow
                position={'top'}
                content={<p>Click to copy your secret key.</p>}
              >
                <IconCopy
                  onClick={() => {
                    navigator.clipboard.writeText(secretKey).then(
                      () => {
                        Toast.info('Secret key copied to clipboard');
                      },
                      (err) => {
                        Toast.error('Failed to copy secret key');
                      },
                    );
                  }}
                />
              </Popover>
            }
          ></Input>
          <Popover
            showArrow
            position={'top'}
            content={<p>Click to refresh your secret key.</p>}
          >
            <Button>
              <IconRefresh2 />
            </Button>
          </Popover>
        </Space>
        <Space
          style={
            {
              // backgroundColor: '#f5f5f5',
            }
          }
        >
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
    </Space>
  );
}

export default SettingsPage;

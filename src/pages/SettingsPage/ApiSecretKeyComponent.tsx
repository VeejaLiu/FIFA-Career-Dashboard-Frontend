import { Button, Input, Notification, Popover, Space } from '@douyinfe/semi-ui';
import { IconCopy, IconRefresh2 } from '@douyinfe/semi-icons';
import * as React from 'react';
import { UserApis } from '../../service/UserApis.ts';
import { useEffect } from 'react';

export interface ApiSecretKeyComponentProps {
  localeData: any;
}

function ApiSecretKeyComponent({
  localeData,
}: ApiSecretKeyComponentProps): React.ReactElement {
  const [secretKey, setSecretKey] = React.useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function fetchSecretKey() {
    const key = await UserApis.getSecretKey();
    console.log(`[fetchSecretKey] key: ${key}`);
    setSecretKey(key);
    setIsLoading(false);
  }

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

  useEffect(() => {
    fetchSecretKey().then();
  }, []);

  return (
    <>
      <h3>{localeData?.Settings}</h3>
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
    </>
  );
}

export default ApiSecretKeyComponent;

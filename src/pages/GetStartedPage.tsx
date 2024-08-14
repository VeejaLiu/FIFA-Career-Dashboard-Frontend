import * as React from 'react';
import { useEffect } from 'react';
import { Space } from '@douyinfe/semi-ui';
import { UserApis } from '../service/UserApis.ts';
import { Typography } from '@douyinfe/semi-ui';

const { Text, Paragraph } = Typography;

function SettingsPage(): React.ReactElement {
  const [secretKey, setSecretKey] = React.useState('');

  async function fetchSecretKey() {
    const key = await UserApis.getSecretKey();
    console.log(`[fetchSecretKey] key: ${key}`);
    setSecretKey(key);
  }

  useEffect(() => {
    fetchSecretKey().then();
  }, []);

  return (
    <Space vertical style={{ padding: '10px' }} align={'start'}>
      <h1>Get started</h1>
      <Paragraph>
        asdasfdasdf
        <Text mark>asdasfdasdf</Text>
        <Text code>{secretKey}</Text>
        asdasfdasdf
      </Paragraph>
    </Space>
  );
}

export default SettingsPage;

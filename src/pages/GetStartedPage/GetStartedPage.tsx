import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, CodeHighlight, Notification, Space } from '@douyinfe/semi-ui';
import { UserApis } from '../../service/UserApis.ts';
import { Typography } from '@douyinfe/semi-ui';
import { luaScript } from '../../constant/user-script.ts';

const { Title, Text, Paragraph } = Typography;

function SettingsPage(): React.ReactElement {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [codeStr, setCodeStr] = React.useState(luaScript);

  async function getLuaCode() {
    const key = await UserApis.getSecretKey();
    console.log(`[fetchSecretKey] key: ${key}`);
    setCodeStr(luaScript.replace('{{user-secret-key}}', key));
  }

  useEffect(() => {
    getLuaCode().then();
  }, []);

  return (
    <Space vertical style={{ padding: '10px' }} align={'start'}>
      <Paragraph>
        {/*<h1>Get started</h1>*/}
        <Title heading={1}>Get started</Title>

        {/*<h1>## Dependencies</h1>*/}
        <Title heading={2}>1. Dependencies</Title>
        <p>
          - Latest <b>xAranaktu/FC-24-Live-Editor</b>. (
          <Text
            link={{
              href: 'https://www.patreon.com/collection/96422?view=expanded',
            }}
          >
            Click here{' '}
          </Text>
          to download the latest version of Live Editor.)
        </p>

        <p>- Available internet connection to our backend server.</p>
        <p>
          - <b>Secret API key.</b> (You can manage it from
          <Text
            link={{
              href: '/settings',
            }}
          >
            &nbsp;Setting Page
          </Text>
          , BUT you don't really need it because I have put it in the code
          snippet below for you)
        </p>
        <p>
          - <b>Lua code snippet </b>(You can copy the code snippet below and the
          secret key will be automatically replaced)
        </p>

        {/*<h1>## Installation</h1>*/}
        <Title heading={2}>2. Installation</Title>
        <p>- Open the FC24 with Live Editor.</p>
        <p>- Go to the `Lua script` tab in the live editor.</p>
        <p>- Paste the code snippet below.</p>
      </Paragraph>
      <Space>
        <Button
          onClick={() => {
            navigator.clipboard
              .writeText(codeStr)
              .then((r) => {
                console.log('Copied');
                Notification.success({
                  position: 'topRight',
                  title: 'Success',
                  content: 'Copied to clipboard',
                  duration: 3,
                });
              })
              .catch((e) => {
                Notification.error({
                  position: 'topRight',
                  title: 'Error',
                  content: 'Failed to copy. Please manually copy the code.',
                  duration: 3,
                });
              });
          }}
        >
          Copy to clipboard
        </Button>

        <Button onClick={() => setIsCodeExpanded(!isCodeExpanded)}>
          {isCodeExpanded ? '↑↑↑ Hide all code' : '↓↓↓ Show all code'}
        </Button>
      </Space>

      <Text type="warning">
        Warning: These codes contain your secret key. Do not share these codes
        with others.
      </Text>
      <div
        style={{
          maxHeight: isCodeExpanded ? 'none' : '150px',
          overflow: 'scroll',
          transition: 'max-height 0.3s ease',
          border: '1px solid #ddd',
          padding: '10px',
          position: 'relative',
        }}
      >
        <CodeHighlight
          code={codeStr}
          language="JavaScript"
          className={'code-highlight'}
          defaultTheme={true}
          lineNumber={false}
          style={{}}
        ></CodeHighlight>
      </div>
    </Space>
  );
}

export default SettingsPage;

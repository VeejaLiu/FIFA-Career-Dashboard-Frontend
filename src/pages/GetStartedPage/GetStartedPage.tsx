import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  CodeHighlight,
  LocaleConsumer,
  MarkdownRender,
  Notification,
  Space,
} from '@douyinfe/semi-ui';
import { UserApis } from '../../service/UserApis.ts';
import { Typography } from '@douyinfe/semi-ui';
import { luaScript_FC24 } from '../../constant/user-script.ts';
import { luaScript_FC25 } from '../../constant/user-script.ts';
import { getDefaultGameVersion } from '../../common/common.ts';

const { Text } = Typography;
const PostPlayerURL =
  import.meta.env.VITE_POST_PLAYER_URL || 'http://localhost:8888';

function SettingsPage(): React.ReactElement {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [codeStr, setCodeStr] = React.useState(luaScript_FC24);
  const [isSecretLoading, setIsSecretLoading] = React.useState(true);

  async function getLuaCode() {
    const key = await UserApis.getSecretKey();
    const gameVersion = await getDefaultGameVersion();
    console.log(`[fetchSecretKey] key: ${key}`);
    console.log(`[fetchSecretKey] gameVersion: ${gameVersion}`);

    switch (gameVersion) {
      case 24:
        setCodeStr(
          luaScript_FC24
            .replace('{{user-secret-key}}', key)
            .replace('{{post-player-url}}', PostPlayerURL),
        );
        break;
      case 25:
        setCodeStr(
          luaScript_FC25
            .replace('{{user-secret-key}}', key)
            .replace('{{post-player-url}}', PostPlayerURL),
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getLuaCode().then(
      () => {
        setIsSecretLoading(false);
      },
      (e) => {
        Notification.error({
          title: 'Error',
          content: 'Failed to fetch secret key. Please try again later.',
          duration: 3,
        });
      },
    );
  }, []);

  return (
    <LocaleConsumer componentName={'GetStartedPage'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <Space
          vertical
          style={{
            padding: '0px 20px 100px',
            width: '95%',
          }}
          align={'start'}
        >
          <MarkdownRender raw={localeData.GET_STARTED_TEXT} />
          <Space>
            <Button
              disabled={isSecretLoading}
              onClick={() => {
                navigator.clipboard
                  .writeText(codeStr)
                  .then((r) => {
                    console.log('Copied');
                    Notification.success({
                      position: 'topRight',
                      title: localeData.SUCCESS,
                      content: localeData.SUCCESS_MESSAGE,
                      duration: 3,
                    });
                  })
                  .catch((e) => {
                    Notification.error({
                      position: 'topRight',
                      title: localeData.ERROR,
                      content: localeData.ERROR_MESSAGE,
                      duration: 3,
                    });
                  });
              }}
            >
              {localeData.COPY_TO_CLIPBOARD}
            </Button>

            <Button onClick={() => setIsCodeExpanded(!isCodeExpanded)}>
              {isCodeExpanded
                ? `↑↑↑ ${localeData.HIDE_ALL_CODE}`
                : `↓↓↓ ${localeData.SHOW_ALL_CODE}`}
            </Button>
          </Space>

          <Text type="warning">{localeData.CODE_NOT_SHARE_WARNING}</Text>

          <div
            style={{
              width: '100%',
              maxHeight: isCodeExpanded ? 'none' : '150px',
              overflow: 'scroll',
              transition: 'max-height 0.3s ease',
              border: '1px solid #ddd',
              padding: '10px',
              position: 'relative',
              marginBottom: '20px',
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

          <MarkdownRender raw={localeData.IMPORTANT_TIPS} />
        </Space>
      )}
    </LocaleConsumer>
  );
}

export default SettingsPage;

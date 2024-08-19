import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, CodeHighlight, Notification, Space } from '@douyinfe/semi-ui';
import { UserApis } from '../../service/UserApis.ts';
import { Typography } from '@douyinfe/semi-ui';
import { luaScript } from '../../constant/user-script.ts';
import { IconLink } from '@douyinfe/semi-icons';

const { Title, Text, Paragraph } = Typography;
const PostPlayerURL =
  import.meta.env.VITE_POST_PLAYER_URL || 'http://localhost:8888';

function SettingsPage(): React.ReactElement {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [codeStr, setCodeStr] = React.useState(luaScript);
  const [isSecretLoading, setIsSecretLoading] = React.useState(true);

  async function getLuaCode() {
    const key = await UserApis.getSecretKey();
    console.log(`[fetchSecretKey] key: ${key}`);
    setCodeStr(
      luaScript
        .replace('{{user-secret-key}}', key)
        .replace('{{post-player-url}}', PostPlayerURL),
    );
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
    <Space vertical style={{ padding: '10px', width: '95%' }} align={'start'}>
      <Paragraph>
        <Title heading={1}>Get started</Title>
      </Paragraph>

      <Paragraph spacing="extended">
        <Title heading={2}>1. Dependencies</Title>
        <p>
          - Latest <b>xAranaktu/FC-24-Live-Editor</b>. (
          <Text
            icon={<IconLink />}
            link={{
              href: 'https://www.patreon.com/collection/96422?view=expanded',
              target: '_blank',
            }}
            underline
          >
            Click here{' '}
          </Text>
          to download the latest version of Live Editor.)
        </p>

        <p>- Available internet connection to our backend server.</p>
        <p>
          - <b>Secret API key.</b> (You can manage it from &nbsp;
          <Text link={{ href: '/settings' }} underline>
            Setting Page
          </Text>
          &nbsp;, BUT you don't really need it because I have put it in the code
          snippet below for you)
        </p>
        <p>
          - <b>Lua code snippet </b>(You can copy the code snippet below and the
          secret key will be automatically replaced)
        </p>
      </Paragraph>

      <Paragraph spacing="extended">
        <Title heading={2}>2. Installation</Title>
        - Open the FC24 with Live Editor.
        <br />- Go to the <Text code>Lua script</Text> tab in the live editor.
        <br />- Paste the code snippet below.
      </Paragraph>

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

      <Title heading={1}>Important Notes && Tips</Title>
      <Paragraph
        style={{
          width: '80%',
          paddingLeft: '20px',
          marginBottom: '20px',
        }}
      >
        <br />
        <Title heading={3}>
          1. In-game Date Might Not Be Perfectly Accurate!
        </Title>
        <Paragraph
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          You might have noticed that we’re tracking player stat growth as the
          in-game time changes.
          <br />
          BUT here’s a little secret: it’s tricky for us to get the exact
          in-game date! We used to pull that data from the “career_table” you
          can find in the Live Editor under the Table tab. But after a certain
          game update, the data in that table isn’t accurate anymore.
          Interestingly, I found a pattern: the table is accurate when you first
          enter Career Mode or after you play a match. So, based on that, we had
          to create a manual time calculation method by listening to the
          DAY_PASSED event in the game and cross-referencing it with the data we
          can still get. It’s a bit clunky, and I had to add a bunch of
          redundant code to make it work. But for now, that’s our only option.
          So, when using this script, don’t rely too heavily on the in-game
          date, as it might not be spot-on.
          <br />
          And please, run this script immediately after entering Career Mode to
          get the most accurate data possible. Otherwise, the data will only
          become accurate after you play a match.
          <br />
          <Text type="success" style={{ fontWeight: 'bold' }}>
            Our Tip: Run this script right after entering Career Mode!
          </Text>
        </Paragraph>

        <Title heading={3}>
          2. The Annoying Black Window! It might steal your focus.
        </Title>
        <Paragraph
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          Let me explain how this works. Our application relies on the functions
          provided by Live Editor. Whenever the WEEK_PASSED event is triggered
          in the game, our Lua script runs, collecting data from all your
          current team players and sending it to our server. But here’s the
          catch: Live Editor doesn’t offer a way to send API requests directly
          to an external server, so we’re using Windows’ Curl command to do
          that. Unfortunately, every time we run that command, a black window
          pops up because we’re executing Curl in the Windows system. And
          sometimes, this black window might steal focus from your game, which
          is a bummer. It doesn’t happen every time, but it’s possible. It’s far
          from perfect, but it’s the best we can do right now. I’m sorry about
          this inconvenience, but I’m constantly searching for a better
          solution. So, while using this application, please don’t close that
          black window—it’s busy sending the API request. If your network isn’t
          too slow, the window should disappear quickly. In my experience, it’s
          bearable since the black window only pops up once per in-game week.
          And hey, it’s a small price to pay for keeping track of your players’
          progress, right? Rest assured, I’m on the lookout for a better
          solution, and I’ll update the application as soon as we find one.
          Thanks for your understanding!
        </Paragraph>

        <Title heading={3}>3. Only One Save Slot Supported!</Title>
        <Paragraph
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          During the closed beta, we’re only supporting one save slot. This is
          because our server resources are limited, and we can’t provide a
          separate save for every single user. Plus, I doubt anyone is switching
          save files back and forth that often, so I think this limitation is
          fair. In the future, we might offer more save slots, but who knows?
          The future is full of surprises!
        </Paragraph>
      </Paragraph>
    </Space>
  );
}

export default SettingsPage;

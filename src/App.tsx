import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Dropdown, Nav, Space } from '@douyinfe/semi-ui';
import './App.css';
import { useEffect, useState } from 'react';
import { PlayerApis } from './service/PlayerApis.ts';
import PlayerListPage from './pages/PlayerListPage/PlayerListPage.tsx';
import PlayerTrendsPage from './pages/PlayerTrendsPage/PlayerTrendsPage.tsx';
import SettingsPage from './pages/SettingsPage/SettingsPage.tsx';
import {
  IconArticle,
  IconHistogram,
  IconIdCard,
  IconRefresh,
  IconSetting,
  IconUser,
} from '@douyinfe/semi-icons';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage.tsx';
import { WebsocketNotification } from './components/WebsocketNotification.tsx';
import PlayerDetailPage from './pages/PlayerDetailPage/PlayerDetailPage.tsx';
import { UserApis } from './service/UserApis.ts';
import fc24Logo from '../public/fc24-logo.svg';
import fc25Logo from '../public/fc25-logo.png';
import * as React from 'react';
import {
  getDefaultGameVersion,
  removeDefaultGameVersion,
} from './common/common.ts';

function getLogoByVersion(defaultVersion: number) {
  switch (defaultVersion) {
    case 24:
      return <img src={fc24Logo} width={'100px'} alt={'FC 24 Logo'} />;
    case 25:
      return <img src={fc25Logo} width={'100px'} alt={'FC 25 Logo'} />;
    default:
      return <h4>No version chosen</h4>;
  }
}

function WebsiteLogoComponent() {
  const [defaultGameVersion, setDefaultGameVersion] = React.useState<number>(0);

  const fetchDefaultGameVersion = async () => {
    const gameVersion = await getDefaultGameVersion();
    setDefaultGameVersion(gameVersion);
  };

  useEffect(() => {
    fetchDefaultGameVersion().then();
  }, []);

  return (
    <Space
      style={{
        padding: '1rem',
        backgroundColor: 'black',
        color: '#FFFFFF',
        // borderRadius: '1rem',
      }}
    >
      <p>{getLogoByVersion(defaultGameVersion)}</p>
      <p
        style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        Career Dashboard
      </p>

      <Dropdown
        trigger={'click'}
        position={'bottom'}
        render={
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={async () => {
                console.log('Switch to FC 24');
                removeDefaultGameVersion();
                await UserApis.updateUserSetting({
                  category: 'default_game_version',
                  value: 24,
                });
                // Refresh the page to apply the new version
                window.location.reload();
              }}
            >
              FC 24
            </Dropdown.Item>
            <Dropdown.Item
              onClick={async () => {
                console.log('FC 25');
                removeDefaultGameVersion();
                await UserApis.updateUserSetting({
                  category: 'default_game_version',
                  value: 25,
                });
                // Refresh the page to apply the new version
                window.location.reload();
              }}
            >
              FC 25
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <IconRefresh />
      </Dropdown>
    </Space>
  );
}

export default function App() {
  const [playerCount, setPlayerCount] = useState(0);

  const fetchPlayerCount = async () => {
    const count = await PlayerApis.getPlayerCount();
    setPlayerCount(count);
  };

  useEffect(() => {
    fetchPlayerCount().then();
  }, []);

  return (
    <>
      <WebsocketNotification />
      <Routes>
        <Route
          path="/"
          element={
            <Space vertical className="root">
              {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

              <Nav
                className="nav"
                header={<WebsiteLogoComponent />}
                mode="horizontal"
                renderWrapper={({
                  itemElement,
                  isSubNav,
                  isInSubNav,
                  props,
                }) => {
                  const routerMap: Record<string, string> = {
                    Players: '/players',
                    PlayerDetail: '/players-detail',
                    PlayersTrends: '/players-trends',
                    Settings: '/settings',
                    GetStarted: '/get-started',
                  };
                  return (
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={routerMap[props.itemKey || '']}
                    >
                      {itemElement}
                    </Link>
                  );
                }}
                items={[
                  {
                    text: `Players (${playerCount})`,
                    itemKey: 'Players',
                    icon: <IconUser />,
                  },
                  {
                    text: 'Player Detail',
                    itemKey: 'PlayerDetail',
                    icon: <IconIdCard />,
                  },
                  {
                    text: 'Players Trends',
                    itemKey: 'PlayersTrends',
                    icon: <IconHistogram />,
                  },
                  {
                    text: 'Settings',
                    itemKey: 'Settings',
                    icon: <IconSetting />,
                  },
                  {
                    text: 'Get Started',
                    itemKey: 'GetStarted',
                    icon: <IconArticle />,
                  },
                ]}
                footer={{
                  collapseButton: true,
                }}
              ></Nav>
              <div className={'content'}>
                <Outlet />
              </div>
            </Space>
          }
        >
          <Route index element={<PlayerListPage />} />
          <Route path="players" element={<PlayerListPage />} />
          <Route path="players-trends" element={<PlayerTrendsPage />} />
          <Route path="players-detail" element={<PlayerDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="get-started" element={<GetStartedPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

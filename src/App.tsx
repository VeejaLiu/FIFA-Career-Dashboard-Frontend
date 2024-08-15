import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Nav, Space } from '@douyinfe/semi-ui';
import './App.css';
import { useEffect, useState } from 'react';
import { PlayerApis } from './service/PlayerApis.ts';
import PlayerListPage from './pages/PlayerListPage/PlayerListPage.tsx';
import PlayerTrendsPage from './pages/PlayerTrendsPage/PlayerTrendsPage.tsx';
import SettingsPage from './pages/SettingsPage/SettingsPage.tsx';
import {
  IconArticle,
  IconHistogram,
  IconSetting,
  IconUser,
} from '@douyinfe/semi-icons';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage.tsx';

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
    <Routes>
      <Route
        path="/"
        element={
          <Space className="root">
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

            <Nav
              className="nav"
              header={{
                text: 'FC24 Career Mode',
              }}
              renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                const routerMap: Record<string, string> = {
                  Players: '/players',
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
        <Route path="settings" element={<SettingsPage />} />
        <Route path="get-started" element={<GetStartedPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

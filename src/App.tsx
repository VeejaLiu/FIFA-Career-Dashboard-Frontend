import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { Nav, Space } from '@douyinfe/semi-ui';
import './App.css';
import PlayerListPage from './pages/PlayerListPage.tsx';
import { useEffect, useState } from 'react';
import { PlayerApis } from './service/PlayerApis.ts';
import PlayerTrendsPage from './pages/PlayerTrendsPage.tsx';
import { IconMember } from '@douyinfe/semi-icons';
import { IconChangelog } from '@douyinfe/semi-icons-lab';

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
                const routerMap = {
                  Players: '/players',
                  PlayersTrends: '/players-trends',
                };
                return (
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={routerMap[props.itemKey]}
                  >
                    {itemElement}
                  </Link>
                );
              }}
              items={[
                {
                  text: `Players (${playerCount})`,
                  itemKey: 'Players',
                  icon: <IconMember />,
                },
                {
                  text: 'Players Trends',
                  itemKey: 'PlayersTrends',
                  icon: <IconChangelog />,
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

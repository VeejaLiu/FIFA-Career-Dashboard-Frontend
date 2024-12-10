import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  LocaleConsumer,
  Nav,
  Notification,
  Popover,
  Space,
  Tooltip,
} from '@douyinfe/semi-ui';
import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { PlayerApis } from './service/PlayerApis.ts';
import PlayerListPage from './pages/PlayerListPage/PlayerListPage.tsx';
import PlayerTrendsPage from './pages/PlayerTrendsPage/PlayerTrendsPage.tsx';
import SettingsPage from './pages/SettingsPage/SettingsPage.tsx';
import {
  IconArticle,
  IconBell,
  IconBranch,
  IconExit,
  IconGithubLogo,
  IconHistogram,
  IconIdCard,
  IconLanguage,
  IconSetting,
  IconUser,
} from '@douyinfe/semi-icons';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage.tsx';
import { WebsocketNotification } from './components/WebsocketNotification.tsx';
import PlayerDetailPage from './pages/PlayerDetailPage/PlayerDetailPage.tsx';
import { UserApis } from './service/UserApis.ts';
import fc24Logo from '../public/fc24-logo.svg';
import fc25Logo from '../public/fc25-logo.png';
import {
  getDefaultGameVersion,
  removeDefaultGameVersion,
} from './common/common.ts';
import { LANGUAGE_LOCAL_STORAGE_KEY } from './components/Auth.tsx';
import { NotificationPopover } from './components/NotificationPopover.tsx';
import { NotificationApis } from './service/NotificationApis.ts';

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
    <LocaleConsumer componentName={'WebsiteLogoComponent'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <Space
          style={{
            padding: '1rem',
            backgroundColor: '#151616',
            color: '#FFFFFF',
          }}
        >
          <p>{getLogoByVersion(defaultGameVersion)}</p>
          <p
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {localeData.title}
          </p>

          <Dropdown
            trigger={'click'}
            position={'bottom'}
            render={
              <Dropdown.Menu>
                <Dropdown.Item disabled={true}>
                  {localeData.switchVersion}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={async () => {
                    // console.log('Switch to FC 24');
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
                  <span>
                    <b>
                      {defaultGameVersion === 24
                        ? ` (${localeData.current})`
                        : ''}
                    </b>
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={async () => {
                    // console.log('FC 25');
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
                  <span>
                    <b>
                      {defaultGameVersion === 25
                        ? ` (${localeData.current})`
                        : ''}
                    </b>
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconBranch
              size={'extra-large'}
              style={{ cursor: 'pointer', color: '#94f17a' }}
            />
          </Dropdown>
        </Space>
      )}
    </LocaleConsumer>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(0);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const fetchPlayerCount = async () => {
    const count = await PlayerApis.getPlayerCount();
    setPlayerCount(count);
  };

  const fetchUnreadNotificationCount = async () => {
    const count = await NotificationApis.getUnreadNotificationsCount();
    setUnreadNotificationCount(count);
  };

  const fetchUsername = async () => {
    const userInfo = await UserApis.getUserInfo();
    setUserInfo(userInfo);
  };

  const doLogout = async () => {
    UserApis.doLogout().then((result) => {
      if (result) {
        Notification.success({
          title: 'Success',
          content: 'Logged out successfully',
          duration: 3,
        });
        window.location.href = '/';
      } else {
        Notification.error({
          title: 'Error',
          content: 'Failed to logout, please try again',
          duration: 3,
        });
        return;
      }
    });
  };

  useEffect(() => {
    fetchPlayerCount().then();
    fetchUsername().then();
    fetchUnreadNotificationCount().then();
  }, []);

  return (
    <LocaleConsumer componentName={'Navbar'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
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
                        text: `${localeData.PlayersList} (${playerCount})`,
                        itemKey: 'Players',
                        icon: <IconUser />,
                      },
                      {
                        text: localeData.PlayerDetail,
                        itemKey: 'PlayerDetail',
                        icon: <IconIdCard />,
                      },
                      {
                        text: localeData.PlayersTrends,
                        itemKey: 'PlayersTrends',
                        icon: <IconHistogram />,
                      },
                      {
                        text: localeData.GetStarted,
                        itemKey: 'GetStarted',
                        icon: <IconArticle />,
                      },
                    ]}
                    footer={
                      <div
                        style={{
                          // height: '50px
                          // backgroundColor: 'greenyellow',
                          alignItems: 'center',
                          justifyContent: 'center',
                          display: 'flex',
                        }}
                      >
                        <Tooltip
                          content={localeData.VisitGithub}
                          position={'bottom'}
                        >
                          <Button
                            theme="borderless"
                            icon={<IconGithubLogo size="extra-large" />}
                            style={{
                              color: 'var(--semi-color-text-2)',
                              marginRight: '12px',
                            }}
                            onClick={() => {
                              window.open(
                                'https://github.com/VeejaLiu/FIFA-Career-Dashboard-Frontend',
                              );
                            }}
                          />
                        </Tooltip>
                        <Tooltip
                          content={localeData.SwitchLanguage}
                          position={'bottom'}
                        >
                          <Button
                            theme="borderless"
                            icon={<IconLanguage size="extra-large" />}
                            style={{
                              color: 'var(--semi-color-text-2)',
                              marginRight: '12px',
                            }}
                            onClick={() => {
                              // localStorage.setItem('locale', 'zh_CN');
                              // const SUPPORTED_LANGUAGES: any = {
                              //   en: { ...en_GB, ...customen_GB },
                              //   en_GB: { ...en_GB, ...customen_GB },
                              //   en_US: { ...en_GB, ...customen_GB },
                              //
                              //   zh: { ...zh_CN, ...customzh_CN },
                              //   zh_CN: { ...zh_CN, ...customzh_CN },
                              // };
                              const currentLuaguage = localStorage.getItem(
                                LANGUAGE_LOCAL_STORAGE_KEY,
                              );
                              switch (currentLuaguage) {
                                case 'en':
                                case 'en_GB':
                                case 'en_US':
                                  localStorage.setItem(
                                    LANGUAGE_LOCAL_STORAGE_KEY,
                                    'zh',
                                  );
                                  break;
                                case 'zh':
                                case 'zh_CN':
                                  localStorage.setItem(
                                    LANGUAGE_LOCAL_STORAGE_KEY,
                                    'en',
                                  );
                                  break;
                                default:
                                  break;
                              }
                              window.location.reload();
                            }}
                          />
                        </Tooltip>
                        <Popover
                          style={{
                            width: '440px',
                            maxHeight: '90vh',
                          }}
                          position={'bottomRight'}
                          content={
                            <NotificationPopover
                              updateUnreadCount={fetchUnreadNotificationCount}
                            />
                          }
                          trigger="click"
                        >
                          <Button
                            theme="borderless"
                            icon={<IconBell size="extra-large" />}
                          >
                            {unreadNotificationCount > 0 && (
                              <Badge
                                count={unreadNotificationCount}
                                theme="solid"
                                style={{
                                  position: 'absolute',
                                  backgroundColor: 'red',
                                  top: '-25px',
                                  right: '-10px',
                                }}
                              ></Badge>
                            )}
                          </Button>
                        </Popover>
                        <Dropdown
                          position="bottomRight"
                          trigger={'click'}
                          render={
                            <Dropdown.Menu>
                              <Dropdown.Item disabled={true}>
                                {localeData.Hello}
                                {userInfo?.username || 'Guest'}
                              </Dropdown.Item>

                              <Dropdown.Divider />

                              <Dropdown.Item
                                icon={<IconSetting />}
                                onClick={() => {
                                  navigate('/settings');
                                }}
                              >
                                {localeData.Settings}
                              </Dropdown.Item>

                              <Dropdown.Item
                                icon={<IconExit />}
                                onClick={doLogout}
                              >
                                {localeData.Logout}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          }
                        >
                          <Avatar
                            size="small"
                            color="light-blue"
                            style={{ marginRight: '12px' }}
                          >
                            {userInfo?.username?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        </Dropdown>
                      </div>
                    }
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
      )}
    </LocaleConsumer>
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

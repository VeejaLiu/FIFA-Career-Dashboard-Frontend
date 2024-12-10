import { LocaleConsumer, Switch, Tooltip } from '@douyinfe/semi-ui';
import { IconCheckChoiceStroked } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import {
  NotificationApis,
  NotificationBody,
} from '../service/NotificationApis.ts';
import { getAvatarUrl, getColorByDiff } from '../common/player-helper.ts';

function getNotificationContent(notification: NotificationBody) {
  switch (notification.message_type) {
    case 'PlayerUpdate': {
      switch (notification.message_subtype) {
        case 'PlayerUpdate.SkillMove':
          return (
            <div>
              <span>Skill move</span>
              <span>{notification.old_skillmoves}</span>
              <span>{'->'}</span>
              <span
                style={{
                  color: getColorByDiff(
                    (notification?.skillmoves || 0) -
                      (notification?.old_skillmoves || 0),
                  ),
                }}
              >
                {notification.skillmoves}
              </span>
            </div>
          );
        case 'PlayerUpdate.WeakFoot':
          return (
            <div>
              <span>Weak foot</span>
              <span>{notification.old_weakfoot}</span>
              <span>{'->'}</span>
              <span
                style={{
                  color: getColorByDiff(
                    (notification?.weakfoot || 0) -
                      (notification?.old_weakfoot || 0),
                  ),
                }}
              >
                {notification.weakfoot}
              </span>
            </div>
          );
        case 'PlayerUpdate.Overall':
          return (
            <div>
              <p>
                <span>Overall:</span>
                <span>{notification.old_overall_rating}</span>
                <span> {'->'} </span>
                <span
                  style={{
                    color: getColorByDiff(
                      (notification?.overall_rating || 0) -
                        (notification?.old_overall_rating || 0),
                    ),
                  }}
                >
                  {notification.overall_rating}
                </span>
              </p>

              <p>
                <span>Potential:</span>
                <span>{notification.old_potential}</span>
                <span> {'->'} </span>
                <span
                  style={{
                    color: getColorByDiff(
                      (notification?.potential || 0) -
                        (notification?.old_potential || 0),
                    ),
                  }}
                >
                  {notification.potential}
                </span>
              </p>
            </div>
          );
        default:
          return (
            <div>Unknown message type: {notification.message_subtype}</div>
          );
      }
    }
    default:
      return <div>Unknown message type: {notification.message_type}</div>;
  }
}

function getNotificationItem(notification: NotificationBody) {
  return (
    <>
      <p>In game date: {notification.in_game_date}</p>
      <p>
        <img
          width={50}
          src={getAvatarUrl(notification.player_id)}
          alt={''}
        ></img>
      </p>
      {getNotificationContent(notification)}
    </>
  );
}

export const NotificationPopover = () => {
  const [notificationList, setNotificationList] = useState<NotificationBody[]>(
    [],
  );

  const fetchNotificationList = async () => {
    const notificationList = await NotificationApis.getAllNotifications();
    console.log('[fetchNotificationList] notificationList:', notificationList);
    setNotificationList(notificationList);
  };

  useEffect(() => {
    fetchNotificationList();
  }, []);

  return (
    <LocaleConsumer componentName={'NotificationPopover'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <div
          style={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header ---- Start */}
          <div
            style={{
              padding: '20px',
              display: 'flex',
              borderBottom: '2px solid #f0f0f0',
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.7rem',
              }}
            >
              {localeData.Title}
            </span>
            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>{localeData.OnlyShowUnread}</span>
              <Switch
                style={{ marginLeft: '5px' }}
                checkedText={localeData.SwitchOn}
                uncheckedText={localeData.SwitchOff}
              />
              <Tooltip content={localeData.MarkAllAsRead} position={'top'}>
                <IconCheckChoiceStroked
                  onClick={() => {
                    console.log('click');
                    NotificationApis.markAllAsRead();
                  }}
                  style={{
                    marginLeft: '20px',
                    cursor: 'pointer',
                    color: '#333',
                  }}
                  size={'large'}
                />
              </Tooltip>
            </div>
          </div>
          {/* Header ---- End */}

          {/* Content ---- Start */}
          <div
            style={{
              flexGrow: 1,
              overflowY: 'auto',
            }}
          >
            {notificationList.map((notification: any, index: number) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  borderBottom: '1px solid #f0f0f0',
                  fontWeight: notification.is_read ? 'normal' : 'bold',
                }}
                onClick={() => {
                  // If click on notification, mark it as read
                  if (!notification.is_read) {
                    NotificationApis.markAsRead(notification.id);
                  }
                }}
              >
                {getNotificationItem(notification)}
              </div>
            ))}
          </div>

          {/* Content ---- End */}
        </div>
      )}
    </LocaleConsumer>
  );
};

import { LocaleConsumer, Switch, Tooltip } from '@douyinfe/semi-ui';
import { IconCheckChoiceStroked } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import {
  NotificationApis,
  NotificationBody,
} from '../service/NotificationApis.ts';

function getNotificationContent(notification: NotificationBody) {
  switch (notification.message_type) {
    case 'PlayerUpdate': {
      switch (notification.message_subtype) {
        case 'PlayerUpdate.SkillMove':
          return (
            <div>
              <p>Old skill moves: {notification.old_skillmoves}</p>
              <p>New skill moves: {notification.skillmoves}</p>
            </div>
          );
        case 'PlayerUpdate.WeakFoot':
          return (
            <div>
              <p>Old weak foot: {notification.old_weakfoot}</p>
              <p>New weak foot: {notification.weakfoot}</p>
            </div>
          );
        case 'PlayerUpdate.OverallRating':
          return (
            <div>
              <p>Old overall rating: {notification.old_overall_rating}</p>
              <p>New overall rating: {notification.overall_rating}</p>
            </div>
          );
        case 'PlayerUpdate.Potential':
          return (
            <div>
              <p>Old potential: {notification.old_potential}</p>
              <p>New potential: {notification.potential}</p>
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
                // size={'large'}
                style={{ marginLeft: '5px' }}
                checkedText={localeData.SwitchOn}
                uncheckedText={localeData.SwitchOff}
              />
              <Tooltip content={localeData.MarkAllAsRead} position={'top'}>
                <IconCheckChoiceStroked
                  onClick={() => {
                    console.log('click');
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
              flexGrow: 1, // 占据剩余所有的空间
              overflowY: 'auto', // 内容上下滚动
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
              >
                <p>Game version: {notification.game_version}</p>
                <p>In game date: {notification.in_game_date}</p>
                <p>Player ID: {notification.player_id}</p>
                {getNotificationContent(notification)}
              </div>
            ))}
          </div>

          {/* Content ---- End */}
        </div>
      )}
    </LocaleConsumer>
  );
};

import { LocaleConsumer, Switch, Tooltip } from '@douyinfe/semi-ui';
import { IconCheckChoiceStroked } from '@douyinfe/semi-icons';
import { useEffect, useState } from 'react';
import {
  NotificationApis,
  NotificationBody,
} from '../service/NotificationApis.ts';
import { getAvatarUrl, getColorByDiff } from '../common/player-helper.ts';
import './NotificationPopover.css';

function getNotificationContent(
  notification: NotificationBody,
  localeData: any,
) {
  switch (notification.message_type) {
    case 'PlayerUpdate': {
      switch (notification.message_subtype) {
        case 'PlayerUpdate.SkillMove':
          return (
            <div className="notification-content">
              <div className="notification-label">Skill move</div>
              <div className="notification-values">
                <div className="notification-value">
                  {notification.old_skillmoves}
                </div>
                <div className="notification-arrow">{'->'}</div>
                <div
                  className="notification-value"
                  style={{
                    color: getColorByDiff(
                      (notification?.skillmoves || 0) -
                        (notification?.old_skillmoves || 0),
                    ),
                  }}
                >
                  {notification.skillmoves}
                </div>
              </div>
            </div>
          );
        case 'PlayerUpdate.WeakFoot':
          return (
            <div className="notification-content">
              <div className="notification-label">Weak foot</div>
              <div className="notification-values">
                <div className="notification-value">
                  {notification.old_weakfoot}
                </div>
                <div className="notification-arrow">{'->'}</div>
                <div
                  className="notification-value"
                  style={{
                    color: getColorByDiff(
                      (notification?.weakfoot || 0) -
                        (notification?.old_weakfoot || 0),
                    ),
                  }}
                >
                  {notification.weakfoot}
                </div>
              </div>
            </div>
          );
        case 'PlayerUpdate.Overall':
          return (
            <div>
              <div className="notification-content">
                <div className="notification-label">Overall</div>
                <div className="notification-values">
                  <div className="notification-value">
                    {notification.old_overall_rating}
                  </div>
                  <div className="notification-arrow"> {'->'} </div>
                  <div
                    className="notification-value"
                    style={{
                      color: getColorByDiff(
                        (notification?.overall_rating || 0) -
                          (notification?.old_overall_rating || 0),
                      ),
                    }}
                  >
                    {notification.overall_rating}
                  </div>
                </div>
              </div>

              <div className="notification-content">
                <div className="notification-label">Potential</div>
                <div className="notification-values">
                  <div className="notification-value">
                    {notification.old_potential}
                  </div>
                  <div className="notification-arrow"> {'->'} </div>
                  <div
                    className="notification-value"
                    style={{
                      color: getColorByDiff(
                        (notification?.potential || 0) -
                          (notification?.old_potential || 0),
                      ),
                    }}
                  >
                    {notification.potential}
                  </div>
                </div>
              </div>
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

function getNotificationItem(notification: NotificationBody, localeData: any) {
  return (
    <div style={{ display: 'flex' }}>
      <img
        width={50}
        height={50}
        style={{
          borderRadius: '50%',
          border: '2px solid #FFF',
          marginRight: '10px',
        }}
        src={getAvatarUrl(notification.player_id)}
        alt={`Player avatar for player ${notification.player_name}`}
      ></img>
      <div>
        <div
          style={{
            marginBottom: '5px',
          }}
        >
          In game date
          <span
            style={{
              color: '#626f86',
              marginLeft: '10px',
              fontWeight: 'normal',
            }}
          >
            {notification.in_game_date}
          </span>
        </div>
        {getNotificationContent(notification, localeData)}
      </div>

      <div
        style={{
          marginLeft: 'auto',
          fontWeight: 'normal',
        }}
      >
        <a
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {notification.is_read ? '' : 'Mark as read'}
        </a>

        {!notification.is_read && (
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'red',
              marginTop: '30px',
              marginLeft: 'auto',
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

interface NotificationPopoverProps {
  updateUnreadCount: () => void;
}

export const NotificationPopover = ({
  updateUnreadCount,
}: NotificationPopoverProps) => {
  const [notificationList, setNotificationList] = useState<NotificationBody[]>(
    [],
  );
  const [onlyShowUnread, setOnlyShowUnread] = useState(false);

  const fetchNotificationList = async () => {
    const notificationList = await NotificationApis.getAllNotifications();
    console.log('[fetchNotificationList] notificationList:', notificationList);
    setNotificationList(notificationList);
    updateUnreadCount();
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
                checked={onlyShowUnread}
                onChange={(checked) => setOnlyShowUnread(checked)}
                checkedText={localeData.SwitchOn}
                uncheckedText={localeData.SwitchOff}
              />
              <Tooltip content={localeData.MarkAllAsRead} position={'top'}>
                <IconCheckChoiceStroked
                  onClick={() => {
                    console.log('click');
                    NotificationApis.markAllAsRead().then(() => {
                      fetchNotificationList();
                    });
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
              paddingBottom: '20px',
            }}
          >
            {notificationList
              .filter(
                (notification) => !onlyShowUnread || !notification.is_read,
              )
              .map((notification: any, index: number) => (
                <div
                  className={'notification-item'}
                  key={index}
                  style={{
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '15px',
                    fontWeight: notification.is_read ? 'normal' : 'bold',
                    backgroundColor: notification.is_read
                      ? 'transparent'
                      : '#f0f0f0',
                  }}
                  onClick={() => {
                    // If click on notification, mark it as read
                    if (!notification.is_read) {
                      NotificationApis.markAsRead(notification.id).then(() => {
                        fetchNotificationList();
                      });
                    }
                  }}
                >
                  {getNotificationItem(notification, localeData)}
                </div>
              ))}
          </div>

          {/* Content ---- End */}
        </div>
      )}
    </LocaleConsumer>
  );
};

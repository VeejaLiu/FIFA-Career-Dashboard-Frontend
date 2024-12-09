import { LocaleConsumer } from '@douyinfe/semi-ui';

export const NotificationPopover = () => {
  return (
    <LocaleConsumer componentName={'LoginComponent'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <div
          style={{
            width: '100%',
            height: '100%',
            fontStyle: 'inherit',
          }}
        >
          <div
            style={{
              padding: '20px',
              backgroundColor: 'indianred',
              display: 'flex',
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>
              Notifications
            </span>
            <span
              style={{
                marginLeft: 'auto',
                // fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              only show unread
            </span>
            <span
              style={{
                // fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Mark all as read
            </span>
          </div>
        </div>
      )}
    </LocaleConsumer>
  );
};

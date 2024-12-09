import { LocaleConsumer, Switch, Tooltip } from '@douyinfe/semi-ui';
import { IconTickCircle } from '@douyinfe/semi-icons';

export const NotificationPopover = () => {
  return (
    <LocaleConsumer componentName={'NotificationPopover'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              padding: '20px',
              display: 'flex',
              // backgroundColor: '#06a457',
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
                <IconTickCircle
                  onClick={() => {
                    console.log('click');
                  }}
                  style={{
                    marginLeft: '20px',
                    cursor: 'pointer',
                  }}
                  size={'large'}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </LocaleConsumer>
  );
};

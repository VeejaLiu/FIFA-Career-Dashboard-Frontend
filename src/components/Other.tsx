import { LocaleConsumer, Spin, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

/**
 * No data component
 *
 * @constructor
 */
export function NoDataComponent() {
  return (
    <LocaleConsumer componentName={'NoDataComponent'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          {localeData.prefix}
          <Text
            link={{ href: '/get-started' }}
            style={{
              padding: '5px',
            }}
            underline
          >
            {localeData.getStartedPage}
          </Text>
          {localeData.suffix}
        </div>
      )}
    </LocaleConsumer>
  );
}

export function LoadingComponent() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Spin size="large" />
    </div>
  );
}

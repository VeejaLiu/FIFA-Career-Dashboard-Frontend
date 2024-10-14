import { Spin, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

/**
 * No data component
 *
 * @constructor
 */
export function NoDataComponent() {
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
      No data here. Please go to the
      <Text
        link={{ href: '/get-started' }}
        style={{
          padding: '5px',
        }}
        underline
      >
        Get Started Page
      </Text>
      to start your journey!
    </div>
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

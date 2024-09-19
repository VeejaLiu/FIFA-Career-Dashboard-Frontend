import { Space, Spin, Table, Typography } from '@douyinfe/semi-ui';
import * as React from 'react';
import { PlayerApis, PlayerOverall } from '../../service/PlayerApis.ts';
import { useEffect } from 'react';

const { Text } = Typography;

export function getColorByPositionType(positionType: string) {
  switch (positionType) {
    case 'FOR':
      return '#306eff';
    case 'MID':
      return '#268535';
    case 'DEF':
      return '#f7b702';
    case 'GK':
      return '#f87e0b';
  }
  return 'black';
}

export function getColorByOverallRating(overallRating: number) {
  // 40 - #d31332
  // 50 - #d31332
  // 60 - #f7b702
  // 70 - #36b84b
  // 80 - #268535
  // 90 - #268535
  if (overallRating < 50) {
    return '#d31332';
  } else if (overallRating < 60) {
    return '#f7b702';
  } else if (overallRating < 70) {
    return '#36b84b';
  } else if (overallRating < 80) {
    return '#268535';
  } else {
    return '#268535';
  }
}

export function getAvatarUrl(playerID: number | null | undefined) {
  if (!playerID) {
    return '';
  }
  // playerID example: 158023
  // src example: https://cdn.sofifa.net/players/158/023/24_120.png
  const a = playerID.toString().slice(0, 3);
  const b = playerID.toString().slice(3, 6);
  const imageUrl = `https://cdn.sofifa.net/players/${a}/${b}/24_120.png`;
  return imageUrl;
}

const PlayerListColumn = [
  {
    title: '',
    dataIndex: 'imageUrl',
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <Space
          style={{
            height: 48,
            width: 48,
          }}
        >
          <img
            style={{ width: 48, height: 48 }}
            src={record.imageUrl}
            alt="player"
            onError={(e) => {
              // 图片加载失败时，隐藏图片
              e.currentTarget.style.display = 'none';
              // 清空 src 属性，防止加载失败时，显示上一次加载的图片
              e.currentTarget.src = '';
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = 'block'; // 或者使用其他显示方式
            }}
          />
        </Space>
      );
    },
  },
  {
    title: 'Player Name',
    dataIndex: 'playerName',
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <Space vertical align={'baseline'}>
          <Text
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.location.href = `/players-detail?id=${record.playerID}`;
            }}
          >
            {record.playerName}
          </Text>
          <span style={{ color: 'grey', fontSize: '1rem' }}>
            ID: {record.playerID}
          </span>
        </Space>
      );
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a: PlayerOverall, b: PlayerOverall) => a.age - b.age,
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <span style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>
          {record.age}
        </span>
      );
    },
  },
  {
    title: 'Position',
    dataIndex: 'position1',
    defaultSortOrder: 'ascend',
    // 按照 positionType 排序, 优先级: GK > DEF > MID > FOR
    // 其次按照 position1 排序， 按字典序
    sorter: (a: PlayerOverall, b: PlayerOverall) => {
      const positionTypeMap = {
        GK: 1,
        DEF: 2,
        MID: 3,
        FOR: 4,
      };
      return (
        positionTypeMap[a.positionType] - positionTypeMap[b.positionType] ||
        a.position1.localeCompare(b.position1)
      );
    },
    render: (text: string, record: PlayerOverall) => {
      const color = getColorByPositionType(record.positionType);
      return (
        <div>
          <Space vertical align={'baseline'}>
            <span style={{ color, fontSize: '1.5rem', fontWeight: 'bolder' }}>
              {record.position1}
            </span>
            <Space>
              {[record.position2, record.position3, record.position4].map(
                (position, index) => {
                  if (position) {
                    return (
                      <span key={index} style={{ color: 'gray' }}>
                        {position}
                      </span>
                    );
                  }
                  return null;
                },
              )}
            </Space>
          </Space>
        </div>
      );
    },
  },
  {
    title: 'Overall',
    dataIndex: 'overallRating',
    sorter: (a: PlayerOverall, b: PlayerOverall) =>
      a.overallRating - b.overallRating,
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <span
          style={{
            color: getColorByOverallRating(record.overallRating),
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          {record.overallRating}
        </span>
      );
    },
  },
  {
    title: 'Potential',
    dataIndex: 'potential',
    sorter: (a: PlayerOverall, b: PlayerOverall) => a.potential - b.potential,
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <span
          style={{
            color:
              record.potential > record.overallRating
                ? getColorByOverallRating(record.potential)
                : 'darkgray',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          {record.potential}
        </span>
      );
    },
  },
];

function PlayerListPage(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<PlayerOverall[]>([]);

  const getPlayerList = async () => {
    const players: PlayerOverall[] = await PlayerApis.getPlayerList();
    players.forEach((player) => {
      player.imageUrl = getAvatarUrl(player.playerID);
    });
    setData(players);
    setIsLoading(false);
  };

  useEffect(() => {
    getPlayerList().then();
  }, []);

  return (
    <Space
      style={{
        width: '100%',
      }}
      vertical
    >
      {isLoading ? (
        <Space
          style={{
            height: '100vh',
          }}
        >
          <Spin size="large" />
        </Space>
      ) : data.length === 0 ? (
        <Space
          align="center"
          style={{
            height: '100vh',
          }}
        >
          No data here. Please go to
          <Text link={{ href: '/get-started' }}>Get Started Page</Text> to start
          your journey!
        </Space>
      ) : (
        <Table
          style={{
            marginTop: '20px',
            marginBottom: '50px',
          }}
          columns={PlayerListColumn}
          dataSource={data}
          pagination={false}
          size="small"
        />
      )}
    </Space>
  );
}

export default PlayerListPage;

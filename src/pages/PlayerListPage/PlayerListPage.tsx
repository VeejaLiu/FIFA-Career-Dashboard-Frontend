import * as React from 'react';
import {
  Input,
  LocaleConsumer,
  Popover,
  Space,
  Table,
  Typography,
} from '@douyinfe/semi-ui';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerApis, PlayerOverall } from '../../service/PlayerApis.ts';
import {
  getAvatarUrl,
  getColorByOverallRating,
  getColorByPositionType,
  getRankingColor,
} from '../../common/player-helper.ts';
import { LoadingComponent, NoDataComponent } from '../../components/Other.tsx';
import { IconActivity, IconSearch } from '@douyinfe/semi-icons';
import player_avatar_placeholder from '../../assets/image/player_avatar_placeholder.svg';

const { Text } = Typography;

const PlayerListColumn = (
  localeData: any,
  navigate: any,
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
) => [
  {
    title: <div style={{ height: '30px' }}></div>,
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
              e.currentTarget.src = player_avatar_placeholder;
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = 'block';
            }}
          />
        </Space>
      );
    },
  },
  {
    title: (
      <Space>
        {localeData.name}
        <Input
          prefix={<IconSearch />}
          placeholder=""
          style={{ width: 100 }}
          onChange={(e: any) => {
            setSearchValue(e);
          }}
          showClear
        />
      </Space>
    ),
    dataIndex: 'playerName',
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <Space vertical align={'baseline'}>
          <Text
            style={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            underline
            onClick={() => {
              navigate(`/players-detail?id=${record.playerID}`);
            }}
          >
            {record.playerName}
          </Text>

          <span style={{ color: 'grey', fontSize: '0.8rem' }}>
            ID: {record.playerID}
          </span>
        </Space>
      );
    },
  },
  {
    title: localeData.age,
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
    title: localeData.position,
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
    title: localeData.overall,
    dataIndex: 'overallRating',
    sorter: (a: PlayerOverall, b: PlayerOverall) =>
      a.overallRating - b.overallRating,
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <Space vertical={false}>
          <span
            style={{
              width: '50px',
              color: getColorByOverallRating(record.overallRating),
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            {record.overallRating}
          </span>
          <span
            style={{
              width: '50px',
            }}
          >
            {(record.overallRanking || 999) <= 3 && (
              <Popover
                showArrow
                content={
                  <div>
                    {/*'The player ranks {ranking} in overall for his position.',*/}
                    {localeData.overallRankingTips
                      .replace('{ranking}', record.overallRanking || 999)
                      .replace('{position}', record.position1)}
                  </div>
                }
              >
                <div
                  style={{
                    height: '1.5rem',
                    width: '1.5rem',
                    borderRadius: '50%',
                    backgroundImage: getRankingColor(
                      record.overallRanking || 999,
                    ),
                  }}
                ></div>
              </Popover>
            )}
          </span>
        </Space>
      );
    },
  },
  {
    title: localeData.potential,
    dataIndex: 'potential',
    sorter: (a: PlayerOverall, b: PlayerOverall) => a.potential - b.potential,
    render: (text: string, record: PlayerOverall, index: number) => {
      return (
        <div
          style={{
            width: '200px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: '50px',
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
          <span
            style={{
              width: '50px',
            }}
          >
            {(record.potentialRanking || 999) <= 3 && (
              <Popover
                showArrow
                content={
                  <div>
                    {/* 'The player ranks {ranking} in potential for his position.' */}
                    {localeData.potentialRankingTips
                      .replace('{ranking}', record.potentialRanking || 999)
                      .replace('{position}', record.position1)}
                  </div>
                }
              >
                <div
                  style={{
                    marginLeft: '15px',
                    height: '1.5rem',
                    width: '1.5rem',
                    borderRadius: '50%',
                    backgroundImage: getRankingColor(
                      record.potentialRanking || 999,
                    ),
                  }}
                ></div>
              </Popover>
            )}
          </span>
          {record.potential === record.overallRating ? (
            <span
              style={{
                marginLeft: '15px',
                color: '#f6ca47',
              }}
            >
              <IconActivity size={'extra-large'} />
            </span>
          ) : null}
        </div>
      );
    },
  },
];

function PlayerListPage(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<PlayerOverall[]>([]);
  const [filteredData, setFilteredData] = React.useState<PlayerOverall[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();

  const getPlayerList = async () => {
    const players: PlayerOverall[] = await PlayerApis.getPlayerList();
    players.forEach((player) => {
      player.imageUrl = getAvatarUrl(player.playerID);
    });
    setFilteredData(players); // 初始化过滤后的数据
    setData(players);
    setIsLoading(false);
  };

  useEffect(() => {
    getPlayerList().then();
  }, []);

  useEffect(() => {
    const filtered = data.filter((player) =>
      player.playerName.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchValue, data]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {isLoading ? (
        <LoadingComponent />
      ) : data.length === 0 ? (
        <NoDataComponent />
      ) : (
        <LocaleConsumer componentName={'PlayerListTable'}>
          {(localeData: any, localeCode: string, dateFnsLocale: any) => (
            <Table
              sticky={{ top: 0 }}
              style={{
                minWidth: '800px',
                scroll: null,
              }}
              columns={PlayerListColumn(
                localeData,
                navigate,
                searchValue,
                setSearchValue,
              )} // 传递 searchValue 和 setSearchValue
              dataSource={filteredData} // 使用过滤后的数据
              pagination={false}
              size="small"
            />
          )}
        </LocaleConsumer>
      )}
    </div>
  );
}

export default PlayerListPage;

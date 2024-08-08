import * as React from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, YAxis } from 'recharts';
import { PlayerApis, PlayerTrendData } from '../service/PlayerApis.ts';
import { useEffect } from 'react';
import { getAvatarUrl, getColorByPositionType } from './PlayerListPage.tsx';
import { Popover, Space } from '@douyinfe/semi-ui';
import './PlayerTrendsPage.css';

function PlayerTrendsPage(): React.ReactElement {
  const [data, setData] = React.useState<PlayerTrendData[]>([]);

  const fetchPlayerTrends = async () => {
    const res = await PlayerApis.getPlayerTrends();
    setData(res);
  };

  useEffect(() => {
    fetchPlayerTrends();
  }, []);

  return (
    <div
      style={{
        padding: '5px',
      }}
    >
      {[
        {
          position: 'FOR',
          text: 'Forwards',
          color: getColorByPositionType('FOR'),
        },
        {
          position: 'MID',
          text: 'Midfielders',
          color: getColorByPositionType('MID'),
        },
        {
          position: 'DEF',
          text: 'Defenders',
          color: getColorByPositionType('DEF'),
        },
        {
          position: 'GK',
          text: 'Goalkeepers',
          color: getColorByPositionType('GK'),
        },
      ].map((item) => {
        return (
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <h1
              style={{
                color: item.color,
              }}
            >
              {item.text}
            </h1>
            <Space wrap align={'start'}>
              {data
                .filter((player) => player.positionType === item.position)
                .map((player) => {
                  const minOverallRating =
                    Math.min(
                      ...player.trends.map((item) => item.overallRating),
                    ) - 10;
                  const maxPotential =
                    Math.max(...player.trends.map((item) => item.potential)) +
                    5;
                  const positionColor = getColorByPositionType(
                    player.positionType,
                  );
                  const imageUrl = getAvatarUrl(player.playerID);
                  return (
                    <Space
                      key={player.playerID}
                      style={{
                        border: '1px solid gray',
                        borderRadius: '5px',
                        padding: '10px',
                        height: '200px',
                        width: '450px',
                      }}
                    >
                      <Space
                        vertical
                        spacing={0}
                        style={{
                          backgroundColor: '#e4ce78',
                          borderRadius: '5px',
                          boxShadow: '0 0 5px #000',
                          width: '120px',
                          height: '200px',
                        }}
                      >
                        <div style={{ width: 120, height: 120 }}>
                          <img
                            style={{ width: 120, height: 120 }}
                            src={imageUrl}
                            alt="player"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <Popover
                          showArrow
                          content={
                            <article>
                              <h3>{player.playerName}</h3>
                              Player ID: {player.playerID}
                            </article>
                          }
                          position={'right'}
                        >
                          <span className="text-container">
                            {player.playerName}
                          </span>{' '}
                        </Popover>

                        <span style={{ color: positionColor }}>
                          <b>{player.preferredposition1}</b>
                        </span>
                      </Space>
                      <AreaChart
                        // style={{ backgroundColor: 'yellow' }}
                        width={330}
                        height={200}
                        data={player.trends}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        {/*<XAxis*/}
                        {/*  dataKey="inGameDate"*/}
                        {/*  style={{*/}
                        {/*    fontSize: '10px',*/}
                        {/*  }}*/}
                        {/*></XAxis>*/}
                        <YAxis
                          domain={[
                            minOverallRating,
                            Math.min(maxPotential, 100),
                          ]}
                          style={
                            {
                              // fontSize: '12px',
                            }
                          }
                        ></YAxis>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const { overallRating, potential } =
                                payload[0].payload; // 获取当前数据点的能力值和潜力值
                              return (
                                <div>
                                  <p>{payload[0].payload.inGameDate}</p>
                                  <p>
                                    <b>Potential:</b> {potential}
                                  </p>
                                  <p>
                                    <b>Overall:</b> {overallRating}
                                  </p>
                                </div>
                              );
                            }
                            return null; // 不显示 Tooltip
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="potential"
                          stroke="#000"
                          strokeWidth={2}
                          fillOpacity={0.1}
                          fill="green"
                        ></Area>
                        <Area
                          type="monotone"
                          dataKey="overallRating"
                          stroke="#000"
                          strokeWidth={2}
                          fillOpacity={0.8}
                          fill="green"
                        ></Area>
                      </AreaChart>
                    </Space>
                  );
                })}
            </Space>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerTrendsPage;

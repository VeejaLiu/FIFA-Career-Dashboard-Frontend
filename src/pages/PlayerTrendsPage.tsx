import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PlayerApis, PlayerTrendData } from '../service/PlayerApis.ts';
import { useEffect } from 'react';
import { getAvatarUrl, getColorByPositionType } from './PlayerListPage.tsx';
import { Popover, Space } from '@douyinfe/semi-ui';
import './PlayerTrendsPage.css';

function formatDate(inputDate: string) {
  const [, month, day] = inputDate.split('-').map(Number);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthName = monthNames[month - 1];

  return `${monthName} ${day}`;

  // const suffix =
  //   day % 10 === 1 && day !== 11
  //     ? 'st'
  //     : day % 10 === 2 && day !== 12
  //       ? 'nd'
  //       : day % 10 === 3 && day !== 13
  //         ? 'rd'
  //         : 'th';
  //
  // return `${monthName} ${day}${suffix}`;
}

function PlayerTrendsPage(): React.ReactElement {
  const [data, setData] = React.useState<PlayerTrendData[]>([]);

  const fetchPlayerTrends = async () => {
    const res = await PlayerApis.getPlayerTrends();
    res.forEach((player) => {
      player.trends.forEach((trend) => {
        trend.inGameDate = formatDate(trend.inGameDate);
      });
    });
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
                .sort((a, b) => {
                  return (
                    Math.max(...b.trends.map((item) => item.potential)) -
                    Math.max(...a.trends.map((item) => item.potential))
                  );
                })
                .map((player) => {
                  const minOverallRating =
                    Math.min(
                      ...player.trends.map((item) => item.overallRating),
                    ) - 10;
                  // const minOverallRating = 40;
                  const maxPotential =
                    Math.max(...player.trends.map((item) => item.potential)) +
                    3;
                  // const maxPotential = 100;
                  const positionColor = getColorByPositionType(
                    player.positionType,
                  );
                  const imageUrl = getAvatarUrl(player.playerID);
                  return (
                    <Space
                      key={player.playerID}
                      style={{
                        // border: '1px solid gray',
                        borderRadius: '3px',
                        backgroundColor: '#f1f1f1',
                        padding: '10px',
                      }}
                    >
                      <Space
                        vertical
                        spacing={0}
                        style={{
                          backgroundColor: '#e4ce78',
                          borderRadius: '3px',
                          // boxShadow: '0 0 5px #000',
                          width: '120px',
                          height: '170px',
                        }}
                      >
                        <span style={{ color: positionColor }}>
                          <h4>{player.preferredposition1}</h4>
                        </span>
                        <div style={{ width: 100, height: 100 }}>
                          <img
                            style={{ width: 100, height: 100 }}
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
                      </Space>
                      <AreaChart
                        // style={{ backgroundColor: 'yellow' }}
                        width={300}
                        height={170}
                        data={player.trends}
                        margin={{ top: 10, right: 30, left: 0 }}
                      >
                        <XAxis
                          dataKey="inGameDate"
                          type={'category'}
                          style={{
                            fontSize: '10px',
                          }}
                        ></XAxis>
                        <YAxis
                          domain={[
                            minOverallRating,
                            Math.min(maxPotential, 100),
                          ]}
                          style={{
                            fontSize: '10px',
                          }}
                        ></YAxis>
                        <CartesianGrid strokeDasharray="3 3" />
                        {/*<Tooltip*/}
                        {/*  content={({ active, payload }) => {*/}
                        {/*    if (active && payload && payload.length) {*/}
                        {/*      const { overallRating, potential } =*/}
                        {/*        payload[0].payload; // 获取当前数据点的能力值和潜力值*/}
                        {/*      return (*/}
                        {/*        <div>*/}
                        {/*          <p>{payload[0].payload.inGameDate}</p>*/}
                        {/*          <p>*/}
                        {/*            <b>Potential:</b> {potential}*/}
                        {/*          </p>*/}
                        {/*          <p>*/}
                        {/*            <b>Overall:</b> {overallRating}*/}
                        {/*          </p>*/}
                        {/*        </div>*/}
                        {/*      );*/}
                        {/*    }*/}
                        {/*    return null; // 不显示 Tooltip*/}
                        {/*  }}*/}
                        {/*/>*/}
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="potential"
                          // stroke="#000"
                          // strokeWidth={2}
                          // fillOpacity={0.6}
                          fill="#ffc658"
                          stroke="#ffc658"
                        ></Area>
                        <Area
                          type="monotone"
                          dataKey="overallRating"
                          stroke="#000"
                          strokeWidth={1}
                          // fillOpacity={0.6}
                          fill="#82ca9d"
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

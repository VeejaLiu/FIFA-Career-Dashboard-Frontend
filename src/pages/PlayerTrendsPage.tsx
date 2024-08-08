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
    <div>
      <h1>Players Trends</h1>
      {data.map((player) => {
        const minOverallRating =
          Math.min(...player.trends.map((item) => item.overallRating)) - 10;
        const maxPotential =
          Math.max(...player.trends.map((item) => item.potential)) + 5;
        const positionColor = getColorByPositionType(player.positionType);
        const imageUrl = getAvatarUrl(player.playerID);
        return (
          <div
            key={player.playerID}
            style={{
              border: '1px solid #000',
              padding: '10px',
              margin: '10px',
              width: 'auto',
            }}
          >
            <div>
              <div style={{ display: 'block', alignItems: 'center' }}>
                <img
                  style={{ width: 48, height: 48 }}
                  src={imageUrl}
                  alt="player"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <b>{player.playerName}</b>
                <span style={{ color: positionColor, marginLeft: '10px' }}>
                  <b>{player.preferredposition1}</b>
                </span>
                {/*<div*/}
                {/*  style={{*/}
                {/*    color: 'gray',*/}
                {/*  }}*/}
                {/*>*/}
                {/*  {player.playerID}*/}
                {/*</div>*/}
              </div>
            </div>
            <AreaChart
              width={400}
              height={200}
              data={player.trends}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="inGameDate" />
              <YAxis domain={[minOverallRating, Math.min(maxPotential, 100)]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const { overallRating, potential } = payload[0].payload; // 获取当前数据点的能力值和潜力值
                    return (
                      <div>
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
                fillOpacity={0.1}
                fill="green"
              ></Area>
              <Area
                type="monotone"
                dataKey="overallRating"
                stroke="#000"
                fillOpacity={0.8}
                fill="green"
              ></Area>
            </AreaChart>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerTrendsPage;

import * as React from 'react';
import { Button, Space } from '@douyinfe/semi-ui';
import {
  PlayerApis,
  PlayerDetail,
  PlayerOverall,
} from '../../service/PlayerApis.ts';
import { useEffect } from 'react';
import { getColorByPositionType } from '../PlayerListPage/PlayerListPage.tsx';

function PlayerDetailPage(): React.ReactElement {
  const [playerDetail, setPlayerDetail] = React.useState<PlayerDetail | null>();
  const [playerID, setPlayerID] = React.useState<number | null>(null);

  const getPlayerDetail = async () => {
    const data = await PlayerApis.getPlayerDetail({});
    setPlayerDetail(data);
  };

  useEffect(() => {
    getPlayerDetail().then();
  }, []);

  return (
    <Space
      vertical
      style={{
        width: '95%',
        height: '100vh',
        // backgroundColor: 'green',
      }}
      align={'start'}
    >
      {/* Player picker */}
      <Space
        style={{
          padding: '5px',
          border: '1px solid gray',
          width: '100%',
        }}
        wrap
      >
        {playerDetail?.allPlayer
          ?.sort((a: PlayerOverall, b: PlayerOverall) => {
            const positionTypeMap = {
              GK: 1,
              DEF: 2,
              MID: 3,
              FOR: 4,
            };
            return (
              positionTypeMap[a.positionType] -
                positionTypeMap[b.positionType] ||
              a.position1.localeCompare(b.position1)
            );
          })
          .map((player) => {
            const color = getColorByPositionType(player.positionType);
            return (
              <Button
                key={player.playerID}
                onClick={() => {
                  setPlayerID(player.playerID);
                }}
              >
                <span
                  style={{
                    color,
                    fontWeight: 'bolder',
                    marginRight: '5px',
                  }}
                >
                  {player.position1}
                </span>
                {player.playerName}
                <span
                  style={{
                    color: 'black',
                    marginLeft: '5px',
                    fontWeight: 'bolder',
                  }}
                >
                  {player.overallRating}
                </span>
              </Button>
            );
          })}
      </Space>
      <p>Selected player ID: {playerID}</p>
      <p>{JSON.stringify(playerDetail?.thisPlayer)}</p>
      <p>{JSON.stringify(playerDetail?.trends)}</p>
    </Space>
  );
}

export default PlayerDetailPage;

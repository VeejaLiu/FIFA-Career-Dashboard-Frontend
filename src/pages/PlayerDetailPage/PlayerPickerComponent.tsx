import React, { useEffect, useState } from 'react';
import { PlayerApis, PlayerOverall } from '../../service/PlayerApis.ts';
import {
  getAvatarUrl,
  getColorByPositionType,
} from '../../common/player-helper.ts';
import { LoadingComponent } from '../../components/Other.tsx';
import './PlayerPickerComponent.css';

interface PlayerPickerComponentProps {
  playerDetail: any;
  playerID: number;
  setPlayerID: (id: number) => void;
}

const PlayerPickerComponent: React.FC<PlayerPickerComponentProps> = ({
  playerDetail,
  playerID,
  setPlayerID,
}) => {
  const [playerList, setPlayerList] = useState<PlayerOverall[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPlayerList = async () => {
    // sleep 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const players: PlayerOverall[] = await PlayerApis.getPlayerList();
    players.forEach((player) => {
      player.imageUrl = getAvatarUrl(player.playerID);
    });
    setPlayerList(players);
    setIsLoading(false);
  };

  useEffect(() => {
    getPlayerList().then();
  }, []);

  const handlePlayerSelect = (id: number) => {
    setPlayerID(id);
  };

  return (
    <div className="player-picker-container">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        playerList
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
          .map((player: any) => {
            return (
              <div
                className={`player-item ${
                  player.playerID === playerID ? 'selected' : ''
                }`}
                key={player.playerID}
                onClick={() => handlePlayerSelect(player.playerID)}
              >
                <span
                  className="player-position"
                  style={{
                    color: getColorByPositionType(player.positionType),
                  }}
                >
                  {player.position1}
                </span>
                <span>{player.playerName}</span>
              </div>
            );
          })
      )}
    </div>
  );
};

export default PlayerPickerComponent;

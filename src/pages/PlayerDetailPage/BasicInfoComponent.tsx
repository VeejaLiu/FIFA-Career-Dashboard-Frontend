import {
  getAvatarUrl,
  getColorByOverallRating,
  getColorByPositionType,
  getWorkRateText,
} from '../../common/player-helper.ts';
import player_avatar_placeholder from '../../assets/image/player_avatar_placeholder.svg';
import {
  PLAYER_PRIMARY_POS_NAME,
  PLAYER_PRIMARY_POS_TYPE,
} from '../../constant/player.ts';
import { Rating, Space } from '@douyinfe/semi-ui';
import React, { useEffect, useState } from 'react';
import { getDefaultGameVersion } from '../../common/common.ts';
import './BasicInfoComponent.css';

interface BasicInfoComponentProps {
  playerInfo: any;
  localeData: any;
}

const BasicInfoComponent: React.FC<BasicInfoComponentProps> = ({
  playerInfo,
  localeData,
}) => {
  const [gameVersion, setGameVersion] = useState<number>(0);

  useEffect(() => {
    getDefaultGameVersion().then((version) => {
      setGameVersion(version);
    });
  }, []);

  return (
    <div className={'basic-info-container'}>
      <div className={'image-and-name'}>
        {/* Image */}
        <img
          width={'116px'}
          height={'116px'}
          src={getAvatarUrl(playerInfo?.player_id)}
          alt="player_avatar"
          onError={(e) => {
            e.currentTarget.src = player_avatar_placeholder;
          }}
        />
        {/* Name */}
        <div style={{ fontWeight: 'bold' }}>{playerInfo?.player_name}</div>
        {/* Position */}
        <h1
          style={{
            color: getColorByPositionType(
              PLAYER_PRIMARY_POS_TYPE[playerInfo?.preferredposition1 || 0],
            ),
          }}
        >
          {PLAYER_PRIMARY_POS_NAME[playerInfo?.preferredposition1 || 0]}
        </h1>
        {/* Overall Rating -> Potential */}
        <Space style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          <span
            style={{
              color: getColorByOverallRating(playerInfo?.overallrating || 0),
            }}
          >
            {playerInfo?.overallrating}
          </span>
          {'→'}
          <span
            style={{
              color: getColorByOverallRating(playerInfo?.potential || 0),
            }}
          >
            {playerInfo?.potential}
          </span>
        </Space>
      </div>

      {/*Player ID*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.PlayerID}</span>
        <span className="stat-info-value">{playerInfo?.player_id}</span>
      </div>
      {/*Age*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.Age}</span>
        <span className="stat-info-value">{playerInfo?.age}</span>
      </div>
      {/*AcceleRATE	Controlled Explosive*/}

      {/*Skills*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.Skills}</span>
        <span className="stat-info-value">
          {/*{playerInfo?.skillmoves}*/}
          <Rating
            disabled
            size={'small'}
            count={(playerInfo?.skillmoves || 0) + 1}
            value={(playerInfo?.skillmoves || 0) + 1}
          />
        </span>
      </div>
      {/*Weak Foot*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.WeakFoot}:</span>
        <span className="stat-info-value">
          <Rating
            disabled
            size={'small'}
            count={playerInfo?.weakfootabilitytypecode}
            value={playerInfo?.weakfootabilitytypecode}
          />
        </span>
      </div>
      {/*Foot	Right*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.Foot}:</span>
        <span className="stat-info-value">
          {(playerInfo?.preferredfoot || 1) === 1 ? 'Right' : 'Left'}
        </span>
      </div>
      {/*Height	177cm | 5'10"*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.Height}:</span>
        <span className="stat-info-value">{playerInfo?.height} cm</span>
      </div>
      {/*Weight	67*/}
      <div className="stat">
        <span className="stat-label">{localeData.BasicInfo.Weight}:</span>
        <span className="stat-info-value">{playerInfo?.weight} kg</span>
      </div>

      {gameVersion === 24 && (
        <>
          {/*Att. WR	High*/}
          <div className="stat">
            <span className="stat-label">
              {localeData.BasicInfo.AttackingWorkRate}:
            </span>
            <span className="stat-info-value">
              {getWorkRateText(playerInfo?.attackingworkrate)}
            </span>
          </div>
          {/*Def. WR	High*/}
          <div className="stat">
            <span className="stat-label">
              {localeData.BasicInfo.DefensiveWorkRate}:
            </span>
            <span className="stat-info-value">
              {getWorkRateText(playerInfo?.defensiveworkrate)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BasicInfoComponent;

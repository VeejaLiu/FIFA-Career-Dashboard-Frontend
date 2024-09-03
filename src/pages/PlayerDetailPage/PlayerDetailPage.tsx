import * as React from 'react';
import { Button, Col, Row, Space } from '@douyinfe/semi-ui';
import {
  PlayerApis,
  PlayerDetail,
  PlayerOverall,
} from '../../service/PlayerApis.ts';
import { useEffect } from 'react';
import { getColorByPositionType } from '../PlayerListPage/PlayerListPage.tsx';
import './PlayerDetailPage.css';

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

      <h1>Player detail</h1>
      <Space
        style={{
          width: '100%',
          backgroundColor: 'orangered',
        }}
      >
        {/* Basic info*/}
        <Space vertical style={{ width: '30%' }}>
          <div className="col-content">
            <h2>Basic Info</h2>
            <div className="stat">
              <span className="stat-label">Player ID:</span>
              <span className="stat-value">
                {playerDetail?.thisPlayer?.player_id}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Player name:</span>
              <span className="stat-value">
                {playerDetail?.thisPlayer?.player_name}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Overall rating:</span>
              <span className="stat-value">
                {playerDetail?.thisPlayer?.overallrating}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Potential:</span>
              <span className="stat-value">
                {playerDetail?.thisPlayer?.potential}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Age:</span>
              <span className="stat-value">
                {playerDetail?.thisPlayer?.age}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Position type:</span>
              <span className="stat-value">
                {playerDetail?.thisPlayer?.preferredposition1}
              </span>
            </div>
          </div>
        </Space>

        {/* Details */}
        <Space vertical style={{ width: '70%' }}>
          <h2>Details</h2>
          <div className="grid" style={{ width: '100%' }}>
            <Row>
              <Col span={8}>
                <div className="col-content">
                  <h2>Pace</h2>
                  <div className="stat">
                    <span className="stat-label">Acceleration:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.acceleration}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Sprint Speed:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.sprintspeed}
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-content">
                  <h2>Shooting</h2>
                  <div className="stat">
                    <span className="stat-label">Att. Position:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.positioning}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Finishing:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.finishing}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Shot Power:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.shotpower}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Long Shots:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.longshots}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Volleys:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.volleys}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Penalties:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.penalties}
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-content">
                  <h2>Passing</h2>
                  <div className="stat">
                    <span className="stat-label">Vision:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.vision}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Crossing:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.crossing}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">FK Acc.:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.freekickaccuracy}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Short Pass:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.shortpassing}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Long Pass:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.longpassing}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Curve:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.curve}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <div className="col-content">
                  <h2>Dribbling</h2>
                  {/* Agility
                      Balance
                      Reactions
                      Ball Control
                      Dribbling
                      Composure */}
                  <div className="stat">
                    <span className="stat-label">Agility:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.agility}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Balance:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.balance}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Reactions:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.reactions}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Ball Control:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.ballcontrol}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Dribbling:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.dribbling}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Composure:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.composure}
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-content">
                  <h2>Defending</h2>
                  {/*Interceptions*/}
                  <div className="stat">
                    <span className="stat-label">Interceptions:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.interceptions}
                    </span>
                  </div>
                  {/*Heading Acc.*/}
                  <div className="stat">
                    <span className="stat-label">Heading Acc.:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.headingaccuracy}
                    </span>
                  </div>
                  {/*Def. Aware*/}
                  <div className="stat">
                    <span className="stat-label">Def. Aware:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.defensiveawareness}
                    </span>
                  </div>
                  {/*Stand Tackle*/}
                  <div className="stat">
                    <span className="stat-label">Stand Tackle:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.standingtackle}
                    </span>
                  </div>
                  {/*Slide Tackle*/}
                  <div className="stat">
                    <span className="stat-label">Slide Tackle:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.slidingtackle}
                    </span>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="col-content">
                  <h2>Physical</h2>
                  {/*Jumping*/}
                  <div className="stat">
                    <span className="stat-label">Jumping:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.jumping}
                    </span>
                  </div>
                  {/*Stamina*/}
                  <div className="stat">
                    <span className="stat-label">Stamina:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.stamina}
                    </span>
                  </div>
                  {/*Strength*/}
                  <div className="stat">
                    <span className="stat-label">Strength:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.strength}
                    </span>
                  </div>
                  {/*Aggression*/}
                  <div className="stat">
                    <span className="stat-label">Aggression:</span>
                    <span className="stat-value">
                      {playerDetail?.thisPlayer?.aggression}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Space>
      </Space>
      <p>{JSON.stringify(playerDetail?.thisPlayer)}</p>

      <h1>Player trends</h1>
      <p>{JSON.stringify(playerDetail?.trends)}</p>
    </Space>
  );
}

export default PlayerDetailPage;

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Image,
  Progress,
  Rating,
  Row,
  Space,
} from '@douyinfe/semi-ui';
import {
  PlayerApis,
  PlayerDetail,
  PlayerOverall,
} from '../../service/PlayerApis.ts';
import {
  getAvatarUrl,
  getColorByOverallRating,
  getColorByPositionType,
} from '../PlayerListPage/PlayerListPage.tsx';
import './PlayerDetailPage.css';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  PLAYER_PRIMARY_POS_NAME,
  PLAYER_PRIMARY_POS_TYPE,
} from '../../constant/player.ts';
import { useSearchParams } from 'react-router-dom';

function getWorkRateText(value: number | string | undefined) {
  switch (value) {
    case 0:
    case '0':
      return 'Low';
    case 1:
    case '1':
      return 'Medium';
    case 2:
    case '2':
      return 'High';
    default:
      return 'unknown';
  }
}

function PlayerDetailPage(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [playerDetail, setPlayerDetail] = useState<PlayerDetail>();
  const [playerID, setPlayerID] = useState<number>(id ? +id : 0);

  const getPlayerDetail = async () => {
    const data = await PlayerApis.getPlayerDetail({
      playerID: playerID,
    });
    if (data) {
      setPlayerDetail(data);
    }
  };

  useEffect(() => {
    getPlayerDetail().then();
  }, [playerID]);

  return (
    <Space
      vertical
      style={{
        width: '95%',
        height: '100vh',
        marginTop: '8px',
        marginBottom: '200px',
      }}
      align={'start'}
    >
      {/* Player picker */}
      <Space
        style={{
          width: '100%',
          padding: '5px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '2px',
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
              </Button>
            );
          })}
      </Space>

      <Space
        align="start"
        style={{
          width: '100%',
          padding: '5px',
          backgroundColor: '#f4f5f5',
          borderRadius: '2px',
        }}
      >
        {/* Basic info*/}
        <Space style={{ width: '30%' }}>
          <div>
            <Space style={{ padding: '10px' }}>
              <Image
                width={150}
                height={150}
                src={getAvatarUrl(playerDetail?.thisPlayer?.player_id)}
                alt="player_avatar"
                preview={false}
              />
              <Space vertical style={{ width: '200px' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {playerDetail?.thisPlayer?.player_name}
                </span>
                <h1
                  style={{
                    color: getColorByPositionType(
                      PLAYER_PRIMARY_POS_TYPE[
                        playerDetail?.thisPlayer?.preferredposition1 || 0
                      ],
                    ),
                  }}
                >
                  {
                    PLAYER_PRIMARY_POS_NAME[
                      playerDetail?.thisPlayer?.preferredposition1 || 0
                    ]
                  }
                </h1>
                <Space style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span
                    style={{
                      color: getColorByOverallRating(
                        playerDetail?.thisPlayer?.overallrating || 0,
                      ),
                    }}
                  >
                    {playerDetail?.thisPlayer?.overallrating}
                  </span>
                  {'→'}
                  <span
                    style={{
                      color: getColorByOverallRating(
                        playerDetail?.thisPlayer?.potential || 0,
                      ),
                    }}
                  >
                    {playerDetail?.thisPlayer?.potential}
                  </span>
                </Space>
              </Space>
            </Space>

            {/*Player ID*/}
            <div className="stat">
              <span className="stat-label">Player ID:</span>
              <span className="stat-info-value">
                {playerDetail?.thisPlayer?.player_id}
              </span>
            </div>
            {/*Age*/}
            <div className="stat">
              <span className="stat-label">Age:</span>
              <span className="stat-info-value">
                {playerDetail?.thisPlayer?.age}
              </span>
            </div>
            {/*AcceleRATE	Controlled Explosive*/}

            {/*Skills*/}
            <div className="stat">
              <span className="stat-label">Skills:</span>
              <span className="stat-info-value">
                {/*{playerDetail?.thisPlayer?.skillmoves}*/}
                <Rating
                  disabled
                  size={'small'}
                  count={(playerDetail?.thisPlayer?.skillmoves || 0) + 1}
                  value={(playerDetail?.thisPlayer?.skillmoves || 0) + 1}
                />
              </span>
            </div>
            {/*Weak Foot*/}
            <div className="stat">
              <span className="stat-label">Weak Foot:</span>
              <span className="stat-info-value">
                <Rating
                  disabled
                  size={'small'}
                  count={playerDetail?.thisPlayer?.weakfootabilitytypecode}
                  value={playerDetail?.thisPlayer?.weakfootabilitytypecode}
                />
              </span>
            </div>
            {/*Foot	Right*/}
            <div className="stat">
              <span className="stat-label">Foot:</span>
              <span className="stat-info-value">
                {(playerDetail?.thisPlayer?.preferredfoot || 1) === 1
                  ? 'Right'
                  : 'Left'}
              </span>
            </div>
            {/*Height	177cm | 5'10"*/}
            <div className="stat">
              <span className="stat-label">Height:</span>
              <span className="stat-info-value">
                {playerDetail?.thisPlayer?.height} cm
              </span>
            </div>
            {/*Weight	67*/}
            <div className="stat">
              <span className="stat-label">Weight:</span>
              <span className="stat-info-value">
                {playerDetail?.thisPlayer?.weight} kg
              </span>
            </div>
            {/*Att. WR	High*/}
            <div className="stat">
              <span className="stat-label">Att. WR:</span>
              <span className="stat-info-value">
                {getWorkRateText(playerDetail?.thisPlayer?.attackingworkrate)}
              </span>
            </div>
            {/*Def. WR	High*/}
            <div className="stat">
              <span className="stat-label">Def. WR:</span>
              <span className="stat-info-value">
                {getWorkRateText(playerDetail?.thisPlayer?.defensiveworkrate)}
              </span>
            </div>
          </div>
        </Space>

        {/* Details */}
        <div className="grid" style={{ width: '100%' }}>
          <Row>
            <Col span={8}>
              <div className="col-content">
                <h2>Pace</h2>
                <Progress
                  percent={
                    ((playerDetail?.thisPlayer?.acceleration || 0) +
                      (playerDetail?.thisPlayer?.sprintspeed || 0)) /
                    2
                  }
                  style={{ height: '8px' }}
                  aria-label="disk usage"
                />
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
                <Progress
                  percent={
                    ((playerDetail?.thisPlayer?.positioning || 0) +
                      (playerDetail?.thisPlayer?.finishing || 0) +
                      (playerDetail?.thisPlayer?.shotpower || 0) +
                      (playerDetail?.thisPlayer?.longshots || 0) +
                      (playerDetail?.thisPlayer?.volleys || 0) +
                      (playerDetail?.thisPlayer?.penalties || 0)) /
                    6
                  }
                  style={{ height: '8px' }}
                  aria-label="disk usage"
                />
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
                {/*Long Shots*/}
                <div className="stat">
                  <span className="stat-label">Long Shots:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.longshots}
                  </span>
                </div>
                {/*Volleys*/}
                <div className="stat">
                  <span className="stat-label">Volleys:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.volleys}
                  </span>
                </div>
                {/*Penalties*/}
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
                <Progress
                  percent={
                    ((playerDetail?.thisPlayer?.vision || 0) +
                      (playerDetail?.thisPlayer?.crossing || 0) +
                      (playerDetail?.thisPlayer?.freekickaccuracy || 0) +
                      (playerDetail?.thisPlayer?.shortpassing || 0) +
                      (playerDetail?.thisPlayer?.longpassing || 0) +
                      (playerDetail?.thisPlayer?.curve || 0)) /
                    6
                  }
                  style={{ height: '8px' }}
                  aria-label="disk usage"
                />
                {/*Vision*/}
                <div className="stat">
                  <span className="stat-label">Vision:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.vision}
                  </span>
                </div>
                {/*Crossing*/}
                <div className="stat">
                  <span className="stat-label">Crossing:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.crossing}
                  </span>
                </div>
                {/*FK Acc.*/}
                <div className="stat">
                  <span className="stat-label">FK Acc.:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.freekickaccuracy}
                  </span>
                </div>
                {/*Short Pass*/}
                <div className="stat">
                  <span className="stat-label">Short Pass:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.shortpassing}
                  </span>
                </div>
                {/*Long Pass*/}
                <div className="stat">
                  <span className="stat-label">Long Pass:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.longpassing}
                  </span>
                </div>
                {/*Curve*/}
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
                <Progress
                  percent={
                    ((playerDetail?.thisPlayer?.agility || 0) +
                      (playerDetail?.thisPlayer?.balance || 0) +
                      (playerDetail?.thisPlayer?.reactions || 0) +
                      (playerDetail?.thisPlayer?.ballcontrol || 0) +
                      (playerDetail?.thisPlayer?.dribbling || 0) +
                      (playerDetail?.thisPlayer?.composure || 0)) /
                    6
                  }
                  style={{ height: '8px' }}
                  aria-label="disk usage"
                />
                {/*Agility*/}
                <div className="stat">
                  <span className="stat-label">Agility:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.agility}
                  </span>
                </div>
                {/*Balance*/}
                <div className="stat">
                  <span className="stat-label">Balance:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.balance}
                  </span>
                </div>
                {/*Reactions*/}
                <div className="stat">
                  <span className="stat-label">Reactions:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.reactions}
                  </span>
                </div>
                {/*Ball Control*/}
                <div className="stat">
                  <span className="stat-label">Ball Control:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.ballcontrol}
                  </span>
                </div>
                {/*Dribbling*/}
                <div className="stat">
                  <span className="stat-label">Dribbling:</span>
                  <span className="stat-value">
                    {playerDetail?.thisPlayer?.dribbling}
                  </span>
                </div>
                {/*Composure*/}
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
                <Progress
                  percent={
                    ((playerDetail?.thisPlayer?.interceptions || 0) +
                      (playerDetail?.thisPlayer?.headingaccuracy || 0) +
                      (playerDetail?.thisPlayer?.defensiveawareness || 0) +
                      (playerDetail?.thisPlayer?.standingtackle || 0) +
                      (playerDetail?.thisPlayer?.slidingtackle || 0)) /
                    5
                  }
                  style={{ height: '8px' }}
                  aria-label="disk usage"
                />
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
                <Progress
                  percent={
                    ((playerDetail?.thisPlayer?.jumping || 0) +
                      (playerDetail?.thisPlayer?.stamina || 0) +
                      (playerDetail?.thisPlayer?.strength || 0) +
                      (playerDetail?.thisPlayer?.aggression || 0)) /
                    4
                  }
                  style={{ height: '8px' }}
                  aria-label="disk usage"
                />
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

      <Space
        style={{
          width: '100%',
          height: '600px',
          padding: '5px',
          backgroundColor: '#f4f5f5',
          borderRadius: '2px',
        }}
      >
        <ResponsiveContainer>
          <AreaChart
            height={600}
            data={playerDetail?.trends}
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
              style={{
                fontSize: '10px',
              }}
              domain={[40, 100]}
            ></YAxis>
            {/*<CartesianGrid strokeDasharray="3 3" />*/}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="potential"
              fill="#FFF"
              stroke="red"
              strokeWidth={2}
            ></Area>
            <Area
              type="monotone"
              dataKey="overallRating"
              stroke="#82ca9d"
              strokeWidth={2}
              fillOpacity={0.2}
              fill="#82ca9d"
            ></Area>
          </AreaChart>
        </ResponsiveContainer>
      </Space>
    </Space>
  );
}

export default PlayerDetailPage;

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Col,
  LocaleConsumer,
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
import './PlayerDetailPage.css';
import {
  Area,
  AreaChart,
  CartesianGrid,
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
import {
  getAvatarUrl,
  getColorByOverallRating,
  getColorByPositionType,
  getWorkRateText,
} from '../../common/player-helper.ts';
import { CustomTooltip } from '../PlayerTrendsPage/PlayerTrendsPage.tsx';
import { NoDataComponent } from '../../components/Other.tsx';
import player_avatar_placeholder from '../../assets/image/player_avatar_placeholder.svg';

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

  const AttributeSectionCol = ({
    title,
    attributes,
    values,
  }: {
    title: string;
    attributes: { label: string }[];
    values: number[];
  }) => {
    const average =
      values.reduce((sum, value) => sum + (value || 0), 0) / values.length;

    return (
      <Col span={8}>
        <div className="col-content">
          <h2>{title}</h2>
          <Progress
            percent={average}
            style={{ height: '8px' }}
            aria-label="disk usage"
          />
          {attributes.map((attr, index) => (
            <div className="stat" key={index}>
              <span className="stat-label">{attr.label}</span>
              <span className="stat-value">{values[index]}</span>
            </div>
          ))}
        </div>
      </Col>
    );
  };

  return playerDetail ? (
    <LocaleConsumer componentName={'PlayerDetailPage'}>
      {(localeData: any, localeCode: string, dateFnsLocale: any) => (
        <div style={{ width: '100%' }}>
          {/* Player picker */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              backgroundColor: '#f4f5f5',
              flexWrap: 'wrap',
            }}
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
                return (
                  <div
                    style={{
                      marginLeft: '8px',
                      marginTop: '5px',
                      backgroundColor:
                        player.playerID === playerID ? '#aaef88' : '#eaecec',
                      color: 'black',
                      padding: '6px',
                      cursor: 'pointer',
                      borderRadius: '3px',
                      fontWeight: 'bold',
                    }}
                    key={player.playerID}
                    onClick={() => {
                      setPlayerID(player.playerID);
                    }}
                  >
                    <span
                      style={{
                        color: getColorByPositionType(player.positionType),
                        fontWeight: 'bolder',
                        marginRight: '5px',
                      }}
                    >
                      {player.position1}
                    </span>
                    <span>{player.playerName}</span>
                  </div>
                );
              })}
          </div>

          {/* Detail info */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#f4f5f5',
              padding: '30px',
            }}
          >
            {/* Basic info*/}
            <div
              style={{
                width: '25%',
                padding: '20px',
                margin: '0 10px',
                borderRadius: '3px',
                background: 'var(--semi-color-bg-0)',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {/* Image */}
                <img
                  width={'116px'}
                  height={'116px'}
                  src={getAvatarUrl(playerDetail?.thisPlayer?.player_id)}
                  alt="player_avatar"
                  onError={(e) => {
                    e.currentTarget.src = player_avatar_placeholder;
                  }}
                />
                {/* Name */}
                <div style={{ fontWeight: 'bold' }}>
                  {playerDetail?.thisPlayer?.player_name}
                </div>
                {/* Position */}
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
                {/* Overall Rating -> Potential */}
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
              </div>

              {/*Player ID*/}
              <div className="stat">
                <span className="stat-label">
                  {localeData.BasicInfo.PlayerID}:
                </span>
                <span className="stat-info-value">
                  {playerDetail?.thisPlayer?.player_id}
                </span>
              </div>
              {/*Age*/}
              <div className="stat">
                <span className="stat-label">{localeData.BasicInfo.Age}:</span>
                <span className="stat-info-value">
                  {playerDetail?.thisPlayer?.age}
                </span>
              </div>
              {/*AcceleRATE	Controlled Explosive*/}

              {/*Skills*/}
              <div className="stat">
                <span className="stat-label">
                  {localeData.BasicInfo.Skills}:
                </span>
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
                <span className="stat-label">
                  {localeData.BasicInfo.WeakFoot}:
                </span>
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
                <span className="stat-label">{localeData.BasicInfo.Foot}:</span>
                <span className="stat-info-value">
                  {(playerDetail?.thisPlayer?.preferredfoot || 1) === 1
                    ? 'Right'
                    : 'Left'}
                </span>
              </div>
              {/*Height	177cm | 5'10"*/}
              <div className="stat">
                <span className="stat-label">
                  {localeData.BasicInfo.Height}:
                </span>
                <span className="stat-info-value">
                  {playerDetail?.thisPlayer?.height} cm
                </span>
              </div>
              {/*Weight	67*/}
              <div className="stat">
                <span className="stat-label">
                  {localeData.BasicInfo.Weight}:
                </span>
                <span className="stat-info-value">
                  {playerDetail?.thisPlayer?.weight} kg
                </span>
              </div>
              {/*Att. WR	High*/}
              <div className="stat">
                <span className="stat-label">
                  {localeData.BasicInfo.AttackingWorkRate}:
                </span>
                <span className="stat-info-value">
                  {getWorkRateText(playerDetail?.thisPlayer?.attackingworkrate)}
                </span>
              </div>
              {/*Def. WR	High*/}
              <div className="stat">
                <span className="stat-label">
                  {localeData.BasicInfo.DefensiveWorkRate}:
                </span>
                <span className="stat-info-value">
                  {getWorkRateText(playerDetail?.thisPlayer?.defensiveworkrate)}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="grid" style={{ width: '100%' }}>
              {playerDetail?.thisPlayer?.preferredposition1 == 0 && (
                <Row>
                  <AttributeSectionCol
                    title={localeData.Attributes.Goalkeeping}
                    attributes={[
                      { label: localeData.Attributes.GKDiving },
                      { label: localeData.Attributes.GKHandling },
                      { label: localeData.Attributes.GKKicking },
                      { label: localeData.Attributes.GKReflexes },
                      { label: localeData.Attributes.GKPositioning },
                    ]}
                    values={[
                      playerDetail?.thisPlayer?.gkdiving,
                      playerDetail?.thisPlayer?.gkhandling,
                      playerDetail?.thisPlayer?.gkkicking,
                      playerDetail?.thisPlayer?.gkreflexes,
                      playerDetail?.thisPlayer?.gkpositioning,
                    ]}
                  />
                </Row>
              )}
              <Row>
                <AttributeSectionCol
                  title={localeData.Attributes.Pace}
                  attributes={[
                    { label: localeData.Attributes.Acceleration },
                    { label: localeData.Attributes.SprintSpeed },
                  ]}
                  values={[
                    playerDetail?.thisPlayer?.acceleration,
                    playerDetail?.thisPlayer?.sprintspeed,
                  ]}
                />

                <AttributeSectionCol
                  title={localeData.Attributes.Shooting}
                  attributes={[
                    { label: localeData.Attributes.AttackingPosition },
                    { label: localeData.Attributes.Finishing },
                    { label: localeData.Attributes.ShotPower },
                    { label: localeData.Attributes.LongShots },
                    { label: localeData.Attributes.Volleys },
                    { label: localeData.Attributes.Penalties },
                  ]}
                  values={[
                    playerDetail?.thisPlayer?.positioning,
                    playerDetail?.thisPlayer?.finishing,
                    playerDetail?.thisPlayer?.shotpower,
                    playerDetail?.thisPlayer?.longshots,
                    playerDetail?.thisPlayer?.volleys,
                    playerDetail?.thisPlayer?.penalties,
                  ]}
                />

                <AttributeSectionCol
                  title={localeData.Attributes.Passing}
                  attributes={[
                    { label: localeData.Attributes.Vision },
                    { label: localeData.Attributes.Crossing },
                    { label: localeData.Attributes.FKAccuracy },
                    { label: localeData.Attributes.ShortPass },
                    { label: localeData.Attributes.LongPass },
                    { label: localeData.Attributes.Curve },
                  ]}
                  values={[
                    playerDetail?.thisPlayer?.vision,
                    playerDetail?.thisPlayer?.crossing,
                    playerDetail?.thisPlayer?.freekickaccuracy,
                    playerDetail?.thisPlayer?.shortpassing,
                    playerDetail?.thisPlayer?.longpassing,
                    playerDetail?.thisPlayer?.curve,
                  ]}
                />
              </Row>
              <Row>
                <AttributeSectionCol
                  title={localeData.Attributes.Dribbling}
                  attributes={[
                    { label: localeData.Attributes.Agility },
                    { label: localeData.Attributes.Balance },
                    { label: localeData.Attributes.Reactions },
                    { label: localeData.Attributes.BallControl },
                    { label: localeData.Attributes.Dribbling },
                    { label: localeData.Attributes.Composure },
                  ]}
                  values={[
                    playerDetail?.thisPlayer?.agility,
                    playerDetail?.thisPlayer?.balance,
                    playerDetail?.thisPlayer?.reactions,
                    playerDetail?.thisPlayer?.ballcontrol,
                    playerDetail?.thisPlayer?.dribbling,
                    playerDetail?.thisPlayer?.composure,
                  ]}
                />
                <AttributeSectionCol
                  title={localeData.Attributes.Defending}
                  attributes={[
                    { label: localeData.Attributes.Interceptions },
                    { label: localeData.Attributes.HeadingAccuracy },
                    { label: localeData.Attributes.DefensiveAwareness },
                    { label: localeData.Attributes.StandingTackle },
                    { label: localeData.Attributes.SlidingTackle },
                  ]}
                  values={[
                    playerDetail?.thisPlayer?.interceptions,
                    playerDetail?.thisPlayer?.headingaccuracy,
                    playerDetail?.thisPlayer?.defensiveawareness,
                    playerDetail?.thisPlayer?.standingtackle,
                    playerDetail?.thisPlayer?.slidingtackle,
                  ]}
                />
                <AttributeSectionCol
                  title={localeData.Attributes.Physical}
                  attributes={[
                    { label: localeData.Attributes.Jumping },
                    { label: localeData.Attributes.Stamina },
                    { label: localeData.Attributes.Strength },
                    { label: localeData.Attributes.Aggression },
                  ]}
                  values={[
                    playerDetail?.thisPlayer?.jumping,
                    playerDetail?.thisPlayer?.stamina,
                    playerDetail?.thisPlayer?.strength,
                    playerDetail?.thisPlayer?.aggression,
                  ]}
                />
              </Row>
            </div>
          </div>

          {/* Trends */}
          <Space
            style={{
              width: '95%',
              height: '400px',
              padding: '10px',
              backgroundColor: '#f4f5f5',
              borderRadius: '2px',
            }}
          >
            <ResponsiveContainer>
              <AreaChart
                accessibilityLayer
                height={400}
                data={playerDetail?.trends}
                margin={{
                  left: -20,
                  right: 12,
                }}
              >
                {/* 网格 */}
                <CartesianGrid vertical />
                {/* X轴 */}
                <XAxis
                  dataKey="inGameDate"
                  type={'category'}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                ></XAxis>
                {/* Y轴 */}
                <YAxis
                  domain={[40, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                ></YAxis>
                {/* 提示 */}
                <Tooltip content={<CustomTooltip />} />
                {/* 数据 */}
                <Area
                  dataKey="potential"
                  type="linear"
                  fill="#125427"
                  fillOpacity={0.4}
                  stroke="#125427"
                />
                <Area
                  dataKey="overallRating"
                  type="linear"
                  fill="#1dc355"
                  fillOpacity={0.4}
                  stroke="#1dc355"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Space>
        </div>
      )}
    </LocaleConsumer>
  ) : (
    <NoDataComponent />
  );
}

export default PlayerDetailPage;

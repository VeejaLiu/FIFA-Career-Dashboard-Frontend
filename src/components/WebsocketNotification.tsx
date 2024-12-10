import { useEffect } from 'react';
import { Image, Notification, Space } from '@douyinfe/semi-ui';

import { getAvatarUrl, getColorByDiff } from '../common/player-helper.ts';
import { getToken } from '../common/common.ts';

let reconnectInterval = 1000; // Initial reconnect interval
const maxReconnectInterval = 30000; // Maximum reconnect interval

/**
 * Send notification when player overall rating updated
 * @param payload
 */
function overratingChangeNotification(payload: any) {
  // {
  //     "playerID": 276839,
  //     "playerName": "Sebastiano Desplanches",
  //     "oldOverallrating": 1,
  //     "overallrating": 2,
  //     "oldPotential": 1,
  //     "potential": 2
  // }
  const {
    playerID,
    playerName,
    oldOverallrating,
    overallrating,
    oldPotential,
    potential,
  } = payload;
  Notification.open({
    title: 'Overall rating / Potential Update',
    content: (
      <Space align={'end'}>
        <Image
          width={'80px'}
          height={'80px'}
          src={getAvatarUrl(playerID)}
          alt="player_avatar"
          preview={false}
        />
        <Space vertical align={'start'}>
          <div>
            <span style={{ fontWeight: 'bold' }}> {playerName}</span>
            <span style={{ color: '#999' }}> [ID: {playerID}]</span>
          </div>
          <div>
            <span style={{ marginRight: '8px' }}>Overall rating: </span>
            <span style={{ marginRight: '8px', color: '#999' }}>
              {oldOverallrating}
            </span>
            <span style={{ marginRight: '8px' }}>{'->'}</span>
            <span
              style={{
                fontWeight: 'bold',
                color: getColorByDiff(overallrating - oldOverallrating),
              }}
            >
              {overallrating}
            </span>
          </div>
          <div>
            <span style={{ marginRight: '8px' }}>Potential: </span>
            <span style={{ marginRight: '8px', color: '#999' }}>
              {oldPotential}
            </span>
            <span style={{ marginRight: '8px' }}>{'->'}</span>
            <span
              style={{
                fontWeight: 'bold',
                color: getColorByDiff(potential - oldPotential),
              }}
            >
              {potential}
            </span>
          </div>
        </Space>
      </Space>
    ),
    duration: 10,
    theme: 'light',
  });
}

function skillMoveChangeNotification(payload: any) {
  // {
  //     "playerID": 276839,
  //     "playerName": "Sebastiano Desplanches",
  //     "oldSkillMoves": 1,
  //     "skillmoves": 2
  // }
  const { playerID, playerName, oldSkillMoves, skillMoves } = payload;
  Notification.open({
    title: 'Skillmoves Update',
    content: (
      <Space align={'end'}>
        <Image
          width={'80px'}
          height={'80px'}
          src={getAvatarUrl(playerID)}
          alt="player_avatar"
          preview={false}
        />
        <Space vertical align={'start'}>
          <div>
            <span style={{ fontWeight: 'bold' }}> {playerName}</span>
            <span style={{ color: '#999' }}> [ID: {playerID}]</span>
          </div>
          <div>
            <span style={{ marginRight: '8px' }}>Skill Move: </span>
            <span style={{ marginRight: '8px', color: '#999' }}>
              {oldSkillMoves}
            </span>
            <span style={{ marginRight: '8px' }}>{'->'}</span>
            <span
              style={{
                fontWeight: 'bold',
                color: getColorByDiff(skillMoves - oldSkillMoves),
              }}
            >
              {skillMoves}
            </span>
          </div>
        </Space>
      </Space>
    ),
    duration: 10,
    theme: 'light',
  });
}

function weakFootChangeNotification(payload: any) {
  // {
  //     "playerID": 276839,
  //     "playerName": "Sebastiano Desplanches",
  //     "oldWeakFootAbilityTypeCode": 1,
  //     "weakFootAbilityTypeCode": 2
  // }
  const {
    playerID,
    playerName,
    oldWeakFootAbilityTypeCode,
    weakFootAbilityTypeCode,
  } = payload;
  Notification.open({
    title: 'Weak Foot',
    content: (
      <Space align={'end'}>
        <Image
          width={'80px'}
          height={'80px'}
          src={getAvatarUrl(playerID)}
          alt="player_avatar"
          preview={false}
        />
        <Space vertical align={'start'}>
          <div>
            <span style={{ fontWeight: 'bold' }}> {playerName}</span>
            <span style={{ color: '#999' }}> [ID: {playerID}]</span>
          </div>
          <div>
            <span style={{ marginRight: '8px' }}>Weak Foot: </span>
            <span style={{ marginRight: '8px', color: '#999' }}>
              {oldWeakFootAbilityTypeCode}
            </span>
            <span style={{ marginRight: '8px' }}>{'->'}</span>
            <span
              style={{
                fontWeight: 'bold',
                color: getColorByDiff(
                  weakFootAbilityTypeCode - oldWeakFootAbilityTypeCode,
                ),
              }}
            >
              {weakFootAbilityTypeCode}
            </span>
          </div>
        </Space>
      </Space>
    ),
    duration: 10,
    theme: 'light',
  });
}

export const WebsocketNotification = () => {
  async function createWebSocketConnection() {
    const token = getToken();
    if (!token) {
      console.log(
        'Cannot create WebSocket connection: token not found. And will retry in 5 seconds',
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return createWebSocketConnection();
    }

    // Create a new WebSocket connection
    const socket = new WebSocket(import.meta.env.VITE_WS_URL, token);

    // WebSocket connection established
    socket.onopen = () => {
      console.log('[WebSocket][onopen] connection established');
      // Send ping message every 10 seconds
      setInterval(() => {
        socket.send('ping');
      }, 30 * 1000);
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const newNotification = event.data;
      console.log(
        '[WebSocket][onmessage] event.data=',
        JSON.stringify(newNotification),
      );

      if (!newNotification || newNotification === '') {
        console.log('Received empty message, ignore it');
        return;
      }

      if (newNotification === 'pong') {
        console.log('Received pong message, ignore it');
        return;
      }

      if (newNotification === 'Protocol accepted') {
        console.log('Received protocol accepted message, ignore it');
        return;
      }

      let type = '';
      let payload: any = {};
      try {
        const parsed = JSON.parse(newNotification);
        type = parsed.type;
        payload = parsed.payload;
      } catch (e) {
        console.error(
          '[WebSocket][onmessage] Failed to parse incoming message:',
          e,
        );
        return;
      }
      console.log('[WebSocket][onmessage] type:', type, 'payload:', payload);
      switch (type) {
        case 'PlayerUpdate.Overall': {
          overratingChangeNotification(payload);
          break;
        }
        case 'PlayerUpdate.SkillMove': {
          skillMoveChangeNotification(payload);
          break;
        }
        case 'PlayerUpdate.WeakFoot': {
          weakFootChangeNotification(payload);
          break;
        }
        default:
          console.log('Unknown message type:', type);
      }
    };

    // 连接关闭时的处理
    socket.onclose = () => {
      console.log(
        `[WebSocket][onclose] connection closed, will reconnect in ${reconnectInterval} ms`,
      );
      setTimeout(createWebSocketConnection, reconnectInterval);
      reconnectInterval = Math.min(2 * reconnectInterval, maxReconnectInterval);
    };
  }

  useEffect(() => {
    createWebSocketConnection().then(
      () => {
        console.log('WebSocket connection established');

        /*
         * Test code
         */
        // overratingChangeNotification({
        //   playerID: 276839,
        //   playerName: 'Sebastiano Desplanches',
        //   oldOverallrating: 89,
        //   overallrating: 90,
        //   oldPotential: 91,
        //   potential: 91,
        // });
        //
        // skillMoveChangeNotification({
        //   playerID: 276839,
        //   playerName: 'Sebastiano Desplanches',
        //   oldSkillMoves: 3,
        //   skillMoves: 4,
        // });
        //
        // weakFootChangeNotification({
        //   playerID: 276839,
        //   playerName: 'Sebastiano Desplanches',
        //   oldWeakFootAbilityTypeCode: 4,
        //   weakFootAbilityTypeCode: 5,
        // });
      },
      (err) => {
        console.error('Failed to establish WebSocket connection', err);
      },
    );
  }, []);

  return <></>;
};

import { useEffect } from 'react';
import { Notification, Space } from '@douyinfe/semi-ui';

let reconnectInterval = 1000; // 初始重连间隔
const maxReconnectInterval = 30000; // 最大重连间隔

function getColorByDiff(diff: number) {
  switch (true) {
    case diff > 0:
      return '#2ef72e';
    case diff < 0:
      return '#dc3545';
    default:
      return '#999';
  }
}

/**
 * Send notification when player overall rating updated
 * @param payload
 */
function overratingChangeNotification(payload: any) {
  const {
    playerID,
    playerName,
    oldOverallrating,
    overallrating,
    oldPotential,
    potential,
  } = payload;
  Notification.success({
    title: 'Player Update',
    // content: `Player ${playerName}[${playerID}] updated: overallrating ${oldOverallrating} -> ${overallrating}, potential ${oldPotential} -> ${potential}`,
    content: (
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
    ),
    duration: 30000,
    theme: 'light',
  });
}

export const WebsocketNotification = () => {
  async function createWebSocketConnection() {
    const token = localStorage.getItem('fcd-token');
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
      }, 10 * 1000);
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
      },
      (err) => {
        console.error('Failed to establish WebSocket connection', err);
      },
    );
  }, []);

  return <></>;
};

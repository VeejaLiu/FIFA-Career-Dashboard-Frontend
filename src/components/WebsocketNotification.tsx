import { useEffect } from 'react';
import { Notification } from '@douyinfe/semi-ui';

let reconnectInterval = 1000; // 初始重连间隔
const maxReconnectInterval = 30000; // 最大重连间隔

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
    const socket = new WebSocket('ws://localhost:8889', token);

    // WebSocket connection established
    socket.onopen = () => {
      console.log('[WebSocket][onopen] connection established');
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const newNotification = event.data;
      console.log('[WebSocket][onmessage] event.data=', newNotification);
      const { type, payload } = JSON.parse(newNotification);
      console.log('[WebSocket][onmessage] type:', type, 'payload:', payload);
      switch (type) {
        case 'PlayerUpdate.Overall': {
          // playerID: playerID,
          // playerName: playerName,
          // oldOverallrating: existingPlayer.overallrating,
          // overallrating: overallrating,
          // oldPotential: existingPlayer.potential,
          // potential: potential,
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
            content: `Player ${playerName}[${playerID}] updated: overallrating ${oldOverallrating} -> ${overallrating}, potential ${oldPotential} -> ${potential}`,
            duration: 30,
          });
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

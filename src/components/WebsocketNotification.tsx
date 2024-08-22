import { useEffect } from 'react';
import { Notification, Space } from '@douyinfe/semi-ui';

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
    const socket = new WebSocket(import.meta.env.VITE_WS_URL, token);

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
                  <span
                    style={{
                      marginRight: '8px',
                      color: '#999',
                    }}
                  >
                    {oldOverallrating}
                  </span>
                  <span style={{ marginRight: '8px' }}>{'->'}</span>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color:
                        overallrating > oldOverallrating
                          ? '#2ef72e'
                          : '#dc3545',
                    }}
                  >
                    {overallrating}
                  </span>
                </div>
                <div>
                  <span style={{ marginRight: '8px' }}>Potential: </span>
                  <span
                    style={{
                      marginRight: '8px',
                      color: '#999',
                    }}
                  >
                    {oldPotential}
                  </span>
                  <span style={{ marginRight: '8px' }}>{'->'}</span>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: potential > oldPotential ? '#2ef72e' : '#dc3545',
                    }}
                  >
                    {potential}
                  </span>
                </div>
              </Space>
            ),
            duration: 30000,
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

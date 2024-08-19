import { useEffect } from 'react';
import { Notification } from '@douyinfe/semi-ui';

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
      console.log('[WebSocket][onmessage] ', JSON.stringify(newNotification));
    };

    // 连接关闭时的处理
    socket.onclose = () => {
      console.log('[WebSocket][onclose] connection closed');
    };
  }

  useEffect(() => {
    createWebSocketConnection().then(
      () => {
        console.log('WebSocket connection established');
        Notification.success({
          title: 'Success',
          content: 'WebSocket connection established',
          duration: 3,
        });
      },
      (err) => {
        console.error('Failed to establish WebSocket connection', err);
      },
    );
  }, []);

  return <></>;
};

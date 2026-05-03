// utils/socketHandler.ts

import { Socket } from 'socket.io';

const socketHandler = (handler: (...args: any[]) => Promise<void>, socket: Socket) => {
  return (...args: any[]) => {
    Promise.resolve(handler(...args)).catch((err) => {
      console.error('Socket error:', err);
      socket.emit('error', {
        message: err.message || 'Something went wrong',
      });
    });
  };
};

export { socketHandler };

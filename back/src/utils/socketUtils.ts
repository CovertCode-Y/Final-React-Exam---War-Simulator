// src/utils/socketUtils.ts
import { Server } from 'socket.io';

let io: Server;

export const setSocket = (socketIoInstance: Server) => {
  io = socketIoInstance;
};

export const getSocket = (): Server => {
  return io;
};

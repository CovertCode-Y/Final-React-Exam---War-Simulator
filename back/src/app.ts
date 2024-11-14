// src/app.ts
import express from 'express';
import { connectDB } from './database/database';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import missileRoute from './routes/missileRoutes';
import http from 'http';
import { Server } from 'socket.io';
import { setSocket } from './utils/socketUtils';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  }
});

setSocket(io); 

const PORT = 3000;
app.use(express.json());
app.use(cors());

connectDB()

app.use('/api/auth', authRoute);
app.use('/api/missiles', missileRoute);


io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

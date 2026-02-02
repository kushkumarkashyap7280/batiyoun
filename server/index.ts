import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// ✅ IMPORT FROM COMMON (The Magic Link)
import { MessageSchema, MessageType } from '@batiyoun/common';

const app = express();
app.use(cors({ origin: "*" })); 

const httpServer = createServer(app);

// Simple Socket.IO setup - CORS is already handled by Express
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (rawData: unknown) => {
    // 1. VALIDATE: Check if the data matches our 'Common' rule
    const result = MessageSchema.safeParse(rawData);
    
    if (!result.success) {
      // If validation fails, tell the hacker/user to go away
      console.log("Invalid message received:", result.error);
      return; 
    }

    // 2. USE: Typescript now knows 'data' is exactly 'MessageType'
    const data: MessageType = result.data;
    console.log(`Broadcasting to room ${data.room}:`, data.content);
    
    // 3. SEND: Broadcast to everyone
    io.emit('message', data);
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { app } from './src/app';
import { connectDB } from './src/config/db';
import { env } from './src/config/env';
import { initializeSocket } from './src/sockets';

dotenv.config();
connectDB();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
  pingTimeout: 60000,
});

initializeSocket(io);

// handle listen errors (e.g. port already in use)
httpServer.on('error', (err: any) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(
      `Port ${env.PORT} is already in use.\n` +
        `- Stop the process using the port (e.g. \`lsof -i :${env.PORT}\` or \`ss -ltnp | grep ${env.PORT}\`).\n` +
        `- Or change PORT in your .env and restart.`,
    );
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});

httpServer.listen(env.PORT, () => {
  console.log(`
  🚀 Batiyoun Server Running
  --------------------------
  Url: http://localhost:${env.PORT}
  Client: ${env.CLIENT_URL}
  `);
});

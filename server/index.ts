import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { app } from "./src/app";
import { connectDB } from "./src/config/db";
import { env } from "./src/config/env";
import { initializeSocket } from "./src/sockets";




dotenv.config();
connectDB();

const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true 
  },
  pingTimeout: 60000,
});


initializeSocket(io);

httpServer.listen(env.PORT, () => {
  console.log(`
  🚀 Batiyoun Server Running
  --------------------------
  Url: http://localhost:${env.PORT}
  Client: ${env.CLIENT_URL}
  `);
});
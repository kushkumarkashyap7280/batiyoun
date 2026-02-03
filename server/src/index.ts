import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { env } from "./config/env";

// 1. Config
dotenv.config();
const PORT = env.PORT || 4000;
// 2. Database
connectDB();

// 3. App Setup
const app = express();
const httpServer = createServer(app);

// 4. Middlewares
app.use(cors());
app.use(express.json());

// 5. Socket Setup
const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// 6. Socket Logic (Placeholder for Route Controller)
io.on("connection", (socket) => {
  console.log(`🔌 Client Connected: ${socket.id}`);
  
  // Later, we will do: socketController(io, socket);
  
  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});

// 7. Start
httpServer.listen(PORT, () => {
  console.log(`
  🚀 Batiyoun Server Running
  --------------------------
  Url: http://localhost:${PORT}
  Env: ${env.NODE_ENV}
  `);
});
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { env } from "./config/env";

dotenv.config();
const PORT = env.PORT || 4000;
connectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`🔌 Client Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`
  🚀 Batiyoun Server Running
  --------------------------
  Url: http://localhost:${PORT}
  Env: ${env.NODE_ENV}
  `);
});
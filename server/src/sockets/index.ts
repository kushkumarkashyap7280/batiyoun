import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { env } from "../config/env";


export const initializeSocket = (io: Server) => {
  

  io.use((socket, next) => {
    try {
      let token = socket.handshake.auth?.token;
      if (!token) {
        const rawCookies = socket.request.headers.cookie || "";
        const parsedCookies = cookie.parse(rawCookies);
        token = parsedCookies["access_token"];
      }

      if (!token) return next(new Error("Authentication error"));

      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as any;
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });


  io.on("connection", (socket) => {
    const user = socket.data.user;
    console.log(`🟢 ${user.username} Connected (${socket.id})`);


    socket.join(user.id);

 
    // userHandler(io, socket);
    // chatHandler(io, socket); // In the future, just uncomment this!
  });
};
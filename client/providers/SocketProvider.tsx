"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthProvider";
// import { useRouter } from "next/navigation";


// const router = useRouter();

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Only connect socket if user is logged in
    if (!user) {
      // User is not logged in, disconnect if socket exists
      if (socket) {
        console.log("SocketProvider: Disconnecting socket (user not logged in)");
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // Check if socket already exists and is connected
    if (socket) {
      return; // Already connected, don't create a new one
    }

    console.log("SocketProvider: Establishing socket connection for user:", user.id);
    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => {
      console.log("SocketProvider: Socket connected for user:", user.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("SocketProvider: Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("error", (error) => {
      console.error("SocketProvider: Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      console.log("SocketProvider: Cleanup - disconnecting socket");
      socketInstance.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

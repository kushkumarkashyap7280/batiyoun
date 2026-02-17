"use client";

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/store/zustandUserStore";

// 1. Define the Context Shape
type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};


const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});


export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const refreshAccessToken = useUserStore((state) => state.refreshAccessToken);

  useEffect(() => {

    if(!navigator.onLine) {
      console.warn("⚠️ Offline: Socket connection will be attempted when back online.");
      return;
    }

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      withCredentials: true,
      autoConnect: false,
    });

    // B. Setup Listeners
    socketInstance.on("connect", () => {
      console.log("🟢 Connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Disconnected");
      setIsConnected(false);
    });


    socketInstance.on("connect_error", async (err) => {
      if (err.message === "Authentication error") {
        console.log("Socket Auth Failed. Refreshing...");
        const isAlive = await refreshAccessToken();
        if (isAlive) {
            socketInstance.connect();
        } 
      }
    });

    socketInstance.connect();
    setSocket(socketInstance);

   
    return () => {
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
    };
  }, []); 


  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
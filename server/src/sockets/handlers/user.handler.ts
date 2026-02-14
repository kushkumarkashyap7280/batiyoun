import { Socket } from "socket.io";
import User from "../../models/user.model";

export const userHandler = (io: any, socket: Socket) => {
  const tokenUser = socket.data.user;


  const syncUser = async () => {
    try {
      await User.findByIdAndUpdate(
        tokenUser.id,
        {
          _id: tokenUser.id,
          username: tokenUser.username,
          email: tokenUser.email,
          fullName: tokenUser.fullName,
          avatar: tokenUser.avatar,
          isAdmin: tokenUser.isAdmin,
          isOnline: true,
          lastSeen: new Date(),
        },
        { upsert: true, new: true }
      );
   
      socket.broadcast.emit("user_status", { userId: tokenUser.id, status: "online" });
      
    } catch (err) {
      console.error("MongoDB Sync Error:", err);
    }
  };


  const handleDisconnect = async () => {
    console.log(`🔴 ${tokenUser.username} Disconnected`);
    
    await User.findByIdAndUpdate(tokenUser.id, { 
      isOnline: false, 
      lastSeen: new Date() 
    });

    socket.broadcast.emit("user_status", { userId: tokenUser.id, status: "offline" });
  };

 
  syncUser();


  socket.on("disconnect", handleDisconnect);
};
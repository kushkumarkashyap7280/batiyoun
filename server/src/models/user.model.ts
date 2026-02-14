import mongoose from "mongoose";
import { User } from "../types/types";



const userSchema = new mongoose.Schema<User>({
 _id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  avatar: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
  publicKey: { type: String, default: null },
},{
    _id: false, 
  timestamps: true
});

const User = mongoose.model<User>("User", userSchema);

export default User;
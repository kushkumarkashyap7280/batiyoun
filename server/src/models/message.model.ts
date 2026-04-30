import mongoose from "mongoose";
import { BMessage } from "../types/types";

const messageSchema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
},{ 
    timestamps: true
});

export default mongoose.model<BMessage>("Message", messageSchema);  
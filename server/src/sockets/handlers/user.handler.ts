// import { Server, Socket } from "socket.io";
// import Conversation from "../../models/conversation.model";
// import Message from "../../models/message.model";


// export const handleUserConnection = (io:Server , socket : Socket ) => {

//     socket.on("send-message",async ({senderId,receiverId , content})=>{
//         // see if conversation  exists
//         let conversationId : string;
//         const existingConversation = await Conversation.findOne({
//             participants : { $in : [senderId , receiverId ] }
//         })

//         if (existingConversation) {
//             console.log("existing ",existingConversation);
//             conversationId = existingConversation._id.toString();
//             const message = await Message.create({
//                 conversationId,
//                 senderId,
//                 content,
//             })

//             const savedMessage = await message.save();

//           await Conversation.updateOne(
//             {_id : existingConversation._id},
//             {
//                 $set : {lastMessage : message._id},
//             }
//           )
           
//         } else {

//             const newConversation = await Conversation.create({
//                 participants : [senderId,receiverId]
//             })
            
//         }

        
//     })
// }
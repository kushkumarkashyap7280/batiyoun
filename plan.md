what batiyoun chat application pwa will provide :

mvp:

2.chatting using socket.io for real time communication between two users

---

future features:

3.kush-e2e package for end to end encryption for message security
npm install kush-e2e

import { KushE2E } from 'kush-e2e';

// Create identities
const identity1 = await KushE2E.createIdentity();
const identity2 = await KushE2E.createIdentity();

// Derive shared session key
const sessionKey = await KushE2E.deriveSessionKey(
identity1.privateKey,
identity2.publicKey
);

// Encrypt message
const encrypted = await KushE2E.encrypt('Hello World', sessionKey);

// Decrypt message
const decrypted = await KushE2E.decrypt(encrypted, sessionKey);
console.log(decrypted); // "Hello World"

this is encryption i need to save the keys in indexdb and use them to encrypt and decrypt messages

4.offline access using service workers to paint html and cache it and indexdb to save messages and conversations

5.create groups and add users to them

6.send messages to groups

---

cureeently we have :

we have pages

(public)
/
/login
/signup

(protected)
/chats
/chats/:conversationId
/notifications
/profile
/settings

provider components

1.AuthProvider

this provides initial verification of user logged in or not
and redirect to /chats if logged in else to /

2.SocketProvider

it maintains a connection between client and server using socket.io
and provides methods to send and receive messages and also manage all chats
, how to send notify in ui , how to send messages in ui which chat , which user

---

# ui /ux:

for pubic pages we have to use metadata to for seo so in each page.tsx we have

export const metadata = {
title: "Batiyoun - The Chat App",
description: "Chat with your friends and family",
};

export default function Page() {
return (
<PageClient /> // this is a client component which handles the ui using react hooks for search params and other stuff

    );

}

each public page has a page.tsx and a PageClient.tsx
page.tsx for server meta data and server components
PageClient.tsx for client components and ui using react hooks

protected pages are client side rendered pages : no metadata for protected pages

---

each page client divdes like in a folder :

@/Components/pages/pageName/PageClient.tsx
/SubComponents/
/Component1
/Component1.tsx
/Component1.module.css
/Component2
/Component2.tsx
/Component2.module.css
/Component3
/Component3.tsx
/Component3.module.css

---

UI on Desktop for protected pages:

    4% side bar for naviagtion to /chats /notifications /profile /settings
    96% main content

    for /chat page :
    naviagationsidebar || /chats  || /chat/:conversationId

    side by side

UI on Mobile for protected pages:

bottom have bottomnavigationbar for naviagtion to /chats /profile /settings

for /chats page: it show /chats

for /chat/:conversationId page: it show /chat/:conversationId

means either /chat or /chat/:conversationId not both at same time

---

/chats

ui is going like top have :

1.  serach user by username Component :when serach it show list of user have closet prefix of username , show some details like user image and username
    and if conversation not exist show a button and input for first message , other with already have conversation id in search user also show chat with details of conversation like user image and username but not button and input for first message  
    on sending first message showing spinner on button and then success redirect to /chats/:conversationId

all serach user result have pagination in api so we use tankstack query with 5 user per page

2.chat list Component :

it show all conversation id of the user and show list of conversation where last message also shown
like

1. userimage
   2.username
   3.last message
   4.time of last message
   5.unread message count
2. when click on conversation it redirect to /chat/:conversationId

3. for /chat/:conversationId page

since all methods share by socket provider it just listen and show in ui ,
for ex : receive message it show in ui and send message it show in ui

for details see userhandler.ts in server folder and components in @/components/pages/chat/ChatClient.tsx and its components

# things to keep in mind :

every button should have

- initial state (show normal ui)
- loading state (show spinner on button) disable button on this state so user cant click again
- success state (show tick mark on button) on success
- error state (show cross mark on button and retry option) on error and show error message in toast
  and also show ui based on it

we are using module.css instead of tailwindcss for styling :

all ui components have style.module.css and its sub components have their own style.module.css

use lucide react of icons and global.css already have varibles so u can import in style.module.css file too...

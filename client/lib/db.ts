// import { openDB, DBSchema, IDBPDatabase } from 'idb';

// // 1. Define the Shape of your Local Database
// interface BatiyounDB extends DBSchema {
//   // 🔐 Security Store: Holds the E2E Private Key
//   security: {
//     key: string; // 'privateKey' | 'publicKey'
//     value: string; // The CryptoKey in string format
//   };
  
//   // 💬 Message Store: Holds chat history for offline reading
//   messages: {
//     key: string; // uuid
//     value: {
//       id: string;
//       content: string; // Encrypted string
//       senderId: string;
//       spaceId?: string; // If group chat
//       receiverId?: string; // If DM
//       createdAt: string;
//       status: 'sending' | 'sent' | 'failed' | 'read';
//     };
//     indexes: { 
//       'by-space': string; // To quickly get "All messages in Space X"
//       'by-peer': string;  // To quickly get "All DMs with User Y"
//       'by-status': string; // To find unsent messages
//     };
//   };

//   // ⚙️ Settings Store: Preferences
//   settings: {
//     key: string;
//     value: boolean | string | number;
//   };
// }

// const DB_NAME = 'batiyoun-offline-db';
// const DB_VERSION = 1;

// // 2. Initialize the Database
// export const initDB = async (): Promise<IDBPDatabase<BatiyounDB>> => {
//   return openDB<BatiyounDB>(DB_NAME, DB_VERSION, {
//     upgrade(db) {
//       // Create Security Store
//       if (!db.objectStoreNames.contains('security')) {
//         db.createObjectStore('security', { keyPath: 'key' });
//       }

//       // Create Messages Store with Indexes
//       if (!db.objectStoreNames.contains('messages')) {
//         const store = db.createObjectStore('messages', { keyPath: 'id' });
//         store.createIndex('by-space', 'spaceId');
//         store.createIndex('by-peer', 'receiverId');
//         store.createIndex('by-status', 'status');
//       }

//       // Create Settings Store
//       if (!db.objectStoreNames.contains('settings')) {
//         db.createObjectStore('settings', { keyPath: 'key' });
//       }
//     },
//   });
// };

// // --- 3. Helper Functions (The API) ---

// export const savePrivateKey = async (key: string) => {
//   const db = await initDB();
//   await db.put('security', { key: 'privateKey', value: key });
// };

// export const getPrivateKey = async () => {
//   const db = await initDB();
//   const result = await db.get('security', 'privateKey');
//   return result?.value;
// };

// export const saveMessageLocal = async (msg: BatiyounDB['messages']['value']) => {
//   const db = await initDB();
//   await db.put('messages', msg);
// };

// export const getOfflineMessages = async (spaceId: string) => {
//   const db = await initDB();
//   return db.getAllFromIndex('messages', 'by-space', spaceId);
// };
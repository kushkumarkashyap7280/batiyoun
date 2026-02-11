import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';


export default async function ChatPage() {
  // Get access token


  try {
  

    // TODO: Fetch user's chats from database
    // For now, pass mock data structure
    const mockChats :any = [];

   return <>
     chat placeholder
   </>
  } catch (error) {
    console.error('Auth error:', error);
    redirect('/login');
  }
}

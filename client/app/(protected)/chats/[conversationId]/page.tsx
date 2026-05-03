import ChatClient from '@/components/pages/chat/ChatClient';

interface Props {
  params: Promise<{ conversationId: string }>;
}

export default async function ConversationPage({ params }: Props) {
  const { conversationId } = await params;
  return <ChatClient conversationId={conversationId} />;
}

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MessageSquare, Upload, Video } from 'lucide-react';

export function MobileTabbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'chats';

  const handleTabChange = (tab: string) => {
    if (tab === 'chats') {
      router.push('/chat');
    } else {
      router.push(`/chat?tab=${tab}`);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-line rounded-t-3xl shadow-2xl">
      <div className="mx-auto px-4 py-4 flex items-center justify-around gap-3">
        {/* Chats Tab */}
        <button
          onClick={() => handleTabChange('chats')}
          className="flex flex-col items-center gap-2 py-2 px-4 transition-all duration-200 flex-1 group"
        >
          <MessageSquare
            className={`w-6 h-6 transition-all duration-200 ${
              activeTab === 'chats'
                ? 'text-green-500 drop-shadow-lg drop-shadow-green-500/50'
                : 'text-muted group-hover:text-green-500/70'
            }`}
          />
          <span
            className={`text-xs font-semibold transition-colors duration-200 ${
              activeTab === 'chats' ? 'text-green-500' : 'text-muted group-hover:text-default'
            }`}
          >
            Chats
          </span>
        </button>

        {/* Upload Tab */}
        <button
          onClick={() => handleTabChange('upload')}
          className="flex flex-col items-center gap-2 py-2 px-4 transition-all duration-200 flex-1 group"
        >
          <Upload
            className={`w-6 h-6 transition-all duration-200 ${
              activeTab === 'upload'
                ? 'text-green-500 drop-shadow-lg drop-shadow-green-500/50'
                : 'text-muted group-hover:text-green-500/70'
            }`}
          />
          <span
            className={`text-xs font-semibold transition-colors duration-200 ${
              activeTab === 'upload' ? 'text-green-500' : 'text-muted group-hover:text-default'
            }`}
          >
            Upload
          </span>
        </button>

        {/* Meetings Tab */}
        <button
          onClick={() => handleTabChange('meetings')}
          className="flex flex-col items-center gap-2 py-2 px-4 transition-all duration-200 flex-1 group"
        >
          <Video
            className={`w-6 h-6 transition-all duration-200 ${
              activeTab === 'meetings'
                ? 'text-green-500 drop-shadow-lg drop-shadow-green-500/50'
                : 'text-muted group-hover:text-green-500/70'
            }`}
          />
          <span
            className={`text-xs font-semibold transition-colors duration-200 ${
              activeTab === 'meetings' ? 'text-green-500' : 'text-muted group-hover:text-default'
            }`}
          >
            Meetings
          </span>
        </button>
      </div>
    </nav>
  );
}

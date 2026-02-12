'use client';

const mockChats = [
  { id: '1', name: 'Aarav Sharma', lastMessage: 'Did you check the build?', time: '2:40 PM', unread: 2 },
  { id: '2', name: 'Priya Nair', lastMessage: 'Lets sync after lunch.', time: '1:18 PM', unread: 0 },
  { id: '3', name: 'Kabir Joshi', lastMessage: 'Sent the files to you.', time: '11:05 AM', unread: 1 },
  { id: '4', name: 'Sana Khan', lastMessage: 'Can we review the UI today?', time: '9:32 AM', unread: 0 },
  { id: '5', name: 'Rohan Mehta', lastMessage: 'Thanks! Looks good.', time: 'Yesterday', unread: 0 },
];

export default function ChatPage() {
  return (
    <div className="h-full bg-page">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-surface border border-line rounded-2xl p-4 sm:p-5 shadow-sm">
          <h1 className="text-lg sm:text-xl font-semibold text-default mb-3">Chats</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by username"
              className="w-full h-11 sm:h-12 rounded-xl border border-line bg-card px-4 text-sm sm:text-base text-default placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Search by username"
            />
          </div>
        </div>

        <section className="mt-4 bg-surface border border-line rounded-2xl p-3 sm:p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-subtle uppercase tracking-wide px-1 sm:px-2 mb-2">Recent</h2>
          <div className="space-y-2">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between gap-3 px-3 sm:px-4 py-3 rounded-xl bg-card hover:bg-hover-surface transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-default truncate">{chat.name}</span>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-accent text-xs text-white">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted truncate">{chat.lastMessage}</p>
                </div>
                <span className="text-xs text-subtle shrink-0">{chat.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

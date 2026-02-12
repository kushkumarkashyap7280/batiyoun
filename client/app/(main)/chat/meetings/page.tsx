'use client';

import { VideoIcon, Plus, Clock, Users } from 'lucide-react';

const mockMeetings = [
  { id: '1', title: 'Team Standup', time: '2:00 PM', date: 'Today', participants: 5 },
  { id: '2', title: 'Design Review', time: '3:30 PM', date: 'Today', participants: 3 },
  { id: '3', title: 'Client Call', time: '10:00 AM', date: 'Tomorrow', participants: 2 },
];

export default function MeetingsTab() {
  return (
    <div className="h-full bg-page overflow-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-20">
        <div className="bg-surface border border-line rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-default">Meetings</h1>
            <p className="text-sm text-muted mt-1">Start or join video calls</p>
          </div>
          <button className="p-2 sm:p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Start New Meeting */}
        <div className="mt-4">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 sm:p-8">
            <VideoIcon className="w-10 h-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-default mb-2">Start a New Meeting</h3>
            <p className="text-sm text-muted mb-4">Instantly start a video call or create a meeting link to share</p>
            <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
              Start Meeting
            </button>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-subtle uppercase tracking-wide px-1 sm:px-2 mb-4">Upcoming</h2>
          <div className="space-y-3">
            {mockMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-surface border border-line rounded-xl p-4 hover:bg-hover-surface transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-default truncate">{meeting.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{meeting.time}</span>
                      </div>
                      <span>•</span>
                      <span>{meeting.date}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{meeting.participants}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors whitespace-nowrap">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

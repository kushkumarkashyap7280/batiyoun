'use client';

import { Bell, Shield, Palette, Globe, Key, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <aside className="w-60 bg-[#2b2d31] border-r border-black/20 p-4">
        <h2 className="text-xs font-semibold text-[#949ba4] uppercase tracking-wide mb-2 px-2">
          User Settings
        </h2>
        <nav className="space-y-0.5">
          {[
            { icon: Bell, label: 'Notifications', active: true },
            { icon: Shield, label: 'Privacy & Safety', active: false },
            { icon: Palette, label: 'Appearance', active: false },
            { icon: Globe, label: 'Language', active: false },
            { icon: Key, label: 'Encryption Keys', active: false },
            { icon: Database, label: 'Data & Storage', active: false },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-sm ${
                  item.active
                    ? 'bg-[#404249] text-white'
                    : 'text-[#b5bac1] hover:bg-[#404249] hover:text-[#dbdee1]'
                } transition-colors`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-[#b5bac1]">Manage how you receive notifications</p>
          </div>

          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#2b2d31] rounded-lg">
                <div>
                  <h3 className="font-semibold text-white mb-1">Direct Messages</h3>
                  <p className="text-sm text-[#b5bac1]">Get notified when someone sends you a message</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2b2d31] rounded-lg">
                <div>
                  <h3 className="font-semibold text-white mb-1">Sound</h3>
                  <p className="text-sm text-[#b5bac1]">Play a sound for incoming messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2b2d31] rounded-lg">
                <div>
                  <h3 className="font-semibold text-white mb-1">Desktop Notifications</h3>
                  <p className="text-sm text-[#b5bac1]">Show desktop notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

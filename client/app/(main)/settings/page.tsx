'use client';

import { Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
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
                <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#2b2d31] rounded-lg">
              <div>
                <h3 className="font-semibold text-white mb-1">Sound</h3>
                <p className="text-sm text-[#b5bac1]">Play a sound for incoming messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#2b2d31] rounded-lg">
              <div>
                <h3 className="font-semibold text-white mb-1">Desktop Notifications</h3>
                <p className="text-sm text-[#b5bac1]">Show desktop notifications for new messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#4e5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

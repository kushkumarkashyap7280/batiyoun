'use client';

import { Shield, Lock, Eye, Key, FileKey } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Privacy & Security</h1>
              <p className="text-[#b5bac1]">Your data is end-to-end encrypted</p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="space-y-4">
          {[
            {
              icon: Lock,
              title: 'End-to-End Encryption',
              description: 'All messages are encrypted on your device and can only be read by you and the recipient.',
              status: 'Active',
              color: 'green',
            },
            {
              icon: Key,
              title: 'Encryption Keys',
              description: 'Your encryption keys are stored securely on your device and never sent to our servers.',
              status: 'Secured',
              color: 'blue',
            },
            {
              icon: Eye,
              title: 'Privacy Mode',
              description: 'Control who can see your online status and last seen information.',
              status: 'Customizable',
              color: 'purple',
            },
            {
              icon: FileKey,
              title: 'Data Retention',
              description: 'Messages are stored locally and automatically deleted based on your preferences.',
              status: 'Configurable',
              color: 'orange',
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 bg-[#2b2d31] rounded-lg border border-[#1e1f22] hover:border-[#404249] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-linear-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 text-${feature.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs font-medium rounded">
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#b5bac1]">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-[#2b2d31] border border-green-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Your privacy is our priority</h4>
              <p className="text-sm text-[#b5bac1]">
                We use state-of-the-art encryption to ensure your messages remain private. Your encryption keys never leave your device, and we can't read your messages even if we wanted to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

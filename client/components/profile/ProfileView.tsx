'use client';

import { User, Mail, Calendar, Shield, Edit, Key } from 'lucide-react';
import { useState } from 'react';

interface ProfileViewProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    username: string;
    avatar: string | null;
    bio: string | null;
    isVerified: boolean;
    createdAt: Date;
    publicKey: string | null;
  };
}

export function ProfileView({ user }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md rounded-2xl border border-(--border-color) dark:border-(--border-color-dark) p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-600"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-green-600">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center border-2 border-white dark:border-(--bg-secondary-dark)">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-(--text-primary) dark:text-(--text-primary-dark)">
                  {user.fullName}
                </h1>
                {user.isVerified && (
                  <span className="px-3 py-1 bg-green-600/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-(--text-secondary) dark:text-(--text-secondary-dark) text-lg">
                @{user.username}
              </p>
              {user.bio && (
                <p className="text-(--text-secondary) dark:text-(--text-secondary-dark) mt-3 max-w-2xl">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Card */}
          <div className="bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md rounded-xl border border-(--border-color) dark:border-(--border-color-dark) p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-(--text-primary) dark:text-(--text-primary-dark)">
                Email Address
              </h3>
            </div>
            <p className="text-(--text-secondary) dark:text-(--text-secondary-dark)">
              {user.email}
            </p>
          </div>

          {/* Account Created Card */}
          <div className="bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md rounded-xl border border-(--border-color) dark:border-(--border-color-dark) p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-(--text-primary) dark:text-(--text-primary-dark)">
                Member Since
              </h3>
            </div>
            <p className="text-(--text-secondary) dark:text-(--text-secondary-dark)">
              {formatDate(user.createdAt)}
            </p>
          </div>

          {/* User ID Card */}
          <div className="bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md rounded-xl border border-(--border-color) dark:border-(--border-color-dark) p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-(--text-primary) dark:text-(--text-primary-dark)">
                User ID
              </h3>
            </div>
            <p className="text-(--text-secondary) dark:text-(--text-secondary-dark) text-sm font-mono break-all">
              {user.id}
            </p>
          </div>

          {/* Encryption Status Card */}
          <div className="bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md rounded-xl border border-(--border-color) dark:border-(--border-color-dark) p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-(--text-primary) dark:text-(--text-primary-dark)">
                Encryption Status
              </h3>
            </div>
            <p className="text-(--text-secondary) dark:text-(--text-secondary-dark)">
              {user.publicKey ? (
                <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Shield className="w-4 h-4" />
                  Keys Generated
                </span>
              ) : (
                <span className="text-orange-600 dark:text-orange-400">
                  No encryption keys
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Public Key Card (if exists) */}
        {user.publicKey && (
          <div className="bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md rounded-xl border border-(--border-color) dark:border-(--border-color-dark) p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-(--text-primary) dark:text-(--text-primary-dark)">
                Public Encryption Key
              </h3>
            </div>
            <div className="bg-(--bg-tertiary) dark:bg-(--bg-tertiary-dark) rounded-lg p-4 overflow-x-auto">
              <code className="text-xs text-(--text-secondary) dark:text-(--text-secondary-dark) font-mono break-all">
                {user.publicKey}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

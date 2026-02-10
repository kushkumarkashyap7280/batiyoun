'use client';

import { User, Mail, Calendar, Shield, Edit, Key, CheckCircle, Camera } from 'lucide-react';
import { useState } from 'react';
import { AvatarUpload } from './AvatarUpload';

interface ProfileViewProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    username: string;
    avatar: string | null;
    bio: string | null;
    createdAt: Date;
    publicKey: string | null;
    isPro: boolean;
    isAdmin: boolean;
    googleId: string | null;
  };
}

export function ProfileView({ user }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        {/* Header Card */}
        <div className="bg-[#2b2d31] rounded-lg border border-[#1e1f22] p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-600"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-green-600">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              
              {/* Edit Avatar Button */}
              <button
                onClick={() => setShowAvatarUpload(true)}
                className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-colors group-hover:scale-110 transform duration-200"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">
                  {user.fullName}
                </h1>
                {user.isPro && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full" title="Pro Member">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-semibold text-green-500">PRO</span>
                  </div>
                )}
              </div>
              <p className="text-[#b5bac1] text-lg">
                @{user.username}
              </p>
              {user.bio && (
                <p className="text-[#dbdee1] mt-3 max-w-2xl">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Card */}
          <div className="bg-[#2b2d31] rounded-lg border border-[#1e1f22] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-semibold text-white">
                Email Address
              </h3>
            </div>
            <p className="text-[#b5bac1]">
              {user.email}
            </p>
          </div>

          {/* Account Created Card */}
          <div className="bg-[#2b2d31] rounded-lg border border-[#1e1f22] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-semibold text-white">
                Member Since
              </h3>
            </div>
            <p className="text-[#b5bac1]">
              {formatDate(user.createdAt)}
            </p>
          </div>

          {/* User ID Card */}
          <div className="bg-[#2b2d31] rounded-lg border border-[#1e1f22] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-white">
                User ID
              </h3>
            </div>
            <p className="text-[#b5bac1] text-sm font-mono break-all">
              {user.id}
            </p>
          </div>

          {/* Encryption Status Card */}
          <div className="bg-[#2b2d31] rounded-lg border border-[#1e1f22] p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="font-semibold text-white">
                Encryption Status
              </h3>
            </div>
            <p className="text-[#b5bac1]">
              {user.publicKey ? (
                <span className="flex items-center gap-2 text-green-500">
                  <Shield className="w-4 h-4" />
                  Keys Generated
                </span>
              ) : (
                <span className="text-orange-500">
                  No encryption keys
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Public Key Card (if exists) */}
        {user.publicKey && (
          <div className="bg-[#2b2d31] rounded-lg border border-[#1e1f22] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-semibold text-white">
                Public Encryption Key
              </h3>
            </div>
            <div className="bg-[#1e1f22] rounded-lg p-4 overflow-x-auto">
              <code className="text-xs text-[#b5bac1] font-mono break-all">
                {user.publicKey}
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Avatar Upload Modal */}
      {showAvatarUpload && (
        <AvatarUpload onClose={() => setShowAvatarUpload(false)} />
      )}
    </div>
  );
}

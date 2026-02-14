'use client';

import { useState } from 'react';
import { Upload, Link2, User, X, Check } from 'lucide-react';
import { useAvatarUpload } from '@/lib/hooks/useAvatarUpload';
import { useUserStore } from '@/store/zustandUserStore';

interface AvatarUploadProps {
  onClose?: () => void;
}

export function AvatarUpload({ onClose }: AvatarUploadProps) {
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url'); // Prefer URL
  const [avatarUrl, setAvatarUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { uploadToCloudinary, updateAvatarUrl, isUploading, uploadProgress } = useAvatarUpload();
  const user = useUserStore((state) => state.user);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarUrl.trim()) return;

    try {
      setError('');
      setSuccess('');

      // Basic URL validation
      if (!avatarUrl.trim() || !avatarUrl.match(/^https?:\/\/.+/i)) {
        setError('Please enter a valid URL');
        return;
      }

      await updateAvatarUrl(avatarUrl.trim());
      setSuccess('Avatar updated successfully!');
      setAvatarUrl('');

      setTimeout(() => {
        onClose?.();
      }, 1500);
    } catch (error: any) {
      setError(error.message || 'Failed to update avatar');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      setError('');
      setSuccess('');

      await uploadToCloudinary(selectedFile);
      setSuccess('Avatar uploaded successfully!');
      setSelectedFile(null);
      setPreviewUrl('');

      setTimeout(() => {
        onClose?.();
      }, 1500);
    } catch (error: any) {
      setError(error.message || 'Failed to upload avatar');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg border border-line max-w-md w-full p-6 transition-theme">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-default">Update Avatar</h2>
          {onClose && (
            <button onClick={onClose} className="p-2 hover:hover-surface rounded transition-colors">
              <X className="w-5 h-5 text-muted" />
            </button>
          )}
        </div>

        {/* Current Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-2">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
          <p className="text-sm text-muted">{user?.username || 'Current Avatar'}</p>
        </div>

        {/* Method Selection */}
        <div className="flex rounded-lg bg-tertiary p-1 mb-4">
          <button
            onClick={() => setUploadMethod('url')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              uploadMethod === 'url'
                ? 'bg-card text-default shadow-sm'
                : 'text-muted hover:text-default'
            }`}
          >
            <Link2 className="w-4 h-4" />
            URL (Preferred)
          </button>
          <button
            onClick={() => setUploadMethod('file')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              uploadMethod === 'file'
                ? 'bg-card text-default shadow-sm'
                : 'text-muted hover:text-default'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        {/* URL Method */}
        {uploadMethod === 'url' && (
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-default mb-2">Avatar URL</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/your-image"
                className="w-full px-3 py-2 bg-tertiary border border-line rounded-lg focus:outline-none focus:border-green-500 text-default transition-colors"
                disabled={isUploading}
              />
              <p className="text-xs text-subtle mt-1">
                Any valid image URL (direct links, CDN, social media, etc.)
              </p>
            </div>

            <button
              type="submit"
              disabled={!avatarUrl.trim() || isUploading}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Update Avatar
                </>
              )}
            </button>
          </form>
        )}

        {/* File Upload Method */}
        {uploadMethod === 'file' && (
          <div className="space-y-4">
            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-default mb-2">Select Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 bg-tertiary border border-line rounded-lg focus:outline-none focus:border-green-500 text-default file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-green-600 file:text-white file:text-sm file:font-medium hover:file:bg-green-700 transition-colors"
                disabled={isUploading}
              />
              <p className="text-xs text-subtle mt-1">Max 5MB • JPG, JPEG, PNG, GIF, WebP</p>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="flex items-center gap-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-default">{selectedFile?.name}</p>
                  <p className="text-xs text-muted">
                    {selectedFile ? Math.round(selectedFile.size / 1024) : 0}KB
                  </p>
                </div>
              </div>
            )}

            {/* Progress */}
            {isUploading && uploadProgress > 0 && (
              <div className="w-full bg-tertiary rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <button
              onClick={handleFileUpload}
              disabled={!selectedFile || isUploading}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload to Cloudinary
                </>
              )}
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
            <X className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <p className="text-sm text-green-500">{success}</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            <strong>Recommended:</strong> Use avatar URL from external services like Gravatar,
            GitHub, or Google for better performance.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useUserStore } from '@/store/zustandUserStore';

interface UploadResponse {
  success: boolean;
  message?: string;
  data?: any;
  user?: any;
}

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export function useAvatarUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const setUser = useUserStore((state) => state.setUser);

  // Upload image file to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Step 1: Get signature from our API
      const signatureResponse = await fetch('/api/upload-avatar-cloudinary', {
        method: 'POST',
        credentials: 'include',
      });

      if (!signatureResponse.ok) {
        throw new Error('Failed to get upload signature');
      }

      const signatureData: UploadResponse = await signatureResponse.json();

      if (!signatureData.success || !signatureData.data) {
        throw new Error(signatureData.message || 'Failed to get upload signature');
      }

      const { signature, timestamp, cloudName, apiKey, publicId } = signatureData.data;

      // Step 2: Upload directly to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp.toString());
      formData.append('api_key', apiKey);
      formData.append('public_id', publicId);
      formData.append('folder', 'avatars');
      formData.append('transformation', 'w_400,h_400,c_fill,g_face/q_auto,f_auto');

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }

      const cloudinaryResult: CloudinaryResponse = await uploadResponse.json();
      setUploadProgress(50);

      // Step 3: Update user record in our database
      const updateResponse = await fetch('/api/upload-avatar-cloudinary', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          avatar: cloudinaryResult.secure_url,
          cloudinaryId: cloudinaryResult.public_id,
          isUrl: false,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update user avatar');
      }

      const updateData: UploadResponse = await updateResponse.json();

      if (updateData.success && updateData.user) {
        // Update Zustand store
        setUser(updateData.user);
      }

      setUploadProgress(100);
      return cloudinaryResult.secure_url;
    } catch (error) {
      console.error('Avatar upload failed:', error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Update avatar with direct URL (preferred method)
  const updateAvatarUrl = async (avatarUrl: string): Promise<boolean> => {
    try {
      setIsUploading(true);

      const response = await fetch('/api/upload-avatar-cloudinary', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          avatar: avatarUrl,
          isUrl: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar URL');
      }

      const data: UploadResponse = await response.json();

      if (data.success && data.user) {
        // Update Zustand store
        setUser(data.user);
        return true;
      }

      throw new Error(data.message || 'Failed to update avatar');
    } catch (error) {
      console.error('Avatar URL update failed:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadToCloudinary,
    updateAvatarUrl,
    isUploading,
    uploadProgress,
  };
}

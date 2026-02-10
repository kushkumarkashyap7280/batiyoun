import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { env } from '@/config/env';

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// POST: Generate signature for client-side upload
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, cloudinaryId: true, avatar: true }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Delete old Cloudinary image if exists
    if (user.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(user.cloudinaryId);
        console.log(`Deleted old avatar: ${user.cloudinaryId}`);
      } catch (error) {
        console.error('Failed to delete old avatar:', error);
        // Continue anyway - don't block new upload
      }
    }

    // Generate unique public_id for the new upload
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `avatars/${userId}_${timestamp}`;

    // Parameters for the upload
    const uploadParams = {
      public_id: publicId,
      folder: 'avatars',
      resource_type: 'image',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
    };

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      {
        public_id: publicId,
        folder: 'avatars',
        transformation: 'w_400,h_400,c_fill,g_face/q_auto,f_auto',
        timestamp,
      },
      env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      success: true,
      data: {
        signature,
        timestamp,
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        publicId,
        uploadParams
      }
    });

  } catch (error) {
    console.error('Avatar upload signature generation failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate upload signature' },
      { status: 500 }
    );
  }
}

// PATCH: Update user avatar after successful Cloudinary upload
export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { avatar, cloudinaryId, isUrl = false } = body;

    if (!avatar) {
      return NextResponse.json(
        { success: false, message: 'Avatar URL or cloudinary_id is required' },
        { status: 400 }
      );
    }

    // If it's a direct URL (not Cloudinary upload)
    if (isUrl) {
      // Fetch current user to delete existing Cloudinary image if any
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { cloudinaryId: true }
      });

      // Delete old Cloudinary image if switching from Cloudinary to URL
      if (user?.cloudinaryId) {
        try {
          await cloudinary.uploader.destroy(user.cloudinaryId);
          console.log(`Deleted old cloudinary avatar: ${user.cloudinaryId}`);
        } catch (error) {
          console.error('Failed to delete old cloudinary avatar:', error);
        }
      }

      // Update user with URL and clear cloudinaryId
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          avatar: avatar,
          cloudinaryId: null // Clear cloudinary_id since using URL
        },
        select: {
          id: true,
          avatar: true,
          cloudinaryId: true,
          username: true
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Avatar URL updated successfully',
        user: updatedUser
      });
    }

    // For Cloudinary uploads
    if (!cloudinaryId) {
      return NextResponse.json(
        { success: false, message: 'cloudinary_id is required for Cloudinary uploads' },
        { status: 400 }
      );
    }

    // Update user with Cloudinary data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: avatar,
        cloudinaryId: cloudinaryId
      },
      select: {
        id: true,
        avatar: true,
        cloudinaryId: true,
        username: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Avatar updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Avatar update failed:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update avatar' },
      { status: 500 }
    );
  }
}
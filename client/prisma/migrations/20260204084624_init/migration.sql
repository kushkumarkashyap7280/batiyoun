-- CreateEnum
CREATE TYPE "AvatarType" AS ENUM ('INITIALS', 'LINK', 'CLOUD');

-- CreateEnum
CREATE TYPE "PrivacyMode" AS ENUM ('EVERYONE', 'CONTACTS', 'NOBODY');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('OWNER', 'MODERATOR', 'SUPPORT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "password" TEXT,
    "googleId" TEXT,
    "displayName" TEXT,
    "bio" TEXT,
    "avatarType" "AvatarType" NOT NULL DEFAULT 'INITIALS',
    "avatarUrl" TEXT,
    "avatarId" TEXT,
    "bannerUrl" TEXT,
    "socialLinks" JSONB,
    "publicKey" TEXT NOT NULL,
    "keyVersion" INTEGER NOT NULL DEFAULT 1,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "lastSeenMode" "PrivacyMode" NOT NULL DEFAULT 'CONTACTS',
    "accountType" "AccountType" NOT NULL DEFAULT 'PUBLIC',
    "blockedUsers" TEXT[],
    "mutedSpaces" TEXT[],
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "screenTime" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemAdmin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'MODERATOR',

    CONSTRAINT "SystemAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemAdmin_email_key" ON "SystemAdmin"("email");

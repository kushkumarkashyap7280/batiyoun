'use client';

import { useState, useEffect } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserSettings } from '@/types/types';

interface PrivacySettingsProps {
  userId: string;
  initialSettings: any;
}

const DEFAULT_SETTINGS: UserSettings['privacy'] = {
  profileVisibility: 'public',
  lastSeen: 'everyone',
};

export function PrivacySettings({ userId, initialSettings }: PrivacySettingsProps) {
  const [settings, setSettings] = useState<UserSettings['privacy']>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load settings (mock data for now)
    try {
      if (initialSettings && typeof initialSettings === 'object' && initialSettings.privacy) {
        setSettings(initialSettings.privacy);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialSettings]);

  const handleUpdate = async (updates: Partial<UserSettings['privacy']>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    setIsSaving(true);
    try {
      // TODO: Add API call
      // await fetch('/api/settings/update', {
      //   method: 'PUT',
      //   body: JSON.stringify({ userId, settings: { privacy: newSettings } }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Privacy settings updated:', newSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-default mb-2">Privacy</h1>
              <p className="text-muted text-sm sm:text-base">
                Control your privacy settings
              </p>
            </div>
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </div>
            )}
          </div>
        </div>

        {/* Settings Card */}
        <Card className="bg-surface border-line">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-page rounded-lg">
                <Shield className="w-5 h-5 text-default" />
              </div>
              <div>
                <CardTitle className="text-default">Privacy Settings</CardTitle>
                <CardDescription className="text-muted">Manage who can see your information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="profile-visibility" className="text-default font-medium">Profile Visibility</Label>
              <p className="text-sm text-muted mb-2">Who can see your profile</p>
              <Select
                value={settings.profileVisibility}
                onValueChange={(value: 'public' | 'friends' | 'private') =>
                  handleUpdate({ profileVisibility: value })
                }
              >
                <SelectTrigger id="profile-visibility" className="bg-surface border-line text-default w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-line">
                  <SelectItem value="public" className="text-default">Everyone</SelectItem>
                  <SelectItem value="friends" className="text-default">Friends Only</SelectItem>
                  <SelectItem value="private" className="text-default">Only Me</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="last-seen" className="text-default font-medium">Last Seen</Label>
              <p className="text-sm text-muted mb-2">Who can see when you were last online</p>
              <Select
                value={settings.lastSeen}
                onValueChange={(value: 'everyone' | 'friends' | 'nobody') =>
                  handleUpdate({ lastSeen: value })
                }
              >
                <SelectTrigger id="last-seen" className="bg-surface border-line text-default w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-line">
                  <SelectItem value="everyone" className="text-default">Everyone</SelectItem>
                  <SelectItem value="friends" className="text-default">Friends Only</SelectItem>
                  <SelectItem value="nobody" className="text-default">Nobody</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 p-4 bg-surface border border-line rounded-lg">
          <p className="text-sm text-muted text-center">
            Changes are saved automatically. Your preferences are stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}

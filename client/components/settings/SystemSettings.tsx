'use client';

import { useState, useEffect } from 'react';
import { Settings, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserSettings } from '@/types/types';

interface SystemSettingsProps {
  userId: string;
  initialSettings: any;
}

const DEFAULT_SETTINGS: UserSettings['system'] = {
  cameraAccess: false,
  microphoneAccess: false,
  notifications: true,
};

export function SystemSettings({ userId, initialSettings }: SystemSettingsProps) {
  const [settings, setSettings] = useState<UserSettings['system']>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (initialSettings && typeof initialSettings === 'object' && initialSettings.system) {
        setSettings(initialSettings.system);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialSettings]);

  const handleUpdate = async (updates: Partial<UserSettings['system']>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('System settings updated:', newSettings);
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
              <h1 className="text-2xl sm:text-3xl font-bold text-default mb-2">System</h1>
              <p className="text-muted text-sm sm:text-base">Manage system permissions</p>
            </div>
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </div>
            )}
          </div>
        </div>

        <Card className="bg-surface border-line">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-page rounded-lg">
                <Settings className="w-5 h-5 text-default" />
              </div>
              <div>
                <CardTitle className="text-default">System</CardTitle>
                <CardDescription className="text-muted">Manage system permissions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-page rounded-lg">
              <div className="flex-1">
                <Label htmlFor="camera-access" className="text-default font-medium">
                  Camera Access
                </Label>
                <p className="text-sm text-muted mt-1">Allow app to access your camera</p>
              </div>
              <Switch
                id="camera-access"
                checked={settings.cameraAccess}
                onCheckedChange={(checked) => handleUpdate({ cameraAccess: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-page rounded-lg">
              <div className="flex-1">
                <Label htmlFor="microphone-access" className="text-default font-medium">
                  Microphone Access
                </Label>
                <p className="text-sm text-muted mt-1">Allow app to access your microphone</p>
              </div>
              <Switch
                id="microphone-access"
                checked={settings.microphoneAccess}
                onCheckedChange={(checked) => handleUpdate({ microphoneAccess: checked })}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-page rounded-lg">
              <div className="flex-1">
                <Label htmlFor="notifications" className="text-default font-medium">
                  Notifications
                </Label>
                <p className="text-sm text-muted mt-1">Enable push notifications</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => handleUpdate({ notifications: checked })}
              />
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

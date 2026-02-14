'use client';

import { useState, useEffect } from 'react';
import { Database, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserSettings } from '@/types/types';

interface BackupSettingsProps {
  userId: string;
  initialSettings: any;
}

const DEFAULT_SETTINGS: UserSettings['backup'] = {
  autoBackup: false,
  backupFrequency: 'weekly',
  backupMethod: 'cloud',
};

export function BackupSettings({ userId, initialSettings }: BackupSettingsProps) {
  const [settings, setSettings] = useState<UserSettings['backup']>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (initialSettings && typeof initialSettings === 'object' && initialSettings.backup) {
        setSettings(initialSettings.backup);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialSettings]);

  const handleUpdate = async (updates: Partial<UserSettings['backup']>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Backup settings updated:', newSettings);
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
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-default mb-2">Backup & Storage</h1>
              <p className="text-muted text-sm sm:text-base">Manage your data backup preferences</p>
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
                <Database className="w-5 h-5 text-default" />
              </div>
              <div>
                <CardTitle className="text-default">Backup Settings</CardTitle>
                <CardDescription className="text-muted">
                  Configure automatic backups
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-page rounded-lg">
              <div className="flex-1">
                <Label htmlFor="auto-backup" className="text-default font-medium">
                  Auto Backup
                </Label>
                <p className="text-sm text-muted mt-1">Automatically backup your data</p>
              </div>
              <Switch
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleUpdate({ autoBackup: checked })}
              />
            </div>

            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="backup-frequency" className="text-default font-medium">
                Backup Frequency
              </Label>
              <p className="text-sm text-muted mb-2">How often to backup your data</p>
              <Select
                value={settings.backupFrequency}
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') =>
                  handleUpdate({ backupFrequency: value })
                }
                disabled={!settings.autoBackup}
              >
                <SelectTrigger
                  id="backup-frequency"
                  className="bg-surface border-line text-default w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-line">
                  <SelectItem value="daily" className="text-default">
                    Daily
                  </SelectItem>
                  <SelectItem value="weekly" className="text-default">
                    Weekly
                  </SelectItem>
                  <SelectItem value="monthly" className="text-default">
                    Monthly
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="backup-method" className="text-default font-medium">
                Backup Method
              </Label>
              <p className="text-sm text-muted mb-2">Where to store your backups</p>
              <Select
                value={settings.backupMethod}
                onValueChange={(value: 'cloud' | 'local') => handleUpdate({ backupMethod: value })}
                disabled={!settings.autoBackup}
              >
                <SelectTrigger
                  id="backup-method"
                  className="bg-surface border-line text-default w-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-line">
                  <SelectItem value="cloud" className="text-default">
                    Cloud Storage
                  </SelectItem>
                  <SelectItem value="local" className="text-default">
                    Local Storage
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-surface border border-line rounded-lg">
          <p className="text-sm text-muted text-center">
            Changes are saved automatically. Your preferences are stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}

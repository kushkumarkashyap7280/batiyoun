'use client';

import { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Monitor, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserSettings } from '@/types/types';

interface AppearanceSettingsProps {
  userId: string;
  initialSettings: any;
}

const DEFAULT_SETTINGS: UserSettings['appearance'] = {
  theme: 'dark',
  customAccentColor: '#16a34a',
  fontSize: 'medium',
  fontStyle: 'sans-serif',
};

export function AppearanceSettings({ userId, initialSettings }: AppearanceSettingsProps) {
  const [settings, setSettings] = useState<UserSettings['appearance']>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (initialSettings && typeof initialSettings === 'object' && initialSettings.appearance) {
        setSettings(initialSettings.appearance);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initialSettings]);

  const handleUpdate = async (updates: Partial<UserSettings['appearance']>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    // Apply theme immediately
    if (updates.theme) {
      const root = document.documentElement;
      if (updates.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', updates.theme === 'dark');
      }
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Appearance settings updated:', newSettings);
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
              <h1 className="text-2xl sm:text-3xl font-bold text-default mb-2">Appearance</h1>
              <p className="text-muted text-sm sm:text-base">Customize how the app looks</p>
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
                <Palette className="w-5 h-5 text-default" />
              </div>
              <div>
                <CardTitle className="text-default">Appearance Settings</CardTitle>
                <CardDescription className="text-muted">Personalize your experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 p-3 sm:p-4 bg-page rounded-lg">
              <Label className="text-default font-medium">Theme</Label>
              <p className="text-sm text-muted mb-3">Choose your preferred theme</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleUpdate({ theme: 'light' })}
                  className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    settings.theme === 'light'
                      ? 'border-green-600 bg-green-600/10'
                      : 'border-line bg-surface hover:border-line/60'
                  }`}
                >
                  <Sun className="w-5 h-5 text-default" />
                  <span className="text-default font-medium text-sm">Light</span>
                </button>
                <button
                  onClick={() => handleUpdate({ theme: 'dark' })}
                  className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    settings.theme === 'dark'
                      ? 'border-green-600 bg-green-600/10'
                      : 'border-line bg-surface hover:border-line/60'
                  }`}
                >
                  <Moon className="w-5 h-5 text-default" />
                  <span className="text-default font-medium text-sm">Dark</span>
                </button>
                <button
                  onClick={() => handleUpdate({ theme: 'system' })}
                  className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    settings.theme === 'system'
                      ? 'border-green-600 bg-green-600/10'
                      : 'border-line bg-surface hover:border-line/60'
                  }`}
                >
                  <Monitor className="w-5 h-5 text-default" />
                  <span className="text-default font-medium text-sm">System</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="font-size" className="text-default font-medium">Font Size</Label>
              <p className="text-sm text-muted mb-2">Adjust text size for better readability</p>
              <Select
                value={settings.fontSize}
                onValueChange={(value: 'small' | 'medium' | 'large') =>
                  handleUpdate({ fontSize: value })
                }
              >
                <SelectTrigger id="font-size" className="bg-surface border-line text-default w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-line">
                  <SelectItem value="small" className="text-default">Small</SelectItem>
                  <SelectItem value="medium" className="text-default">Medium</SelectItem>
                  <SelectItem value="large" className="text-default">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="font-style" className="text-default font-medium">Font Style</Label>
              <p className="text-sm text-muted mb-2">Choose your preferred font family</p>
              <Select
                value={settings.fontStyle}
                onValueChange={(value: 'sans-serif' | 'serif' | 'monospace') =>
                  handleUpdate({ fontStyle: value })
                }
              >
                <SelectTrigger id="font-style" className="bg-surface border-line text-default w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-line">
                  <SelectItem value="sans-serif" className="text-default">Sans Serif</SelectItem>
                  <SelectItem value="serif" className="text-default">Serif</SelectItem>
                  <SelectItem value="monospace" className="text-default">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 p-3 sm:p-4 bg-page rounded-lg">
              <Label htmlFor="accent-color" className="text-default font-medium">Accent Color</Label>
              <p className="text-sm text-muted mb-2">Customize your theme accent color</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="accent-color"
                  value={settings.customAccentColor}
                  onChange={(e) => handleUpdate({ customAccentColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer bg-transparent"
                />
                <span className="text-sm text-muted font-mono">{settings.customAccentColor}</span>
              </div>
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

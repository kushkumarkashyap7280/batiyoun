'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

export function UpdatePrompt() {
  const [workbox, setWorkbox] = useState<Workbox | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');

      // Show update toast when a new service worker is waiting
      wb.addEventListener('waiting', () => {
        toast.custom(
          (t) => (
            <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <div className="flex-1">
                <p className="font-semibold text-sm">New version available</p>
                <p className="text-xs text-green-100">Update to get the latest features</p>
              </div>
              <button
                onClick={() => {
                  wb.addEventListener('controlling', () => {
                    window.location.reload();
                  });
                  wb.messageSkipWaiting();
                  toast.dismiss(t);
                }}
                className="px-3 py-1.5 rounded bg-white text-green-600 font-semibold text-xs hover:bg-green-50 transition-colors whitespace-nowrap"
              >
                Update
              </button>
            </div>
          ),
          {
            duration: Infinity,
            position: 'top-center',
          },
        );
      });

      // Register service worker
      wb.register();

      setWorkbox(wb);

      // Check for updates periodically (every minute)
      const interval = setInterval(() => {
        wb.update();
      }, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return null;
}

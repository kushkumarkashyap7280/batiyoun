'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/zustandUserStore';

export function AuthInitializer() {
  const refreshAccessToken = useUserStore((state) => state.refreshAccessToken);

  useEffect(() => {
    const initAuth = async () => {
      await useUserStore.persist.rehydrate();
      await refreshAccessToken();
    };

    initAuth();
  }, [refreshAccessToken]);

  return null;
}

'use client';

import SocketProvider from '@/providers/SocketProvider';
import WorkspaceProvider from '@/providers/WorkspaceProvider';
import ProtectedShell from '@/components/workspace/protected-shell';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <WorkspaceProvider>
        <ProtectedShell>{children}</ProtectedShell>
      </WorkspaceProvider>
    </SocketProvider>
  );
}

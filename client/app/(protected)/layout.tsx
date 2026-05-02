import React from "react";
import SocketProvider from "@/providers/SocketProvider";
import ProtectedShell from "@/components/workspace/protected-shell";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <SocketProvider>
        <ProtectedShell>{children}</ProtectedShell>
      </SocketProvider>
    </WorkspaceProvider>
  );
}

import React from "react";
import SocketProvider from "@/providers/SocketProvider";
import ProtectedShell from "@/components/workspace/protected-shell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <ProtectedShell>{children}</ProtectedShell>
    </SocketProvider>
  );
}

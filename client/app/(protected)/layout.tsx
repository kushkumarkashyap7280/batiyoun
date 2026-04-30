import React from "react";
import SocketProvider from "@/providers/SocketProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocketProvider>{children}</SocketProvider>;
}

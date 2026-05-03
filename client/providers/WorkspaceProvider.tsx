'use client';

import React, { createContext, useContext, useState } from 'react';

type WorkspaceContextType = {
  hideMobileNav: boolean;
  setHideMobileNav: (hide: boolean) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType>({
  hideMobileNav: false,
  setHideMobileNav: () => {},
});

export const useWorkspace = () => useContext(WorkspaceContext);

export default function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [hideMobileNav, setHideMobileNav] = useState(false);

  return (
    <WorkspaceContext.Provider value={{ hideMobileNav, setHideMobileNav }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

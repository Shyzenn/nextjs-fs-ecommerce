"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const SidebarContext = createContext<
  { isOpen: boolean; toggleMenu: () => void } | undefined
>(undefined);

// Create the provider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Create a hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

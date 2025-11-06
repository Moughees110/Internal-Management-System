import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState(() => {
    return localStorage.getItem("activeComponent") || null;
  });

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (activeComponent) {
      localStorage.setItem("activeComponent", activeComponent);
    }
  }, [activeComponent]);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, activeComponent, setActiveComponent }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

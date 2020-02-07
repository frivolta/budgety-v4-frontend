import React, { useContext, createContext, ReactNode } from "react";
import { useSidenav } from "../hooks/useSidenav";
interface IUseSidenav {
  sidenavIsOpen: boolean;
  setSidenavIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUseSidenavProviderProps {
  children: ReactNode;
}

const UseSidenavContext = createContext<IUseSidenav | boolean>(true);

const SidenavProvider = ({ children }: IUseSidenavProviderProps) => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenav();
  return (
    <UseSidenavContext.Provider value={{ sidenavIsOpen, setSidenavIsOpen }}>
      {children}
    </UseSidenavContext.Provider>
  );
};

const useSidenavValue = () => useContext(UseSidenavContext);

export { SidenavProvider, useSidenavValue };

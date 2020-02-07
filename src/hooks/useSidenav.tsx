import { useState } from "react";

export const useSidenav = () => {
  const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
  return { sidenavIsOpen, setSidenavIsOpen };
};

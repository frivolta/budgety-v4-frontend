import React from "react";
import { MenuItem } from "./MenuItem";

export const MenuItemList: React.FC = () => {
  return (
    <ul className="Menu">
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </ul>
  );
};

import React from "react";
import { Label } from "../Label/Label";

export interface IHeader {}

export const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="Header__left">
        <div
          className="Icon Icon__menu"
          role="button"
          onClick={() => console.log("is open")}
        >
          <img src="/images/burger-menu.svg" alt="burger menu" />
        </div>
        <div className="Icon Icon__darkmode">
          <img src="/images/darkmode.svg" alt="darkmode" />
        </div>
      </div>
      <div className="Header__right">
        <Label classNames="mr-2 strong">info@youremail.com</Label>
      </div>
    </div>
  );
};
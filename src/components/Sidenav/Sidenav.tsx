import React from "react";
import { Button } from "../Button/Button";

export const Sidenav = () => {
  return (
    <aside className="Sidenav">
      <div className="Sidenav__wrapper">
        <Button
          text="Quick Expense"
          handleClick={() => Promise.resolve(console.log("new item"))}
        />
      </div>
    </aside>
  );
};

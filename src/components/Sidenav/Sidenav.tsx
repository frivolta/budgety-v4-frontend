import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../Button/Button";

import { useSidenavValue } from "../../context/useSidenavValue";
import { FiltersContainer } from "../../container/FiltersContainer/FiltersContainer";

export const Sidenav = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();
  let history = useHistory();

  const _handleButtonClickAction = (redirectPath: string): void => {
    // Redirect to supplied path
    history.push(redirectPath);
    // Trigger sidebar close
    setSidenavIsOpen(false);
  };

  return (
    <aside className={sidenavIsOpen ? `Sidenav Sidenav--isActive` : `Sidenav`} data-testid="Sidenav">
      <div className="Sidenav__wrapper">
        <Button text="New Expense" handleClick={() => _handleButtonClickAction("/expense/add")} />
        <Button text="All Expenses" handleClick={() => _handleButtonClickAction("/")} />
        <FiltersContainer />
      </div>
    </aside>
  );
};

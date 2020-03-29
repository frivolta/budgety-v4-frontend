import React from "react";
import { Label } from "../Label/Label";
import { useSelector, useDispatch } from "react-redux";

import { useSidenavValue } from "../../context/useSidenavValue";
import { startLogout } from "../../redux/actions/authActions";

import { AppState } from "../../redux/configureStore";

export const Header: React.FC = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();
  const { user, isLoggedIn, isLoggingIn } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  const headerEmail: any = () => {
    if (isLoggingIn) {
      return "Loading...";
    }
    if (isLoggedIn && user?.user.email) {
      return user.user.email;
    }
    if (!isLoggingIn && !isLoggedIn) {
      return "Please login again";
    }
  };

  const handleLogout = (): void => {
    dispatch(startLogout());
  };

  return (
    <div className="Header">
      <div className="Header__left">
        <div
          className="Icon Icon__menu"
          role="button"
          onClick={() => setSidenavIsOpen(!sidenavIsOpen)}
          data-testid="SidenavTrigger"
        >
          <img src="/images/burger-menu.svg" alt="burger menu" />
        </div>
        <div className="Icon Icon__darkmode">
          <img src="/images/darkmode.svg" alt="darkmode" />
        </div>
      </div>
      <div className="Header__right">
        <Label classNames="mr-1 strong">{headerEmail()}</Label>
        {!isLoggingIn && (
          <div className="Icon Icon__logout" role="button" onClick={() => handleLogout()} data-testid="LogoutButton">
            <img src="/images/logout.svg" alt="burger menu" />
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Label } from '../Label/Label';

import { useSidenavValue } from '../../context/useSidenavValue';

export interface IHeader {}

export const Header: React.FC = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();

  return (
    <div className="Header">
      <div className="Header__left">
        <div className="Icon Icon__menu" role="button" onClick={() => setSidenavIsOpen(!sidenavIsOpen)}>
          <img src="/images/burger-menu.svg" alt="burger menu" />
        </div>
        <div className="Icon Icon__darkmode">
          <img src="/images/darkmode.svg" alt="darkmode" />
        </div>
      </div>
      <div className="Header__right">
        <Label classNames="mr-1 strong">info@youremail.com</Label>
        <div className="Icon Icon__logout" role="button" onClick={() => console.log('is open')}>
          <img src="/images/logout.svg" alt="burger menu" />
        </div>
      </div>
    </div>
  );
};

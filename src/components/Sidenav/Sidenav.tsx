import React from 'react';
import { Button } from '../Button/Button';

import { useSidenavValue } from '../../context/useSidenavValue';

//import { MenuItemList } from '../Menu/MenuItemList';

export const Sidenav = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();

  return (
    <aside className={sidenavIsOpen ? `Sidenav Sidenav--isActive` : `Sidenav`}>
      <div className="Sidenav__wrapper">
        <div
          className="Icon Icon__close-menu hidden-sm-up "
          role="button"
          onClick={() => setSidenavIsOpen(!sidenavIsOpen)}
        >
          <img src="/images/close-menu.svg" alt="close menu" />
        </div>
        {/*<MenuItemList />*/}
        <Button text="New Expense" handleClick={() => Promise.resolve(console.log('new item'))} />
      </div>
    </aside>
  );
};

import React from 'react';
import { Button } from '../Button/Button';

import { useSidenavValue } from '../../context/useSidenavValue';

//import { MenuItemList } from '../Menu/MenuItemList';

export const Sidenav = () => {
  const { sidenavIsOpen } = useSidenavValue();

  return (
    <aside className={sidenavIsOpen ? `Sidenav Sidenav--isActive` : `Sidenav`}>
      <div className="Sidenav__wrapper">
        {/*<MenuItemList />*/}
        <Button text="Quick Expense" handleClick={() => Promise.resolve(console.log('new item'))} />
      </div>
    </aside>
  );
};

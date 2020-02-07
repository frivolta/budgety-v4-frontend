import React from 'react';
import { Button } from '../Button/Button';
//import { MenuItemList } from '../Menu/MenuItemList';

export const Sidenav = () => {
  return (
    <aside className="Sidenav">
      <div className="Sidenav__wrapper">
        {/*<MenuItemList />*/}
        <Button text="Quick Expense" handleClick={() => Promise.resolve(console.log('new item'))} />
      </div>
    </aside>
  );
};

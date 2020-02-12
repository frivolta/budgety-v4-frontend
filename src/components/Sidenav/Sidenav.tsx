import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../Button/Button';

import { useSidenavValue } from '../../context/useSidenavValue';

//import { MenuItemList } from '../Menu/MenuItemList';

export const Sidenav = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();
  let history = useHistory();

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
        <Button text="New Expense" handleClick={() => history.push('/expense/add')} />
      </div>
    </aside>
  );
};

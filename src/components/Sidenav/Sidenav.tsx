import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../Button/Button';

import { useSidenavValue } from '../../context/useSidenavValue';
import { FiltersContainer } from '../../container/FiltersContainer/FiltersContainer';

//import { MenuItemList } from '../Menu/MenuItemList'
import { startAddExpenseTypeFilter } from '../../redux/actions/staticFiltersActions';
import { useDispatch } from 'react-redux';

export const Sidenav = () => {
  const { sidenavIsOpen, setSidenavIsOpen } = useSidenavValue();
  const dispatch = useDispatch();
  let history = useHistory();

  const disp = async () => {
    await dispatch(startAddExpenseTypeFilter('pippo'));
  };

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
        <Button text="All Expenses" handleClick={() => history.push('/')} />
        <Button text="Dispatch filter" handleClick={disp} />
        <FiltersContainer />
      </div>
    </aside>
  );
};

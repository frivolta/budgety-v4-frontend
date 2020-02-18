import { FILTERS_NAME } from '../../types';
import { useDispatch } from 'react-redux';
import { startAddExpenseTypeFilter } from '../../redux/actions/staticFiltersActions';

const dispatch = useDispatch();

/**
 * Dispatch redux action when filter is passed
 * @summary dispatch the right action based on filter name, if no right filter name is passed console error.
 * @param filterName 
 * @param filterValue 
 * @returns void
 */
export const dispatchFilter = (filterName: FILTERS_NAME, filterValue: string): void => {
  switch (filterName) {
    case FILTERS_NAME.EXPENSE_TYPE:
      dispatch(startAddExpenseTypeFilter(filterValue));
      break;
    default:
      console.error('No filter found');
      break;
  }
};

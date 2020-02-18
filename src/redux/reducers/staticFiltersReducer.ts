import {
  ADD_EXPENSE_TYPE_FILTER,
  REMOVE_EXPENSE_TYPE_FILTER,
  CLEAR_EXPENSE_TYPE_FILTER,
  staticFiltersActionType
} from '../../types/staticFiltersActions';
import { FILTERS_NAME } from '../../types';

type FilterType = {
  filterName: string;
  filterValue: string[];
  isActive: boolean;
};

interface IStaticFiltersState {
  expenseTypeFilter: FilterType;
}

const staticFiltersDefaultState: IStaticFiltersState = {
  expenseTypeFilter: {
    filterName: FILTERS_NAME.EXPENSE_TYPE,
    filterValue: [],
    isActive: false
  }
};

const staticFiltersReducer = (
  state = staticFiltersDefaultState,
  action: staticFiltersActionType
): IStaticFiltersState => {
  switch (action.type) {
    case ADD_EXPENSE_TYPE_FILTER:
      return {
        ...state,
        expenseTypeFilter: {
          ...state.expenseTypeFilter,
          //filterValue: [...state.expenseTypeFilter.filterValue, action.filter],
          filterValue: [action.filter],
          isActive: true
        }
      };
    case REMOVE_EXPENSE_TYPE_FILTER:
      return {
        ...state,
        expenseTypeFilter: {
          ...state.expenseTypeFilter,
          filterValue: state.expenseTypeFilter.filterValue.filter(value => value !== action.filter),
          isActive: true
        }
      };
    case CLEAR_EXPENSE_TYPE_FILTER:
      return {
        ...state,
        expenseTypeFilter: {
          ...state.expenseTypeFilter,
          filterValue: [],
          isActive: false
        }
      };
    default:
      return state;
  }
};

export { staticFiltersReducer };

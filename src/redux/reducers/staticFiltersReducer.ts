import {
  ADD_EXPENSE_TYPE_FILTER,
  REMOVE_EXPENSE_TYPE_FILTER,
  CLEAR_EXPENSE_TYPE_FILTER,
  CLEAR_CATEGORY_TYPE_FILTER,
  ADD_CATEGORY_TYPE_FILTER,
  REMOVE_CATEGORY_TYPE_FILTER,
  staticFiltersActionType,
  ADD_DATE_TYPE_FILTER,
  REMOVE_DATE_TYPE_FILTER,
  CLEAR_DATE_TYPE_FILTER
} from "../../types/staticFiltersActions";
import { FILTERS_NAME } from "../../types";

type FilterType = {
  filterName: string;
  filterValue: string[];
  isActive: boolean;
};

interface IStaticFiltersState {
  expenseTypeFilter: FilterType;
  expenseCategoryFilter: FilterType;
  expenseDateFilter: FilterType;
}

const staticFiltersDefaultState: IStaticFiltersState = {
  expenseTypeFilter: {
    filterName: FILTERS_NAME.EXPENSE_TYPE,
    filterValue: [],
    isActive: false
  },
  expenseCategoryFilter: {
    filterName: FILTERS_NAME.CATEGORY_TYPE,
    filterValue: [],
    isActive: false
  },
  expenseDateFilter: {
    filterName: FILTERS_NAME.DATE_TYPE,
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
          filterValue: state.expenseTypeFilter.filterValue.filter(
            value => value !== action.filter
          ),
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
    case ADD_CATEGORY_TYPE_FILTER:
      return {
        ...state,
        expenseCategoryFilter: {
          ...state.expenseCategoryFilter,
          filterValue: [action.filter],
          isActive: true
        }
      };
    case REMOVE_CATEGORY_TYPE_FILTER:
      return {
        ...state,
        expenseCategoryFilter: {
          ...state.expenseCategoryFilter,
          filterValue: state.expenseCategoryFilter.filterValue.filter(
            value => value !== action.filter
          ),
          isActive: true
        }
      };
    case CLEAR_CATEGORY_TYPE_FILTER:
      return {
        ...state,
        expenseCategoryFilter: {
          ...state.expenseCategoryFilter,
          filterValue: [],
          isActive: false
        }
      };
    case ADD_DATE_TYPE_FILTER:
      return {
        ...state,
        expenseDateFilter: {
          ...state.expenseDateFilter,
          filterValue: [action.filter],
          isActive: true
        }
      };
    case REMOVE_DATE_TYPE_FILTER:
      return {
        ...state,
        expenseDateFilter: {
          ...state.expenseDateFilter,
          filterValue: state.expenseDateFilter.filterValue.filter(
            value => value !== action.filter
          ),
          isActive: true
        }
      };
    case CLEAR_DATE_TYPE_FILTER:
      return {
        ...state,
        expenseDateFilter: {
          ...state.expenseDateFilter,
          filterValue: [],
          isActive: false
        }
      };
    default:
      return state;
  }
};

export { staticFiltersReducer };

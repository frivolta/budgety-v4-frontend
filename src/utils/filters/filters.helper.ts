import moment from 'moment';
import { ExpenseType } from '../../types';

/**
 * Set expenses and filteredExpensens
 * @summary Function called on filters change or expenses change. Checks the redux state, if a filter is active filters the expenses array.
 * @param {expenses: ExpenseType[]}
 * @returns {filteredExpenses: ExpenseType[]}
 */
export const defineFilteredExpenses = (expenses: ExpenseType[], filters: any) => {
  // 1) Define filtered expenses
  let filteredExpenses: ExpenseType[] = expenses;
  // 2) Look for active filters and filter expenses
  if (filters.expenseTypeFilter.isActive) {
    filteredExpenses = filteredExpenses.filter(filteredExpense =>
      filters.expenseTypeFilter.filterValue.includes(filteredExpense.type)
    );
  }

  if (filters.expenseCategoryFilter.isActive) {
    filteredExpenses = filteredExpenses.filter(filteredExpense =>
      filters.expenseCategoryFilter.filterValue.includes(filteredExpense.category)
    );
  }

  if (filters.expenseDateFilter.isActive) {
    filteredExpenses = filteredExpenses.filter(filteredExpense =>
      moment(filters.expenseDateFilter.filterValue[0]).isSame(filteredExpense.date, 'month')
    );
  }
  // 3) return filteredExpenses
  return filteredExpenses;
};

// @ToDo: Deprecated

/**
       * Dispatch redux action when filter is passed
       * @summary dispatch the right action based on filter name, if no right filter name is passed console error.
       * @param filterName 
       * @param filterValue 
       * @returns void
       */
/* export const dispatchFilter = (filterName: FILTERS_NAME, filterValue: string): void => {
        switch (filterName) {
          case FILTERS_NAME.EXPENSE_TYPE:
            break;
          default:
            console.error('No filter found');
            break;
        }
      }; */

import { categoryData } from '../data/expensesData';
import { ExpenseTypeType } from '../types';

/**
 * Given an expense type return an array of categories of that type
 * @param expenseType - ExpenseType to filter
 */
export const getCategoriesByExpenseType = (expenseType: ExpenseTypeType) => {
  return categoryData.filter(category => category.type.id === expenseType.id);
};

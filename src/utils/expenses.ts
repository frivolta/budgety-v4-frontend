import { ExpenseType } from '../types';

// Returns an expense object when values are provided
export const createExpenseObject = (
  description: string,
  amount: number,
  category: string,
  type: string,
  date: string
): ExpenseType => {
  const expenseObject = {
    description: description !== '' ? description : 'Generic',
    amount: amount || 0,
    category: category || 'Uncategorized',
    type: type || 'expense',
    date: date || Date.now().toString()
  };
  return expenseObject;
};

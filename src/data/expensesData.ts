import { ExpenseTypeType, CategoryType } from '../types';

export const expenseTypeData: ExpenseTypeType[] = [
  {
    id: 1,
    value: 'expense',
    caption: 'Expense'
  },
  {
    id: 2,
    value: 'income',
    caption: 'Income'
  }
];

export const categoryData: CategoryType[] = [
  {
    id: 1,
    type: expenseTypeData[0],
    value: 'groceries',
    caption: 'Groceries',
    color: '#ff224f'
  },
  {
    id: 2,
    type: expenseTypeData[0],
    value: 'shopping',
    caption: 'Shopping',
    color: '#ff224f'
  },
  {
    id: 3,
    type: expenseTypeData[0],
    value: 'restaurants',
    caption: 'Restaurants',
    color: '#ff224f'
  },
  {
    id: 4,
    type: expenseTypeData[0],
    value: 'transport',
    caption: 'Transport',
    color: '#ff224f'
  },
  {
    id: 5,
    type: expenseTypeData[0],
    value: 'traverl',
    caption: 'Travel',
    color: '#ff224f'
  },
  {
    id: 6,
    type: expenseTypeData[0],
    value: 'entertainment',
    caption: 'Entertainment',
    color: '#ff224f'
  },
  {
    id: 7,
    type: expenseTypeData[0],
    value: 'utilities',
    caption: 'Utilities',
    color: '#ff224f'
  },
  {
    id: 8,
    type: expenseTypeData[0],
    value: 'health',
    caption: 'Health',
    color: '#ff224f'
  },
  {
    id: 9,
    type: expenseTypeData[0],
    value: 'services',
    caption: 'Services',
    color: '#ff224f'
  },
  {
    id: 10,
    type: expenseTypeData[0],
    value: 'transfers',
    caption: 'Transfers',
    color: '#ff224f'
  },
  {
    id: 11,
    type: expenseTypeData[0],
    value: 'cash',
    caption: 'Cash',
    color: '#ff224f'
  },
  {
    id: 12,
    type: expenseTypeData[0],
    value: 'general',
    caption: 'General',
    color: '#ff224f'
  },
  {
    id: 13,
    type: expenseTypeData[0],
    value: 'insurance',
    caption: 'Insurance',
    color: '#ff224f'
  },
  {
    id: 14,
    type: expenseTypeData[1],
    value: 'salary',
    caption: 'Salary',
    color: '#ff224f'
  },
  {
    id: 15,
    type: expenseTypeData[1],
    value: 'salary',
    caption: 'Salary',
    color: '#d981c4'
  },
  {
    id: 16,
    type: expenseTypeData[1],
    value: 'business',
    caption: 'Business',
    color: '#fc617d'
  },
  {
    id: 17,
    type: expenseTypeData[1],
    value: 'gifts',
    caption: 'Gifts',
    color: '#e52ab1'
  },
  {
    id: 18,
    type: expenseTypeData[1],
    value: 'extraincome',
    caption: 'Extra Income',
    color: '#22517f'
  },
  {
    id: 19,
    type: expenseTypeData[1],
    value: 'other',
    caption: 'Other',
    color: '#301261'
  }
];

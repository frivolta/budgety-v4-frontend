// Expense
export type ExpenseTypeType = {
  id: number;
  value: string;
  caption: string;
};

export type ExpenseType = {
  description: string;
  amount: number;
  category: string;
  type: string;
  date: string;
};

// Category
export type CategoryType = {
  id: number;
  value: string;
  caption: string;
  color: string;
};

// Filter
export enum FILTERS_NAME {
  EXPENSE_TYPE = "EXPENSE_TYPE",
  CATEGORY_TYPE = "CATEGORY_TYPE",
  DATE_TYPE = "DATE_TYPE"
}

export type FilterType = {
  filterName: FILTERS_NAME;
  filterValue: string[];
  isActive: boolean;
};

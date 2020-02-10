export type ExpenseTypeType = {
  id: number;
  value: string;
  caption: string;
};

export type CategoryType = {
  id: number;
  value: string;
  caption: string;
  color: string;
};

export type ExpenseType = {
  description: string;
  amount: string;
  category: string;
  type: string;
  date: string;
};

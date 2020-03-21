// Expense
export type ExpenseTypeType = {
  id: number;
  value: string;
  caption: string;
};

export type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: string;
  date: string;
};

// Category
export type CategoryType = {
  id: number;
  type: ExpenseTypeType;
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

// User
export interface IUserDetails {
  email: string;
  token: string;
}

export interface IUserRegistration {
  email: string;
  password: string;
}

export interface ITokens {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export interface IApiUserDetails {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  tokens: ITokens;
}

// General Types
export interface IError {
  hasErrors: boolean;
  message: string | undefined;
}

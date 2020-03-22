import { ExpenseTypeType, CategoryType } from "../types";

export const expenseTypeData: ExpenseTypeType[] = [
  {
    id: 1,
    value: "expense",
    caption: "Expense"
  },
  {
    id: 2,
    value: "income",
    caption: "Income"
  }
];

export const categoryData: CategoryType[] = [
  {
    id: 1,
    type: expenseTypeData[0],
    value: "groceries",
    caption: "Groceries",
    color: "#0de2a3"
  },
  {
    id: 2,
    type: expenseTypeData[0],
    value: "shopping",
    caption: "Shopping",
    color: "#75effd"
  },
  {
    id: 3,
    type: expenseTypeData[0],
    value: "restaurants",
    caption: "Restaurants",
    color: "#c4db8e"
  },
  {
    id: 4,
    type: expenseTypeData[0],
    value: "transport",
    caption: "Transport",
    color: "#244c55"
  },
  {
    id: 5,
    type: expenseTypeData[0],
    value: "traverl",
    caption: "Travel",
    color: "#b8fcfa"
  },
  {
    id: 6,
    type: expenseTypeData[0],
    value: "entertainment",
    caption: "Entertainment",
    color: "#f3edbe"
  },
  {
    id: 7,
    type: expenseTypeData[0],
    value: "utilities",
    caption: "Utilities",
    color: "#ce297a"
  },
  {
    id: 8,
    type: expenseTypeData[0],
    value: "health",
    caption: "Health",
    color: "#675679"
  },
  {
    id: 9,
    type: expenseTypeData[0],
    value: "services",
    caption: "Services",
    color: "#49c4eb"
  },
  {
    id: 10,
    type: expenseTypeData[0],
    value: "transfers",
    caption: "Transfers",
    color: "#07efc2"
  },
  {
    id: 11,
    type: expenseTypeData[0],
    value: "cash",
    caption: "Cash",
    color: "#8f82f3"
  },
  {
    id: 12,
    type: expenseTypeData[0],
    value: "general",
    caption: "General",
    color: "#4dd694"
  },
  {
    id: 13,
    type: expenseTypeData[0],
    value: "insurance",
    caption: "Insurance",
    color: "#efb1385"
  },
  {
    id: 14,
    type: expenseTypeData[1],
    value: "salary",
    caption: "Salary",
    color: "#173982"
  },
  {
    id: 15,
    type: expenseTypeData[1],
    value: "salary",
    caption: "Salary",
    color: "#5c7463"
  },
  {
    id: 16,
    type: expenseTypeData[1],
    value: "business",
    caption: "Business",
    color: "#fd9a7b"
  },
  {
    id: 17,
    type: expenseTypeData[1],
    value: "gifts",
    caption: "Gifts",
    color: "#cf6888"
  },
  {
    id: 18,
    type: expenseTypeData[1],
    value: "extraincome",
    caption: "Extra Income",
    color: "#badc95"
  },
  {
    id: 19,
    type: expenseTypeData[1],
    value: "other",
    caption: "Other",
    color: "#44444b"
  }
];

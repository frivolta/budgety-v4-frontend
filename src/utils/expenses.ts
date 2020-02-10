import { ExpenseType } from "../types";

// Returns an expense object when values are provided
export const createExpenseObject = (
  description: string,
  amount: string,
  category: string,
  type: string,
  date: string
): ExpenseType => {
  const expenseObject = {
    description: description !== "" ? description : "Generic",
    amount: amount || "0",
    category: category || "cash",
    type: type || "expense",
    date: date || Date.now().toString()
  };

  console.log("New expense object created: ", expenseObject);
  return expenseObject;
};

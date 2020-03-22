import React from "react";
import { StdCard } from "../Card/StdCard";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/configureStore";
import { ExpenseType } from "../../types";
import { expenseTypeData } from "../../data/expensesData";
import { convertAmountToCurrency } from "../../utils/format";
import { expenseType } from "../Card/ExpenseCard";

export const ExpenseCountWidget: React.FC = () => {
  const [positiveSymbol, setPositiveSymbol] = React.useState<boolean>(true);
  const [expenses, setExpenses] = React.useState<number>(0);
  const [incomes, setIncomes] = React.useState<number>(0);
  const [total, setTotal] = React.useState<string>("");
  const { filteredExpenses } = useSelector((state: AppState) => state.filteredExpenses);

  React.useEffect(() => {
    // Define amounts when filtered expenses changes
    const expenseAmount = getExpensesAmount(filteredExpenses);
    const incomesAmount = getIncomesAmount(filteredExpenses);
    const totalAmount = getTotalAmount(expenseAmount, incomesAmount);
    // Set amounts to state
    setExpenses(expenseAmount);
    setIncomes(incomesAmount);
    setTotal(totalAmount);
    // Define positive symbol
    setPositiveSymbol(incomesAmount > expenseAmount);
  }, [filteredExpenses]);

  const getExpensesAmount = (expenses: ExpenseType[]): number => {
    const expensesAmount = expenses.reduce((expenseSum, expense) => {
      if (expense.type === expenseTypeData[0].value) {
        return expenseSum + expense.amount;
      }
      return expenseSum;
    }, 0);
    return expensesAmount;
  };

  const getIncomesAmount = (incomes: ExpenseType[]): number => {
    const incomesAmount = incomes.reduce((incomesSum, incomes) => {
      if (incomes.type === expenseTypeData[1].value) {
        return incomesSum + incomes.amount;
      }
      return incomesSum;
    }, 0);
    return incomesAmount;
  };

  const getTotalAmount = (expenses: number, incomes: number) => {
    const totalAmount = incomes - expenses;
    const symbol = incomes > expenses ? expenseType.INCOME : expenseType.EXPENSE;
    return convertAmountToCurrency(totalAmount, symbol);
  };

  return (
    <>
      <StdCard className="ExpenseCountWidget ExpenseCountWidget--primary">
        <div className="ExpenseCountWidget__caption">
          Expenses: <span>- {convertAmountToCurrency(expenses)}</span>
        </div>
      </StdCard>
      <StdCard className="ExpenseCountWidget  ExpenseCountWidget--alt">
        <div className="ExpenseCountWidget__caption">
          Incomes: <span>+ {convertAmountToCurrency(incomes)}</span>
        </div>
      </StdCard>
      <StdCard className="ExpenseCountWidget">
        <div
          className={`ExpenseCountWidget__caption ${
            positiveSymbol ? "ExpenseCountWidget__caption--positive" : "ExpenseCountWidget__caption--negative"
          }`}
        >
          Total: <span>{convertAmountToCurrency(total)}</span>
        </div>
      </StdCard>
    </>
  );
};

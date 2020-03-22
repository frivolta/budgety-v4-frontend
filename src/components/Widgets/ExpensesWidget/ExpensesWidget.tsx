import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { ExpenseCard } from "../../Card/ExpenseCard";
import { StdCard } from "../../Card/StdCard";
import { FiltersManagementBar } from "../../FiltersManagementBar/FiltersManagementBar";
import { ErrorMessage } from "../../ErrorMessage/ErrorMessage";
import { ExpenseType } from "../../../types";

import { startAddFilteredExpenses } from "../../../redux/actions/expenseActions";
import { AppState } from "../../../redux/configureStore";
import { defineFilteredExpenses } from "../../../utils/filters/filters.helper";
import { startGetAllExpenses } from "../../../redux/actions/filteredExpensesActions";
import { expenseActionsType } from "../../../types/expensesActionTypes";
import { getCategoryByValue } from "../../../utils/categories";

export const ExpenseWidget: React.FC = () => {
  const filters = useSelector((state: AppState) => state.filters);
  const { filteredExpenses } = useSelector((state: AppState) => state.filteredExpenses);
  const { isLoading, loadingType, expenses, error } = useSelector((state: AppState) => state.expense);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetAllExpenses());
  }, [dispatch]);

  useEffect(() => {
    const filteredExpenses = defineFilteredExpenses(expenses, filters);
    dispatch(startAddFilteredExpenses(filteredExpenses));
  }, [expenses, dispatch, filters]);

  return (
    <div className="ExpenseWidget">
      {filteredExpenses && filteredExpenses.length > 0 && <FiltersManagementBar />}
      {(!filteredExpenses || !filteredExpenses.length) && !isLoading && loadingType !== expenseActionsType.ALL && (
        <StdCard>You don't have any expense.</StdCard>
      )}
      {filteredExpenses &&
        filteredExpenses.map((expense: ExpenseType, key) => (
          <ExpenseCard
            key={key}
            id={expense.id}
            type={expense.type}
            description={expense.description}
            date={expense.date}
            amount={expense.amount}
            category={getCategoryByValue(expense.category)}
          />
        ))}
      {error && error.hasErrors && error.errorType === expenseActionsType.ALL && error.message && (
        <ErrorMessage>{error.message}</ErrorMessage>
      )}
    </div>
  );
};

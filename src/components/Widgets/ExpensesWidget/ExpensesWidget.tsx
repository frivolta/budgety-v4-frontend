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
import { startGetAllExpenses } from "../../../redux/actions/expensesActions";
import { expenseActionsType } from "../../../types/expensesActionTypes";
import { getCategoryByValue } from "../../../utils/categories";

export const ExpenseWidget: React.FC = () => {
  const filters = useSelector((state: AppState) => state.filters);
  const stateFilteredExpenses = useSelector((state: AppState) => state.expenses.filteredExpenses);
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
      {stateFilteredExpenses && stateFilteredExpenses.length > 0 && <FiltersManagementBar />}
      {(!stateFilteredExpenses || !stateFilteredExpenses.length) &&
        !isLoading &&
        loadingType !== expenseActionsType.ALL && <StdCard>You don't have any expense.</StdCard>}
      {stateFilteredExpenses &&
        stateFilteredExpenses.map((expense: ExpenseType, key) => (
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

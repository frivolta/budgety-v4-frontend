import React, { useEffect, useCallback, useState } from "react";

import {useSelector} from 'react-redux'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import { ExpenseCard } from "../components/Card/ExpenseCard";
import { StdCard } from "../components/Card/StdCard";
import { LinearLoader } from "../components/LinearLoader/LinearLoader";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { ExpenseType } from "../types";

import { useExpenses } from '../hooks/useExpenses';
import { AppState } from '../redux/configureStore';

export const GET_ME_EXPENSES_QUERY = gql`
  query Me {
    me {
      expenses {
        id
        amount
        type
        description
        date
        category
      }
    }
  }
`;

export const IndexPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME_EXPENSES_QUERY);
  const {expenses, setExpenses} = useExpenses()
  const filters = useSelector((state:AppState)=> state.filters)

  const [filteredExpenses, setFilteredExpenses]  = useState(expenses);

  /**
   * Set expenses and filteredExpensens
   * @summary Function called on filters change or expenses change. Checks the redux state, if a filter is active filters the expenses array.
   * @param {expenses: ExpenseType[]}
   * @returns {filteredExpenses: ExpenseType[]}
   */
  const defineFilteredExpenses = useCallback((expenses: ExpenseType[]) => {
    // 0) Define all expenses
    setExpenses(expenses)
    // 1) Define filtered expenses
    let filteredExpenses: ExpenseType[] = expenses;    
    // 2) Look for active filters and filter expenses
    if(filters.expenseTypeFilter.isActive){
      filteredExpenses = filteredExpenses.filter(filteredExpense=>filters.expenseTypeFilter.filterValue.includes(filteredExpense.type))
    }

    if(filters.expenseCategoryFilter.isActive){
      filteredExpenses = filteredExpenses.filter(filteredExpense=>filters.expenseCategoryFilter.filterValue.includes(filteredExpense.category))
    }
    // 3) return filteredExpenses
    return filteredExpenses;
  }, [setExpenses, filters.expenseTypeFilter.filterValue, filters.expenseTypeFilter.isActive, filters.expenseCategoryFilter.filterValue, filters.expenseCategoryFilter.isActive])


  useEffect(() => {
    if (data?.me?.expenses) {
      const filteredExpenses = defineFilteredExpenses(data.me.expenses);
      setFilteredExpenses(filteredExpenses)
    }
  }, [data, defineFilteredExpenses, filters]);

  return (
    <DashboardContainer>
      <LinearLoader isActive={loading} />
      {(expenses && expenses.length>0) && <StdCard> FILTERS</StdCard>}
      {(!expenses || !expenses.length) && !loading && <StdCard>You don't have any expense.</StdCard>}
      {filteredExpenses &&
        filteredExpenses.map((expense: ExpenseType, key) => (
          <ExpenseCard
            key={key}
            type={expense.type}
            description={expense.description}
            date={expense.date}
            amount={expense.amount}
            category={expense.category}
          />
        ))}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </DashboardContainer>
  );
};

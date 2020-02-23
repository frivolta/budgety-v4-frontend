import React, { useEffect, useCallback, useState } from "react";

import {useSelector, useDispatch} from 'react-redux'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from 'moment'

import { ExpenseCard } from "../Card/ExpenseCard";
import { StdCard } from "../Card/StdCard";
import {FiltersManagementBar} from '../FiltersManagementBar/FiltersManagementBar'
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { ExpenseType } from "../../types";

import { useExpenses } from '../../hooks/useExpenses';
import {startAddFilteredExpenses} from '../../redux/actions/expenseActions'
import { AppState } from '../../redux/configureStore';

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

export const ExpenseWidget: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME_EXPENSES_QUERY);
  const {expenses, setExpenses} = useExpenses()
  const filters = useSelector((state:AppState)=> state.filters)
  const stateFilteredExpenses = useSelector((state:AppState)=> state.expenses.filteredExpenses)
  const dispatch = useDispatch();

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

    if (filters.expenseDateFilter.isActive){
      filteredExpenses = filteredExpenses.filter(filteredExpense=> moment(filters.expenseDateFilter.filterValue[0]).isSame(filteredExpense.date, 'month'))
    }

    // 3) Dispatch filtered expenses to the store
    dispatch(startAddFilteredExpenses(filteredExpenses))
    // 4) return filteredExpenses
    return filteredExpenses;
  }, [setExpenses, filters.expenseTypeFilter.filterValue, filters.expenseTypeFilter.isActive, filters.expenseCategoryFilter.filterValue, filters.expenseCategoryFilter.isActive, filters.expenseDateFilter.filterValue, filters.expenseDateFilter.isActive])


  useEffect(() => {
    if (data?.me?.expenses) {
      const filteredExpenses = defineFilteredExpenses(data.me.expenses);
      setFilteredExpenses(filteredExpenses)
    }
  }, [data, defineFilteredExpenses, filters]);

  return (
    <div className="ExpenseWidget">
      {(expenses && expenses.length>0) &&<FiltersManagementBar/>}
      {(!expenses || !expenses.length) && !loading && <StdCard>You don't have any expense.</StdCard>}
      {stateFilteredExpenses &&
        stateFilteredExpenses.map((expense: ExpenseType, key) => (
          <ExpenseCard
            key={key}
            id={expense.id}
            type={expense.type}
            description={expense.description}
            date={expense.date}
            amount={expense.amount}
            category={expense.category}
          />
        ))}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </div>
  );
};

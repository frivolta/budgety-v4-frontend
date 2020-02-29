import React, { useEffect } from "react";

import {useSelector, useDispatch} from 'react-redux'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { ExpenseCard } from "../Card/ExpenseCard";
import { StdCard } from "../Card/StdCard";
import {FiltersManagementBar} from '../FiltersManagementBar/FiltersManagementBar'
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { ExpenseType } from "../../types";

import {startAddFilteredExpenses} from '../../redux/actions/expenseActions'
import { AppState } from '../../redux/configureStore';
import { defineFilteredExpenses } from '../../utils/filters/filters.helper';

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
    },
  }
`;

export const GET_EXPENSES_BY_USER_QUERY = gql`
  query Expenses {
    getExpenses {
      id
      amount
      type
      description
      date
      category
    }
  }
`

export const ExpenseWidget: React.FC = () => {
  const { loading, error, data } = useQuery(GET_EXPENSES_BY_USER_QUERY, {fetchPolicy: "no-cache"});
  const filters = useSelector((state:AppState)=> state.filters)
  const stateFilteredExpenses = useSelector((state:AppState)=> state.expenses.filteredExpenses)
  const dispatch = useDispatch();

  useEffect(() => {
    // When data changes
    if (data?.getExpenses) {
      // Define filtered expenses
      const filteredExpenses = defineFilteredExpenses(data.getExpenses, filters);
      // Dispatch filtered expenses to redux state
      dispatch(startAddFilteredExpenses(filteredExpenses)) 
    }
  }, [data, filters, dispatch]);

  return (
    <div className="ExpenseWidget">
      {(stateFilteredExpenses && stateFilteredExpenses.length>0) &&<FiltersManagementBar/>}
      {(!stateFilteredExpenses || !stateFilteredExpenses.length) && !loading && <StdCard>You don't have any expense.</StdCard>}
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

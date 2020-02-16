import React, { useEffect, useCallback } from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import { ExpenseCard } from "../components/Card/ExpenseCard";
import { StdCard } from "../components/Card/StdCard";
import { LinearLoader } from "../components/LinearLoader/LinearLoader";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { ExpenseType } from "../types";

import { useExpenses } from '../hooks/useExpenses';

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

  const defineFilteredExpenses = useCallback((expenses: ExpenseType[]) => {
    // Filter expense example
    //const filteredExp = expenses.filter(exp=>exp?.description==='Papero')
    setExpenses(expenses)
  }, [setExpenses])

  useEffect(() => {
    if (data?.me?.expenses) {
      defineFilteredExpenses(data.me.expenses);
    }
  }, [data, defineFilteredExpenses]);

  return (
    <DashboardContainer>
      <LinearLoader isActive={loading} />
      {(expenses && expenses.length>0) && <StdCard> FILTERS</StdCard>}
      {(!expenses || !expenses.length) && !loading && <StdCard>You don't have any expense.</StdCard>}
      {expenses &&
        expenses.map((expense: ExpenseType, key) => (
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

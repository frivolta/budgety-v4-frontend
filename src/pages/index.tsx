import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import { ExpenseCard } from "../components/Card/ExpenseCard";
import { StdCard } from "../components/Card/StdCard";
import { LinearLoader } from "../components/LinearLoader/LinearLoader";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { ExpenseType } from "../types";

export const GET_ME_EXPENSES_QUERY = gql`
  query Me {
    me {
      expenses {
        id
        amount
        type
        description
        date
      }
    }
  }
`;

export const IndexPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME_EXPENSES_QUERY);
  const [filteredExpenses, setFilteredExpenses] = useState<ExpenseType[]>([]);

  useEffect(() => {
    if (data?.me?.expenses) {
      defineFilteredExpenses(data.me.expenses);
    }
  }, [data]);

  const defineFilteredExpenses = (expenses: ExpenseType[]) => {
    // Filter expense example
    //const filteredExp = expenses.filter(exp=>exp?.description==='Papero')
    setFilteredExpenses(expenses);
  };

  return (
    <DashboardContainer>
      <LinearLoader isActive={loading} />
      <StdCard> FILTERS</StdCard>
      {filteredExpenses &&
        filteredExpenses.map((expense: any) => (
          <ExpenseCard
            type={expense.type}
            description={expense.description}
            date={expense.date}
          />
        ))}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </DashboardContainer>
  );
};

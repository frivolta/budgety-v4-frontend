import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import { ExpenseCard, expenseType } from '../components/Card/ExpenseCard';
import { StdCard } from '../components/Card/StdCard';

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

  return (
    <DashboardContainer>
      <StdCard> FILTERS</StdCard>
      {data &&
        data.me.expenses.map((expense: any) =>
          <ExpenseCard type={expense.type} description={expense.description} date={expense.date} />
        )}
    </DashboardContainer>
  );
};

import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_EXPENSES_BY_USER_QUERY } from '../components/ExpensesWidget/ExpensesWidget';

import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import { LinearLoader } from '../components/LinearLoader/LinearLoader';
import { ExpenseWidget } from '../components/ExpensesWidget/ExpensesWidget';

export const IndexPage: React.FC = () => {
  const { loading } = useQuery(GET_EXPENSES_BY_USER_QUERY);
  return (
    <DashboardContainer>
      <LinearLoader isActive={loading} />

      <ExpenseWidget />
    </DashboardContainer>
  );
};

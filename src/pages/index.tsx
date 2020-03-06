import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_EXPENSES_BY_USER_QUERY } from '../components/Widgets/ExpensesWidget/ExpensesWidget';

import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import { LinearLoader } from '../components/LinearLoader/LinearLoader';
import { ExpenseWidget } from '../components/Widgets/ExpensesWidget/ExpensesWidget';
import { WidgetContainer } from '../container/WidgetContainer/WidgetContainer';
import { ExpenseCountWidget } from '../components/Widgets/ExpenseCountWidget';

export const IndexPage: React.FC = () => {
  const { loading } = useQuery(GET_EXPENSES_BY_USER_QUERY);
  return (
    <DashboardContainer>
      <LinearLoader isActive={loading} />
      <WidgetContainer>
        <ExpenseCountWidget />
      </WidgetContainer>
      <ExpenseWidget />
    </DashboardContainer>
  );
};

import React from 'react';
import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import { ExpenseCard, expenseType } from '../components/Card/ExpenseCard';
import { StdCard } from '../components/Card/StdCard';

export const IndexPage = () =>
  <DashboardContainer>
    <StdCard> FILTERS</StdCard>
    <ExpenseCard
      type={expenseType.EXPENSE}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      date="3 february 2020"
    />
  </DashboardContainer>;

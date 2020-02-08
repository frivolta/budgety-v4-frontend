import React from 'react';
import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import { ExpenseCard, expenseType } from '../components/Card/ExpenseCard';
import { StdCard } from '../components/Card/StdCard';

export const IndexPage: React.FC = () =>
  <DashboardContainer>
    {/**@ToDo: This must be a widget */}
    <StdCard> FILTERS</StdCard>
    <ExpenseCard type={expenseType.EXPENSE} description="Tre Offerta Scegli Prepagata" date="3 february 2020" />
  </DashboardContainer>;

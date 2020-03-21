import React from "react";
import { useSelector } from "react-redux";

import { expenseActionsType } from "../types/expensesActionTypes";

import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import { LinearLoader } from "../components/LinearLoader/LinearLoader";
import { ExpenseWidget } from "../components/Widgets/ExpensesWidget/ExpensesWidget";
import { WidgetContainer } from "../container/WidgetContainer/WidgetContainer";
import { ExpenseCountWidget } from "../components/Widgets/ExpenseCountWidget";

import { AppState } from "../redux/configureStore";

export const IndexPage: React.FC = () => {
  const { isLoading, loadingType } = useSelector((state: AppState) => state.expense);

  return (
    <DashboardContainer>
      <LinearLoader isActive={isLoading && loadingType === expenseActionsType.ALL} />
      <WidgetContainer>
        <ExpenseCountWidget />
      </WidgetContainer>
      <ExpenseWidget />
    </DashboardContainer>
  );
};

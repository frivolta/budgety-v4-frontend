import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_ME_EXPENSES_QUERY } from "../components/ExpensesWidget/ExpensesWidget";

import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import { LinearLoader } from "../components/LinearLoader/LinearLoader";
import { ExpenseWidget } from "../components/ExpensesWidget/ExpensesWidget";

export const IndexPage: React.FC = () => {
  const { loading } = useQuery(GET_ME_EXPENSES_QUERY);
  return (
    <DashboardContainer>
      <LinearLoader isActive={loading} />

      <ExpenseWidget />
    </DashboardContainer>
  );
};

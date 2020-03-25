import React, { ReactNode } from "react";
import { Header } from "../../components/Header/Header";
import { Sidenav } from "../../components/Sidenav/Sidenav";
import { Footer } from "../../components/Footer/Footer";

export interface IDashBoardContainer {
  children: ReactNode;
}

export const DashboardContainer: React.FC<IDashBoardContainer> = ({ children }) => {
  return (
    <div className="GridContainer" data-testid="DashboardContainer">
      <Header />
      <Sidenav />
      <main className="Main">{children}</main>
      <Footer />
    </div>
  );
};

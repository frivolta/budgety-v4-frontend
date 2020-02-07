import React, { useState, useEffect, ReactNode } from 'react';
import { Header } from '../../components/Header/Header';
import { Sidenav } from '../../components/Sidenav/Sidenav';
import { Footer } from '../../components/Footer/Footer';

import { useSidenavValue } from '../../context/useSidenavValue';

export interface IDashBoardContainer {
  children: ReactNode;
}

export const DashboardContainer: React.FC<IDashBoardContainer> = ({ children }) => {
  const sidenavValues = useSidenavValue();

  return (
    <div className="GridContainer">
      <Header />
      <Sidenav />
      <main className="Main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

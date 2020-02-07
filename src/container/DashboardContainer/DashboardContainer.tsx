import React from 'react';
import { Header } from '../../components/Header/Header';
import { Sidenav } from '../../components/Sidenav/Sidenav';
import { Footer } from '../../components/Footer/Footer';

export const DashboardContainer = () => {
  return (
    <div className="GridContainer">
      <Header />
      <Sidenav />
      <main className="Main">b</main>
      <Footer />
    </div>
  );
};

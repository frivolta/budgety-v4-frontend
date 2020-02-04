import React from "react";
import { Header } from "../../components/Header/Header";
import { Sidenav } from "../../components/Sidenav/Sidenav";
export const DashboardContainer = () => {
  return (
    <div className="GridContainer">
      <Header />
      <Sidenav />
      <main className="Main">c</main>
      <footer className="Footer">d</footer>
    </div>
  );
};

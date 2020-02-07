import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Sidenav } from "../../components/Sidenav/Sidenav";

import { useSidenavValue } from "../../context/useSidenavValue";

export const DashboardContainer = () => {
  const sidenavValues = useSidenavValue();

  useEffect(() => {
    sidenavValues.setSidenavIsOpen(false);
  }, []);

  console.log(sidenavValues.sidenavIsOpen);
  return (
    <div className="GridContainer">
      <Header />
      <Sidenav />
      <main className="Main">b</main>
      <footer className="Footer">d</footer>
    </div>
  );
};

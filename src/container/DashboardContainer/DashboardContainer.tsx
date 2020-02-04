import React from "react";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
export const DashboardContainer = () => {
  return (
    <div className="GridContainer">
      <Header />
      <aside className="Sidenav">
        <Button
          text="Quick Expense"
          handleClick={() => Promise.resolve(console.log("new item"))}
        />
      </aside>
      <main className="Main">c</main>
      <footer className="Footer">d</footer>
    </div>
  );
};

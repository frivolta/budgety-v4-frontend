/// <reference types="cypress" />
import { testUser } from "../../config/users";
import { NETWORK } from "../../config/variables";

import { setUserToLocalStorage } from "../../../src/utils/authentication/auth.utils";
import { successfullLoginResponse } from "../../mocks/signin-api.mock";
import * as moment from "moment";
/**
 * 1) Dashboard has default state
 *  - Shows email
 *  - No expense message
 *  - Zero amount widgets
 *  - Cleared filters
 *  - Current month filter
 *  - Correct path buttons
 *
 * 2) Dashboard is usable on mobile
 *  - Sidebar is hidden
 *  - Sidebar can open, close
 *  - Sidebar closes on button click
 *
 * 3) User can logout
 *  - User can click logout button
 *  - User is redirected to login page
 */

describe("Dashboard", () => {
  beforeEach(() => {
    // Visit URL
    setUserToLocalStorage(successfullLoginResponse);
    cy.visit(`${NETWORK.LOCAL}/`).contains(testUser.email);
    cy.location("pathname").should("eq", "/");
  });
  it("shows dashboard with default state", () => {
    // Shows email
    cy.contains(testUser.email).should("be.visible");

    // No expense message
    cy.contains("You don't have any expense.").should("be.visible");

    // Zero amount widgets
    cy.get('[data-testid="ExpenseCountWidgetExpenses"]')
      .contains("Expenses: - 0 €")
      .should("be.visible");
    cy.get('[data-testid="ExpenseCountWidgetIncomes"]')
      .contains("Incomes: + 0 €")
      .should("be.visible");
    cy.get('[data-testid="ExpenseCountWidgetTotal"]')
      .contains("Total: 0 €")
      .should("be.visible");

    // Cleared filters
    cy.get('[data-testid="DateFilter"]')
      .contains(moment().format("MMM YYYY"))
      .should("be.visible");
    cy.get('[data-testid="Select"]')
      .eq(0)
      .contains("No filter")
      .should("be.visible");
    cy.get('[data-testid="Select"]')
      .eq(1)
      .contains("No filter")
      .should("be.visible");

    // Correct path buttons
    cy.get("button")
      .contains("New Expense")
      .click();
    cy.location("pathname").should("eq", "/expense/add");
    cy.get("button")
      .contains("All Expenses")
      .click();
    cy.location("pathname").should("eq", "/");
  });
  it("shows correct dashboard on mobile", () => {
    // View on mobile
    cy.viewport("iphone-6");

    // Sidebar is hidden
    cy.get('[data-testid="Sidenav"]')
      .should("not.be.visible")
      .should("not.have.class", "Sidenav--isActive");

    //Sidebar can open, close
    cy.get('[data-testid="SidenavTrigger"]').click();
    cy.get('[data-testid="Sidenav"]')
      .should("be.visible")
      .should("have.class", "Sidenav--isActive");

    // Sidebar closes on button click
    cy.get("button")
      .contains("All Expenses")
      .click();
    cy.get('[data-testid="Sidenav"]')
      .should("not.be.visible")
      .should("not.have.class", "Sidenav--isActive");
  });
  it("user can logout", () => {
    cy.get('[data-testid="LogoutButton"]').click();
    cy.location("pathname").should("eq", "/signin");
  });
});

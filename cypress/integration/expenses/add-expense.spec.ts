/// <reference types="cypress" />
import { testUser } from "../../config/users";
import { NETWORK } from "../../config/variables";

import { successfullLoginResponse } from "../../mocks/signin-api.mock";
import { expensesSuccessRequestApi, createExpenseSuccessfullResponse } from "../../mocks/expesnes-api.mock";
import { SUCCESS } from "../../../src/utils/messages";

/**
 * 1) User can add expense
 *  - Expect right path
 *  - Fill all fields
 *  - Expect toaster
 *  - Navigate to all expenses
 *  - Expect expenses length to be one more
 */

describe("New Expense", () => {
  beforeEach(() => {
    // Visit URL
    cy.visit(`${NETWORK.LOCAL}/signin`);
    cy.location("pathname").should("eq", "/signin");
    cy.server();
    cy.route({
      url: "**/v1/auth/login",
      method: "POST",
      status: 200,
      response: successfullLoginResponse,
      delay: 500
    }).as("login-request");
    cy.route({
      method: "GET",
      url: "http://localhost:3001/v1/expenses",
      status: 200,
      response: expensesSuccessRequestApi,
      delay: 500,
      headers: {
        Authorization: `Bearer ${successfullLoginResponse.tokens.access.token}`
      }
    }).as("expense-request");
    cy.route({
      method: "POST",
      url: "http://localhost:3001/v1/expenses",
      status: 200,
      response: createExpenseSuccessfullResponse,
      delay: 500,
      headers: {
        Authorization: `Bearer ${successfullLoginResponse.tokens.access.token}`
      }
    }).as("expense-add");
    cy.signinUser({ email: testUser.email, password: testUser.password });
  });

  it("correctly renders a new expense", () => {
    cy.wait("@expense-request").then(() => {
      // Expect right path
      cy.get("button")
        .contains("New Expense")
        .click();
      cy.location("pathname").should("eq", "/expense/add");
    });

    // Fill all fields
    cy.get(".Input")
      .eq(0)
      .click()
      .type("New expense description")
      .get('[data-testid="Select"]')
      .eq(0)
      .select("Income")
      .get(".Input")
      .eq(1)
      .click()
      .type("200")
      .get('[data-testid="Select"]')
      .eq(1)
      .select("Gifts");

    // Create expense
    cy.get("button")
      .contains("Add Expense")
      .click();

    cy.wait("@expense-add").should(xhr => {
      expect(xhr.response.body).to.deep.equal(createExpenseSuccessfullResponse);
      // Toaster is visible
      cy.get(".Toaster")
        .contains(SUCCESS.addExpenseSuccess)
        .should("be.visible");
    });
  });
});

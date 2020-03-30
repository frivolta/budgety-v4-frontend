/// <reference types="cypress" />
import { testUser } from "../../config/users";
import { NETWORK } from "../../config/variables";

import { successfullLoginResponse } from "../../mocks/signin-api.mock";
import { expensesSuccessRequestApi } from "../../mocks/expesnes-api.mock";

/**
 * 1) User can see his expenses
 *  - Request api
 *  - Loading spinner
 *  - Expenses card are shown
 *  - Widgets count exact amount
 *  - Status bar is shown
 *
 * 2) User can delete expenses
 *  - User dbl click on expense
 *  - Confirm deletion
 *  - User cannot see expense anymore
 *
 * 3) User can filter expenses
 *  - User can filter by category
 *  - user can filter by type
 *  - User can filter by month
 *  - User can clear filters from status bar
 */

describe("Expenses", () => {
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
      method: "DELETE",
      url: `http://localhost:3001/v1/expenses/${expensesSuccessRequestApi[0].id}`,
      status: 200,
      response: {},
      delay: 500,
      headers: {
        Authorization: `Bearer ${successfullLoginResponse.tokens.access.token}`
      }
    }).as("expense-delete");
    cy.signinUser({ email: testUser.email, password: testUser.password });
  });

  it("shows retrieved expenses to user", () => {
    // Loading spinner
    cy.get('[data-testid="LinearLoaderContinues"]').should("be.visible");

    // Expense cards are shown
    cy.wait("@expense-request").should(xhr => {
      expect(xhr.response.body).to.deep.equal(expensesSuccessRequestApi);
      cy.get(".StdCard__content__data")
        .each(($div, i) => {
          expect($div).to.contain(expensesSuccessRequestApi[i].description);
        })
        .then($list => expect($list).to.have.length(5));
    });

    // Widgets count exact amount
    cy.get('[data-testid="ExpenseCountWidgetExpenses"]')
      .contains("Expenses: - 1,050 €")
      .should("be.visible");
    cy.get('[data-testid="ExpenseCountWidgetIncomes"]')
      .contains("Incomes: + 2,145.45 €")
      .should("be.visible");
    cy.get('[data-testid="ExpenseCountWidgetTotal"]')
      .contains("Total: 1,095.44 €")
      .should("be.visible");

    // Status bar is shown
    cy.get('[data-testid="FiltersManagementBar"]').should("not.be.hidden");
  });

  it("not shows deleted expense anymore", () => {
    // User dblclick on expense and can click confirm action
    cy.get(".StdCard__content__data")
      .eq(0)
      .dblclick()
      .get(".StdCard__content__dialog__action")
      .click();

    // User cannot see expense anymore
    cy.wait("@expense-delete").should(xhr => {
      expect(xhr.response.body).to.deep.equal({});
      cy.get(".StdCard__content__data").should("have.length", 4);
    });
  });

  it("shows right filtered expenses", () => {
    // Select previous month
    cy.get('[data-testid="DateFilter"]')
      .get(".DateFilter__button")
      .eq(0)
      .click();

    // Select expense type
    cy.get('[data-testid="Select"]')
      .eq(0)
      .select("Income");

    // Select category
    cy.get('[data-testid="Select"]')
      .eq(1)
      .select("Business");

    // Only one expense is shown
    cy.get(".StdCard__content__data").should("have.length", 1);

    // Widgets shows right amount
    cy.get('[data-testid="ExpenseCountWidgetExpenses"]')
      .contains("Expenses: - 0 €")
      .should("be.visible");
    cy.get('[data-testid="ExpenseCountWidgetIncomes"]')
      .contains("Incomes: + 2,000 €")
      .should("be.visible");
    cy.get('[data-testid="ExpenseCountWidgetTotal"]')
      .contains("Total: 2,000 €")
      .should("be.visible");

    // Delete filters, expect initials expenses back
    cy.get(".FiltersManagementBar__item__remove")
      .each(($div, i) => {
        $div.click();
      })
      .then(() => cy.get(".StdCard__content__data").should("have.length", 5));
  });
});

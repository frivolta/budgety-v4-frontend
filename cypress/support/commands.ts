// add new command to the existing Cypress interface
/// <reference types="cypress" />
declare global {
  export type User = {
    email: string;
    password: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      signupUser: (user: User) => Chainable<User>;
      signinUser: (user: User) => Chainable<User>;
    }
  }
}

export const signupUser = (user: User) => {
  // Fill fields and click signup button
  cy.get('input[name="email"]')
    .click()
    .type(user.email);
  cy.get('input[name="password"]')
    .click()
    .type(user.password);
  cy.get('input[name="confirmPassword"]')
    .click()
    .type(user.password);
  // Submitting the button should trigger the spinner
  cy.get("button")
    .contains("Sign up")
    .click();
  //.get('[data-testid="Spinner"]');
};

export const signinUser = (user: User) => {
  // Fill fields and click signup button
  cy.get('input[name="email"]')
    .click()
    .type(user.email);
  cy.get('input[name="password"]')
    .click()
    .type(user.password);
  cy.get("button")
    .contains("Login")
    .click()
    .get('[data-testid="Spinner"]');
};

Cypress.Commands.add("signupUser", signupUser);
Cypress.Commands.add("signinUser", signinUser);

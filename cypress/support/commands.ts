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
    }
  }
}

export const signupUser = (user: User) => {
  cy.then(() => user);
};
Cypress.Commands.add("signupUser", signupUser);

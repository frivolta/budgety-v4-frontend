/// <reference types="cypress" />
import { SUCCESS, ERRORS } from "../../../src/utils/messages";
import { testUser } from "../../config/users";
import { NETWORK } from "../../config/variables";

import { setUserToLocalStorage } from "../../../src/utils/authentication/auth.utils";
import { successfullLoginResponse, rejectedLoginResponse } from "../../mocks/signin-api.mock";
/**
 * 1) User can login with right credentials
 *  - Type username
 *  - Type password
 *  - Click Signin
 *  - Intercepted api request
 *  - Intercepted succesful response
 *  - Localstorage has token and user
 *  - Success Toaster message
 *  - User is redirected
 *
 * 2) User is rejected if invalid email or password
 *  - Type username
 *  - Type password
 *  - Click Signin
 *  - Intercepted api request
 *  - Intercepted succesful response
 *  - Localstorage has token and user
 *  - Success Toaster message
 *  - User is redirected
 *
 * 3) Let user correctly see dashboard if already logged in
 * 4) User is shown enabled or disabled button based on fields validation
 *  - Email but empty password
 *  - All fields are correct, button enabled
 *  - Email is invalid
 *
 */

describe("Signin", () => {
  beforeEach(() => {
    // Visit URL
    cy.visit(`${NETWORK.LOCAL}/signin`).contains("Login");
    cy.location("pathname").should("eq", "/signin");
  });
  it("correctly signs in a valid user ", () => {
    // Stub signin request
    cy.server();
    cy.route({
      url: "**/v1/auth/login",
      method: "POST",
      status: 200,
      response: successfullLoginResponse,
      delay: 1000
    }).as("login-request");

    cy.signinUser({ email: testUser.email, password: testUser.password });

    // Signup localstorage and response
    cy.wait("@login-request").should(xhr => {
      expect(xhr.response.body).to.deep.equal(successfullLoginResponse);
      expect(JSON.parse(localStorage.getItem("user"))).to.deep.equal(successfullLoginResponse.user);
      expect(JSON.parse(localStorage.getItem("tokens"))).to.deep.equal(successfullLoginResponse.tokens);
    });

    // Toaster is visible
    cy.get(".Toaster")
      .contains(SUCCESS.signinSuccess)
      .should("be.visible");

    // Location change
    cy.location("pathname").should("eq", "/");
  });
  it("throws error if user or password are invalid ", () => {
    // Stub signin request
    cy.server();
    cy.route({
      url: "**/v1/auth/login",
      method: "POST",
      status: 401,
      response: rejectedLoginResponse,
      delay: 1000
    }).as("login-reject");

    cy.signinUser({ email: testUser.email, password: testUser.password });

    // Signup localstorage and response
    cy.wait("@login-reject").should(xhr => {
      expect(xhr.status).to.equal(401);
      expect(localStorage.getItem("user")).to.be.null;
      expect(localStorage.getItem("tokens")).to.be.null;
    });

    // Error card should be visible
    cy.get('[data-testid="AltCard"]')
      .contains("Incorrect email or password")
      .should("be.visible");

    // Toaster is visible
    cy.get(".Toaster")
      .contains(ERRORS.signinFailed)
      .should("be.visible");

    // Location change
    cy.location("pathname").should("eq", "/signin");
  });
  it("let the user visit the dashboard if already logged in", () => {
    setUserToLocalStorage(successfullLoginResponse);
    cy.visit(`${NETWORK.LOCAL}/`);
    cy.location("pathname").should("eq", "/");
  });

  it("shows disabled button if empty fields or incorrect email", () => {
    // Button starts disabled
    cy.get("button").should("be.disabled");
    // Email without password
    cy.get('input[name="email"]')
      .click()
      .type(testUser.email);

    cy.get("button").should("be.disabled");

    // Email and password
    cy.get('input[name="password"]')
      .click()
      .type(testUser.password);

    cy.get("button").should("be.enabled");

    // Empty email and set invalid email
    cy.get('input[name="email"]')
      .click()
      .clear()
      .type("invalidemail.com");

    cy.get("button").should("be.disabled");
  });
});

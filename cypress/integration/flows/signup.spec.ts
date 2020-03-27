/// <reference types="cypress" />
import * as axios from "axios";
import { SUCCESS } from "../../../src/utils/messages";
/**
 * Endpoint: http://localhost:3001/v1/test
 * 1) Before all, find user by email and delete it (eg: DELETE /auth/test-user)
 * 2) Before all, create a new user (eg: POST /auth/test-user)
 * 3) User can signup with right credentials
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signup
 *  - Loading is spinning
 *  - Success Toaster message
 *  - Intercepted api request
 *  - Intercepted succesful response
 *  4) User cannot signup with email already present
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signup
 *  - Loading is spinning
 *  - Intercept api request
 *  - Intercepted rejected response
 *  - Error toaster message
 *  - Error message
 * *) After all, find user by email and delete it (eg: DELETE /auth/test-user)
 *
 * @ToDo 1) ENV credentials, 2
 */

describe("Signup", function() {
  before(() => {
    // Create test user
    axios.default.post("http://localhost:3001/v1/test");
    cy.visit("http://localhost:3000/signup").contains("Sign up");
  });

  it("User can signup with right credentials", async () => {
    await axios.default.delete("http://localhost:3001/v1/test");

    //Setup server interceptor
    cy.server();
    cy.route({
      url: "**/v1/auth/register",
      method: "POST"
    }).as("signup-request");

    // Fill fields and click signup button
    cy.get('input[name="email"]')
      .click()
      .type("test@user.com");
    cy.get('input[name="password"]')
      .click()
      .type("Ribbon99!");
    cy.get('input[name="confirmPassword"]')
      .click()
      .type("Ribbon99!");
    // Submitting the button should trigger the spinner
    cy.get("button")
      .contains("Sign up")
      .click()
      .get('[data-testid="Spinner"]');

    // Ajax call signup
    cy.wait("@signup-request").should(xhr => {
      expect(xhr.request.body).deep.equal({
        email: "test@user.com",
        password: "Ribbon99!"
      });
      expect(xhr.response.body).to.have.all.keys("user", "tokens");
    });

    // Toaster is visible
    cy.get(".Toaster")
      .contains(SUCCESS.signupSuccess)
      .should("be.visible");
  });

  after(() => {
    // Delete test user
    axios.default.delete("http://localhost:3001/v1/test");
  });
});

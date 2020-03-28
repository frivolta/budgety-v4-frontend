/// <reference types="cypress" />
import * as axios from "axios";
import { SUCCESS, ERRORS } from "../../../src/utils/messages";
import { testUser } from "../../config/users";
import { NETWORK } from "../../config/variables";
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
  it("signup rejected with email already registered", () => {
    cy.visit(`${NETWORK.LOCAL}/signup`).contains("Sign up");

    //Setup server interceptor
    cy.server();

    // Stub rejection
    cy.route({
      url: "**/v1/auth/register",
      method: "POST",
      status: 400,
      response: { code: 400, message: "Email already taken" },
      delay: 1000
    }).as("signup-reject");

    cy.signupUser({ email: testUser.email, password: testUser.password });

    // Ajax call signup
    cy.wait("@signup-reject").then(xhr => {
      expect(xhr.status).to.equal(400);
    });

    // Toaster is visible
    cy.get(".Toaster")
      .contains(ERRORS.signupFailed)
      .should("be.visible");

    cy.get('[data-testid="AltCard"]')
      .contains("Email already taken")
      .should("be.visible");
  });
});

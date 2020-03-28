/// <reference types="cypress" />
import * as axios from "axios";
import { SUCCESS } from "../../../src/utils/messages";
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
  this.beforeEach(() => {
    // Create test user
    axios.default.post(`${NETWORK.SERVER}/test`);
    cy.visit(`${NETWORK.LOCAL}/signup`).contains("Sign up");
  });

  it("signup new user correctly", async () => {
    await axios.default.delete(`${NETWORK.SERVER}/test`);

    //Setup server interceptor
    cy.server();
    cy.route({
      url: "**/v1/auth/register",
      method: "POST"
    }).as("signup-request");

    cy.signupUser({ email: testUser.email, password: testUser.password });

    // Ajax call signup
    cy.wait("@signup-request").should(xhr => {
      expect(xhr.request.body).deep.equal({
        email: testUser.email,
        password: testUser.password
      });
      expect(xhr.response.body).to.have.all.keys("user", "tokens");
    });

    // Toaster is visible
    cy.get(".Toaster")
      .contains(SUCCESS.signupSuccess)
      .should("be.visible");

    // Check if path
    cy.location("pathname").should("eq", "/signin");
  });

  this.afterEach(() => {
    // Delete test user
    axios.default.delete(`${NETWORK.SERVER}/test`);
  });
});

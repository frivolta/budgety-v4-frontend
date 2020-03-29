/// <reference types="cypress" />
import { SUCCESS, ERRORS } from "../../../src/utils/messages";
import { testUser } from "../../config/users";
import { NETWORK } from "../../config/variables";
import { IApiUserDetails } from "../../../src/types";
import { AxiosError } from "axios";
/**
 * 1) User can login with right credentials
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signin
 *  - Intercepted api request
 *  - Intercepted succesful response
 *  - Localstorage has token and user
 *  - Success Toaster message
 *  - User is redirected
 *  - Redirects already logged in user
 */

export const successfullLoginResponse: IApiUserDetails = {
  user: { id: "5e7fe0a60ffb7e5e9ef321e7", email: "test@user.com", role: "user" },
  tokens: {
    access: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTdmZTBhNjBmZmI3ZTVlOWVmMzIxZTciLCJpYXQiOjE1ODU0Nzc5MjQsImV4cCI6MTU4ODEwNTkyNH0.gjRFvFxv6efFeegKTqgCWhg2I6WfHSKByBnofW8feWg",
      expires: "2020-04-28T20:32:04.094Z"
    },
    refresh: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTdmZTBhNjBmZmI3ZTVlOWVmMzIxZTciLCJpYXQiOjE1ODU0Nzc5MjQsImV4cCI6MTU4ODA2OTkyNH0.tpdEGO-llJuRnZ3WLpuQWa1Nv7ATZrhE7gIcC4_wYM0",
      expires: "2020-04-28T10:32:04.094Z"
    }
  }
};

export const rejectedLoginResponse: AxiosError = {
  code: 401,
  message: "Incorrect email or password",
  stack: "Error: Incorrect email or password"
};

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
});

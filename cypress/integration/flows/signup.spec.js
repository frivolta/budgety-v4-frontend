/// <reference types="cypress" />
import { expenseTypeData } from "../../../src/data/expensesData";

const validUser = {
  email: "test@cypres.io",
  password: "Lampone01!",
  role: "admin"
};

const createUser = async (email: string, password: string, role: string): Promise<string> => {
  const response = await axios.post(`${process.env.REACT_APP_HOST}/auth/register`, {
    email,
    password,
    role
  });
  return response.data.tokens.access.token;
};

// Delete user script

context("Signup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
    const token = createUser(validUser.email, validUser.password, validUser.role);
  });

  it("renders signup page", () => {
    cy.get('[data-testid="SignupContainer"]').should("have.length", 1);
  });

  it("can successfully create user", async () => {
    cy.get("input[name=email]").type(validUser.email);
    cy.get("input[name=password]").type(validUser.password);
    cy.get("input[name=confirmPassword]").type(validUser.password);
    cy.get("button[data-testid=Button]").click();
  });
});

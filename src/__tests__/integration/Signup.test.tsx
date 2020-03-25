import React from "react";

import "@testing-library/jest-dom";
import "mutationobserver-shim";
import axios from "axios";

import { createMemoryHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import thunkMiddleware from "redux-thunk";

import { authDefaultState } from "../../redux/reducers/authReducer";
import { createStore, applyMiddleware } from "redux";
import { rootReducer, AppState } from "../../redux/configureStore";
import { Provider } from "react-redux";
import { SignupContainer } from "../../container/SignupContainer/SignupContainer";
import { SIGNUP_ERRORS } from "../../utils/Signup.schema";
import { act } from "react-dom/test-utils";

jest.mock("axios");

const loggedInState: Pick<AppState, "auth"> = {
  auth: {
    user: undefined,
    isLoggedIn: true,
    isSigninUp: false,
    isLoggingIn: false,
    error: { hasErrors: false, message: undefined }
  }
};

const currentRoute = "/signup";

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

export interface renderWithReduxAndRouter {
  (ui: React.ReactNode, store: any, componentRoute?: string): any;
}

const renderWithReduxAndRouter: renderWithReduxAndRouter = (
  ui,
  { initialState, store = createStore(rootReducer, initialState, middlewareEnhancer) },
  componentRoute
) => {
  const history = createMemoryHistory({ initialEntries: ["/signup"] });
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={componentRoute ? componentRoute : "/signup"}>
              {ui}
            </Route>
            <Route exact path="/">
              <div data-testid="GenericComponent"></div>
            </Route>
          </Switch>
        </Router>
      </Provider>
    ),
    store,
    history
  };
};

describe("Signup page renders correctly", () => {
  it("renders signup page correctly", () => {
    const { getByTestId } = renderWithReduxAndRouter(<SignupContainer />, authDefaultState, currentRoute);
    expect(getByTestId("SignupContainer")).toBeInTheDocument();
  });

  it("renders form with correct fields", () => {
    const { getByTestId, getByPlaceholderText } = renderWithReduxAndRouter(
      <SignupContainer />,
      authDefaultState,
      currentRoute
    );
    expect(getByPlaceholderText("E-mail")).toHaveValue("");
    expect(getByPlaceholderText("Password")).toHaveValue("");
    expect(getByPlaceholderText("Confirm Password")).toHaveValue("");
    expect(getByTestId("Button")).toHaveTextContent("Sign up");
  });
});

describe("Signup page validate fileds correctly", () => {
  it("throws an error if it is not an email", async () => {
    const { getByTestId, getByPlaceholderText, getByText } = renderWithReduxAndRouter(
      <SignupContainer />,
      authDefaultState,
      currentRoute
    );
    const emailField = getByPlaceholderText("E-mail");
    const submitButton = getByTestId("Button");
    await act(async () => {
      fireEvent.change(emailField, { target: { value: "invalidEmail" } });
      fireEvent.click(submitButton);
    });
    expect(getByText(SIGNUP_ERRORS.invalidEmail)).toBeInTheDocument();
    expect(getByText(SIGNUP_ERRORS.passwordRequired)).toBeInTheDocument();
    expect(getByText(SIGNUP_ERRORS.confirmPasswordRequired)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("throws an error password is not secure, not matching, required field is empty", async () => {
    const { getByTestId, getByPlaceholderText, getByText } = renderWithReduxAndRouter(
      <SignupContainer />,
      authDefaultState,
      currentRoute
    );
    const passwordField = getByPlaceholderText("Password");
    const confirmPasswordField = getByPlaceholderText("Confirm Password");
    const submitButton = getByTestId("Button");
    await act(async () => {
      fireEvent.change(passwordField, { target: { value: "invalidPassword" } });
      fireEvent.change(confirmPasswordField, { target: { value: "invalidPassword2" } });
      fireEvent.click(submitButton);
    });

    expect(getByText(SIGNUP_ERRORS.required)).toBeInTheDocument();
    expect(getByText(SIGNUP_ERRORS.invalidPassword)).toBeInTheDocument();
    expect(getByText(SIGNUP_ERRORS.passwordMatch)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});

describe("Signup page has correct path", () => {
  it("redirects the user if he is already logged in", async () => {
    const { getByTestId, queryByTestId } = renderWithReduxAndRouter(
      <SignupContainer />,
      { initialState: loggedInState },
      currentRoute
    );
    expect(queryByTestId("SignupContainer")).toBeNull();
    expect(getByTestId("GenericComponent")).toBeInTheDocument();
  });
});

describe("User can signup", () => {
  it("correctly signup a valid user", async () => {
    const { getByTestId, getByPlaceholderText } = renderWithReduxAndRouter(
      <SignupContainer />,
      authDefaultState,
      currentRoute
    );
    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Password");
    const confirmPasswordField = getByPlaceholderText("Confirm Password");
    const submitButton = getByTestId("Button");
    await act(async () => {
      fireEvent.change(emailField, { target: { value: "test@test.it" } });
      fireEvent.change(passwordField, { target: { value: "Lampone01!" } });
      fireEvent.change(confirmPasswordField, { target: { value: "Lampone01!" } });
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
    });
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/v1/auth/register", {
      email: "test@test.it",
      password: "Lampone01!"
    });
  });
});

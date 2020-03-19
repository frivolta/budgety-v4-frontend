import React from "react";
import { Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { AppState } from "./redux/configureStore";

import { verifyAuthUser, getUser } from "./utils/authentication/auth.utils";
import { startRefreshLogin } from "./redux/actions/authActions";
import { PrivateRoute } from "./container/PrivateRoute/PrivateRoute";

//Routes components
import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";
import { IndexPage } from "./pages/index";
import { AddExpensePage } from "./pages/addExpense";

export const Routes: React.FC = () => {
  const { isLoggedIn } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    checkAuthStateInconsistency();
  });

  // Everytime routes renders check localStorage and refresh redux state if it is inconsistent
  const checkAuthStateInconsistency = () => {
    const isAuth = verifyAuthUser();
    if (isAuth && !isLoggedIn) {
      const user = getUser();
      if (user) {
        dispatch(startRefreshLogin(user));
      }
    }
  };

  return (
    <>
      <PrivateRoute exact path="/" component={IndexPage} isSignedIn={verifyAuthUser()} />
      <PrivateRoute exact path="/expense/add" component={AddExpensePage} isSignedIn={verifyAuthUser()} />
      <Route exact path="/signin" component={SigninPage} />
      <Route exact path="/signup" component={SignupPage} />
    </>
  );
};

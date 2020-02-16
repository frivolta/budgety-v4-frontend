import React from "react";
import jwt_decode from "jwt-decode";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { AuthDataProvider } from './context/useAuthDataContext';

import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./container/PrivateRoute/PrivateRoute";
import { UserDetailsProvider } from "./context/useUserDetailsValue";
import { SidenavProvider } from "./context/useSidenavValue";
import { IndexPage } from "./pages/index";
import { AddExpensePage } from "./pages/addExpense";


toast.configure({
  className: "Toaster",
  draggable: true,
  draggablePercent: 60,
  autoClose: 20000
});

type decodedToken = {
  userId: string;
  exp: number;
};

const App: React.FC = () => {

/** 
* Verify if user is signed-in.
* @summary Async(private route can't render before complete) get localstorage jwt, decode it, verify if it is valid.
* @return {Promise<boolean>} true if user is signed in
*/

const verifyAuthUser = async() => {
    const token = await localStorage.getItem("auth-token");
    if (token) {
      const decoded: decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        window.location.href = "/signin";
        console.log("Token expired!");
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
    <AuthDataProvider>
      <UserDetailsProvider>
        <SidenavProvider>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/" component={IndexPage} isSignedIn={verifyAuthUser()}/>
              <PrivateRoute exact path="/expense/add" component={AddExpensePage} isSignedIn={verifyAuthUser()}/>
              <Route exact path="/signin" component={SigninPage} />
              <Route exact path="/signup" component={SignupPage} />
            </Switch>
          </BrowserRouter>
        </SidenavProvider>
      </UserDetailsProvider>
      </AuthDataProvider>
    </>
  );
};

export default App;

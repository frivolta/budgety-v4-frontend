import React from "react";
import jwt_decode from "jwt-decode";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { SignupPage } from "./pages/signup";
import { SigninPage } from "./pages/signin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./container/PrivateRoute/PrivateRoute";
import { UserDetailsProvider } from "./context/useUserDetailsValue";
import { SidenavProvider } from "./context/useSidenavValue";
import { IndexPage } from "./pages/index";

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
  const verifyAuthUser = () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const decoded: decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //@dispatch logout user and redirect
        window.location.href = "/signin";
        console.log("Token expired!");
        return false;
      }
      //@dispatch user id, token, expiry to redux
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <UserDetailsProvider>
        <SidenavProvider>
          <BrowserRouter>
            <Switch>
              {/*<PrivateRoute exact path="/" component={IndexPage} isSignedIn={verifyAuthUser()}/>*/}
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/signin" component={SigninPage} />
              <Route exact path="/signup" component={SignupPage} />
            </Switch>
          </BrowserRouter>
        </SidenavProvider>
      </UserDetailsProvider>
    </>
  );
};

export default App;

import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidenavProvider } from "./context/useSidenavValue";

import { Routes } from "./Routes";

toast.configure({
  className: "Toaster",
  draggable: true,
  draggablePercent: 60,
  autoClose: 2000
});

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <SidenavProvider>
          <BrowserRouter>
            <Switch>
              <Routes />
            </Switch>
          </BrowserRouter>
        </SidenavProvider>
      </Provider>
    </>
  );
};

export default App;

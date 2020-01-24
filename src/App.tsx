import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { SignupPage } from './pages/signup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  className: 'Toaster',
  draggable: true,
  draggablePercent: 60,
  autoClose: 20000
});

const App: React.FC = () => {
  return <>
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={SignupPage}/>
      <Route exact path='/signup' component={SignupPage}/>
    </Switch>
  </BrowserRouter>
  </>;
};

export default App;

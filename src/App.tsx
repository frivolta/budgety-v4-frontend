import React from 'react';
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
  return <SignupPage />;
};

export default App;

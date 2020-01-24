import React from 'react';
import { SignupPage } from './pages/signup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const App: React.FC = () => {
  return <SignupPage />;
};

export default App;

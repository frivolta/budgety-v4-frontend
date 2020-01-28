import React from 'react';
import { SigninContainer } from '../container/SigninContainer/SigninContainer';
import { useUserDetailsValue } from '../context/useUserDetailsValue';

export const SigninPage: React.FC = () => {
  // Test to remove
  const userValues = useUserDetailsValue();
  userValues?.setUserIsLoggedIn(true)
  console.log(userValues?.userIsLoggedIn)
  return <SigninContainer />;
};

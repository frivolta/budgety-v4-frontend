import React, { useContext, createContext, ReactNode } from 'react';
import { useUserDetail } from '../hooks/useUserDetails';

interface IUserDetails {
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type UserDetailProviderProps = {
  children: ReactNode;
};

const UserDetailsContext = createContext<IUserDetails | undefined>(undefined);

const UserDetailsProvider = ({ children }: UserDetailProviderProps) => {
  const { userIsLoggedIn, setUserIsLoggedIn } = useUserDetail();
  return (
    <UserDetailsContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

const useUserDetailsValue = () => {
  return useContext(UserDetailsContext);
};

export { UserDetailsProvider, useUserDetailsValue };

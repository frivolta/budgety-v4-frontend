import React, { createContext, useState, useEffect, useContext } from 'react';

type AuthDataValues = {
  token?: string;
  email?: string;
};

interface IAuthDataValue {
  authData: AuthDataValues;
  onLogin: (newAuthData: AuthDataValues) => void;
  onLogout: () => void;
}

const initialAuthData = {};
export const AuthDataContext = createContext<IAuthDataValue | null>(null);

export const AuthDataProvider: React.FC = props => {
  const [authData, setAuthData] = useState<AuthDataValues>(initialAuthData);
  useEffect(() => {
    const currentAuthData = getAuthData();
    if (currentAuthData) {
      setAuthData({ token: currentAuthData });
    }
  }, []);

  const getAuthData = () => localStorage.getItem('auth-token');
  const onLogout = () => setAuthData(initialAuthData);
  const onLogin = (newAuthData: AuthDataValues) => setAuthData(newAuthData);

  const authDataValue: IAuthDataValue = { authData, onLogin, onLogout };
  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

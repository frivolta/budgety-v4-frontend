import React from 'react';
import { toasterInfo, toasterError, toasterSuccess } from '../utils/showToaster';
import { useSelector } from 'react-redux';

import { AppState } from '../redux/configureStore';

export interface IUseToaster {
  children: React.ReactChild;
}

export const useToaster: React.FC = ({ children }) => {
  const { hasErrors, message } = useSelector((state: AppState) => state.auth.error);

  return <>{children}</>;
};

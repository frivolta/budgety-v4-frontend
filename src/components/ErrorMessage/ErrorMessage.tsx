import React from 'react';
import { AltCard } from '../Card/AltCard';

interface IErrorMessage {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<IErrorMessage> = props => {
  return (
    <AltCard>
      {props.children}
    </AltCard>
  );
};

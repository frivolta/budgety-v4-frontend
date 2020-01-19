import React, { ReactNode } from 'react';

interface ILabel {
  children: ReactNode;
}

export const Label: React.FC<ILabel> = props => {
  return (
    <span className="Label">
      {props.children}
    </span>
  );
};

import React from 'react';

export enum variation {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4'
}

interface IHeading {
  children: React.ReactNode;
  variation: variation;
}

export const Heading: React.FC<IHeading> = props => {
  return (
    <props.variation className="Heading">
      {props.children}
    </props.variation>
  );
};

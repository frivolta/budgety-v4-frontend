import React, { ReactNode } from 'react';

interface ICard {
  className?: string;
  children: ReactNode;
}

export const AltCard: React.FC<ICard> = props =>
  <div className={`AltCard ${props.className}`} data-testid="AltCard">
    <div className="AltCard__content">
      {props.children}
    </div>
  </div>;

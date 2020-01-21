import React, { ReactNode } from 'react';

interface ICard {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<ICard> = props =>
  <div className={`Card ${props.className}`} data-testid="Card">
    <div className="Card__content">
      {props.children}
    </div>
  </div>;

import React from 'react';

interface ICard {
  className?: string;
}

export const AltCard: React.FC<ICard> = props =>
  <div className={`AltCard ${props.className}`}>
    <div className="AltCard__content">
      {props.children}
    </div>
  </div>;

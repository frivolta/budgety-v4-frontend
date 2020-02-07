import React, { ReactNode } from 'react';

interface IStdCard {
  className?: string;
  children: ReactNode;
}

export const StdCard: React.FC<IStdCard> = props =>
  <div className={`StdCard ${props.className}`} data-testid="StdCard">
    <div className="StdCard__content">
      {props.children}
    </div>
  </div>;

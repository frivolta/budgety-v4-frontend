import React, { ReactNode } from 'react';
import { StdCard } from './StdCard';

export enum expenseType {
  EXPENSE,
  INCOME
}

interface IExpenseCard {
  className?: string;
  description: string;
  type: expenseType;
  date: string;
}

export const ExpenseCard: React.FC<IExpenseCard> = props =>
  <StdCard className={props.type === expenseType.EXPENSE ? 'StdCard--primary' : 'StdCard--secondary'}>
    <div className="StdCard__content__data">
      <div className="StdCard__content__category" style={{ color: '#ff224f' }}>
        TRANSPORTATION
      </div>
      <div className="StdCard__content__description">
        <span className="no-wrap">
          {props.description}
        </span>
      </div>
      <div className="StdCard__content__date">
        {props.date}
      </div>
    </div>
    <div className="StdCard__content__amount">
      <span>-150,00 €</span>
    </div>
  </StdCard>;

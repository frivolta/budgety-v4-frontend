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
    <div className="StdCard__content__description">
      {props.description}
    </div>
    <div className="StdCard__content__heading">
      {props.date}
    </div>
  </StdCard>;

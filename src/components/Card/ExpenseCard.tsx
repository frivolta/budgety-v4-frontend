import React from 'react';
import { StdCard } from './StdCard';
import { convertAmountToCurrency, convertDateToReadable } from '../../utils/format';

export const expenseType = {
  EXPENSE: 'expense',
  INCOME: 'income'
};

interface IExpenseCard {
  className?: string;
  description: string;
  type: string;
  date: string;
  amount: number;
  category: string;
}

export const ExpenseCard: React.FC<IExpenseCard> = props =>
  <StdCard className={props.type === expenseType.EXPENSE ? 'StdCard--primary' : 'StdCard--secondary'}>
    <div className="StdCard__content__data">
      <div className="StdCard__content__category" style={{ color: '#ff224f' }}>
        {props.category}
      </div>
      <div className="StdCard__content__description">
        <span className="no-wrap">
          {props.description}
        </span>
      </div>
      <div className="StdCard__content__date">
        {convertDateToReadable(props.date)}
      </div>
    </div>
    <div className="StdCard__content__amount">
      <span>
        {convertAmountToCurrency(props.amount, props.type)}
      </span>
    </div>
  </StdCard>;

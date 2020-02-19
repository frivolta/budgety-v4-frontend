import React, { useState } from 'react';
import moment from 'moment';

export const DateFilter: React.FC = () => {
  const [month, setMonth] = useState<moment.Moment>(moment());

  const _filterByMonth = () => {
    const minDate = month.clone().startOf('month').format();
    const maxDate = month.clone().endOf('month').format();

    console.log(minDate, maxDate, month);
  };

  // those should be async
  const _decreaseMonth = (): void => {
    setMonth(month.clone().subtract(1, 'month'));
    _filterByMonth();
  };
  const _increaseMonth = (): void => {
    setMonth(month.clone().add(1, 'month'));
    _filterByMonth();
  };

  return (
    <h2>
      <span onClick={_decreaseMonth}>
        {'< '}
      </span>
      <span>
        {month.format('MMM YYYY')}
      </span>
      <span onClick={_increaseMonth}>
        {month.clone().add(1, 'hour') > moment() ? '' : ' >'}
      </span>
    </h2>
  );
};

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { expenseTypeData, categoryData } from '../../data/expensesData';

import { Label } from '../../components/Label/Label';
import { Select } from '../../components/Select/Select';

import { ExpenseTypeType } from '../../types';
import { startAddExpenseTypeFilter, startClearExpenseTypeFilter } from '../../redux/actions/staticFiltersActions';

const defaultExpenseType: ExpenseTypeType = {
  id: 0,
  value: 'default',
  caption: 'No filter'
};

const extendedExpenseTypeData: ExpenseTypeType[] = expenseTypeData.concat(defaultExpenseType);

export const FiltersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [expenseTypeFilter, setExpenseTypeFilter] = useState<ExpenseTypeType>(defaultExpenseType);

  useEffect(
    () => {
      dispatchExpenseTypeFilter(expenseTypeFilter);
    },
    [expenseTypeFilter]
  );

  // Set the right expense type, filtering value to the state
  const setExpenseTypeByValue = (value: string) => {
    const expenseType = extendedExpenseTypeData.filter(expense => expense.value === value);
    const [expenseTypeToSetAsState] = expenseType;
    setExpenseTypeFilter(expenseTypeToSetAsState);
  };

  // Expense type dispatcher when expenseType changes
  const dispatchExpenseTypeFilter = (expenseType: ExpenseTypeType) => {
    if (expenseType.value !== 'default') {
      dispatch(startAddExpenseTypeFilter(expenseType.value));
    } else {
      dispatch(startClearExpenseTypeFilter());
    }
  };

  return (
    <div className="FiltersContainer">
      <Label>Expense type:</Label>
      <Select
        placeholder="Filter by expense type..."
        name="expense-type-filter"
        options={extendedExpenseTypeData}
        value={expenseTypeFilter.value}
        handleChange={event => setExpenseTypeByValue(event.target.value)}
      />
      <Label>Category:</Label>
      <Select placeholder="Filter by expense type..." name="expense-type-filter" options={categoryData} />
    </div>
  );
};

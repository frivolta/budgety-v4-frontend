import React from 'react';
import { Label } from '../../components/Label/Label';
import { Select } from '../../components/Select/Select';
import { expenseTypeData, categoryData } from '../../data/expensesData';

export const FiltersContainer: React.FC = () => {
  return (
    <div className="FiltersContainer">
      <Label>Expense type:</Label>
      <Select placeholder="Filter by expense type..." name="expense-type-filter" options={expenseTypeData} />
      <Label>Category:</Label>
      <Select placeholder="Filter by expense type..." name="expense-type-filter" options={categoryData} />
    </div>
  );
};

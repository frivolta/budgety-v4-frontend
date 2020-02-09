import React, { useState } from 'react';
import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import { Heading, variation } from '../components/Heading/Heading';
import { StdCard } from '../components/Card/StdCard';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { expenseTypeData, categoryData } from '../data/expensesData';
import DatePicker from 'react-date-picker';

export const AddExpensePage: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <DashboardContainer>
      <StdCard>
        <div className="StdCard__wrapper">
          <Heading variation={variation.h1}>
            Fill all the fields <br />to <span className="primary-color">add an Expense.</span>
          </Heading>
          <Input
            name="description"
            placeholder="Description"
            type="text"
            value={description}
            handleChange={e => setDescription(e.target.value)}
          />
          <Input
            name="amount"
            placeholder="Amount"
            type="text"
            value={amount}
            handleChange={e => setAmount(e.target.value)}
          />
          <Select
            options={expenseTypeData}
            name="expenseType"
            placeholder="Expense type"
            value={amount}
            handleChange={e => console.log(e.target)}
          />
          <Select
            options={categoryData}
            name="category"
            placeholder="Category"
            value={amount}
            handleChange={e => console.log(e.target)}
          />
          <DatePicker onChange={(date: any) => setStartDate(date)} value={startDate} />{' '}
        </div>
      </StdCard>
    </DashboardContainer>
  );
};

import React, { useState } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { useMutation } from 'react-apollo';
import { toasterInfo, toasterError } from '../utils/showToaster';
import { convertToCurrency } from '../utils/format';
import { createExpenseObject } from '../utils/expenses';
import { DashboardContainer } from '../container/DashboardContainer/DashboardContainer';
import Calendar from 'react-calendar';
import { Heading, variation } from '../components/Heading/Heading';
import { StdCard } from '../components/Card/StdCard';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { Button } from '../components/Button/Button';
import { expenseTypeData, categoryData } from '../data/expensesData';
import { SUCCESS, ERRORS } from '../utils/messages';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

const CREATE_EXPENSE_MUTATION = gql`
  mutation CreateExpense($type: String!, $description: String!, $date: String!, $amount: Float!, $category: String!) {
    createExpense(type: $type, description: $description, date: $date, amount: $amount, category: $category) {
      id
      amount
    }
  }
`;

// @ToDo: Refetch expense query after mutation

export const AddExpensePage: React.FC = () => {
  const [createExpense, { loading, error }] = useMutation(CREATE_EXPENSE_MUTATION);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('€ 0');
  const [category, setCategory] = useState<string>(categoryData[0].value);
  const [expenseType, setExpenseType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());

  const convertToCurrencyOnBlur = (amountToConvert: string) => setAmount(`€ ${convertToCurrency(amountToConvert)}`);

  const handleSubmit = async () => {
    try {
      const expenseObject = createExpenseObject(
        description,
        parseFloat(amount.replace('€', '').trim()),
        category,
        expenseType,
        moment(startDate).utc().format()
      );
      await createExpense({ variables: expenseObject });
      toasterInfo(SUCCESS.addExpenseSuccess);
    } catch (error) {
      await toasterError(ERRORS.addExpenseFailed);
      console.error('Signup error: ', error);
    }
  };

  return (
    <DashboardContainer>
      <StdCard>
        <div className="StdCard__wrapper">
          <Heading variation={variation.h1}>
            Fill all the fields <br />
            to <span className="primary-color">add an Expense.</span>
          </Heading>
          <Input
            name="description"
            placeholder="Description"
            type="text"
            value={description}
            handleChange={e => setDescription(e.target.value)}
          />
          <Select
            options={expenseTypeData}
            name="expenseType"
            placeholder="Expense type"
            value={expenseType}
            handleChange={e => setExpenseType(e.target.value)}
          />
          <Input
            name="amount"
            placeholder="Amount €"
            type="text"
            blur={e => convertToCurrencyOnBlur(e.target.value)}
            value={`${amount}`}
            handleChange={e => setAmount(e.target.value)}
          />
          <Select
            options={categoryData}
            name="category"
            placeholder="Category"
            handleChange={e => setCategory(e.target.value)}
            value={category}
          />
          <Calendar onChange={(date: any) => setStartDate(date)} value={startDate} />
          <Button text="Add Expense" handleClick={() => handleSubmit()} isLoading={loading} disabled={loading} />
          {error &&
            <ErrorMessage>
              {error.message}
            </ErrorMessage>}
        </div>
      </StdCard>
    </DashboardContainer>
  );
};

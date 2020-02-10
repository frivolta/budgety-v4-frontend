import React, { useState } from "react";
import moment from "moment";
import { convertToCurrency } from "../utils/format";
import { createExpenseObject } from "../utils/expenses";
import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import Calendar from "react-calendar";
import { Heading, variation } from "../components/Heading/Heading";
import { StdCard } from "../components/Card/StdCard";
import { Input } from "../components/Input/Input";
import { Select } from "../components/Select/Select";
import { Button } from "../components/Button/Button";
import { expenseTypeData, categoryData } from "../data/expensesData";

export const AddExpensePage: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("€ 0");
  const [category, setCategory] = useState<string>("");
  const [expenseType, setExpenseType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());

  const convertToCurrencyOnBlur = (amountToConvert: string) =>
    setAmount(`€ ${convertToCurrency(amountToConvert)}`);

  const handleSubmit = () => {
    const expenseObject = createExpenseObject(
      description,
      amount.replace("€", "").trim(),
      category,
      expenseType,
      moment(startDate)
        .utc()
        .format()
    );
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
          <Calendar
            onChange={(date: any) => setStartDate(date)}
            value={startDate}
          />
          <Button text="Add Expense" handleClick={() => handleSubmit()} />
        </div>
      </StdCard>
    </DashboardContainer>
  );
};

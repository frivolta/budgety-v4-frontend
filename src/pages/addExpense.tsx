import React, { useState } from "react";
import moment from "moment";
import { toasterInfo, toasterError } from "../utils/showToaster";
import { convertToCurrency, convertCurrencyToAmount } from "../utils/format";
import { createExpenseObject } from "../utils/expenses";
import { DashboardContainer } from "../container/DashboardContainer/DashboardContainer";
import Calendar from "react-calendar";
import { Heading, variation } from "../components/Heading/Heading";
import { StdCard } from "../components/Card/StdCard";
import { Input } from "../components/Input/Input";
import { Select } from "../components/Select/Select";
import { Button } from "../components/Button/Button";
import { expenseTypeData, categoryData } from "../data/expensesData";
import { SUCCESS, ERRORS } from "../utils/messages";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { CategoryType } from "../types";
import { getCategoriesByExpenseType } from "../utils/categories";
import { useDispatch, useSelector } from "react-redux";
import { startAddExpense } from "../redux/actions/expensesActions";
import { AppState } from "../redux/configureStore";
import { expenseActionsType } from "../types/expensesActionTypes";

export const AddExpensePage: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("€ 0");
  const [category, setCategory] = useState<string>(categoryData[0].value);
  const [categoriesByExpenseType, setCategoriesByExpenseType] = useState<CategoryType[]>(categoryData);
  const [expenseType, setExpenseType] = useState<string>("expense");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { isLoading, loadingType } = useSelector((state: AppState) => state.expense);
  const { hasErrors, message, errorType } = useSelector((state: AppState) => state.expense.error);

  const dispatch = useDispatch();
  const convertToCurrencyOnBlur = (amountToConvert: string) => setAmount(`€ ${convertToCurrency(amountToConvert)}`);

  React.useEffect(() => {
    const expenseTypeByValue = expenseTypeData.filter(type => type.value === expenseType);
    const categoriesByExpenseType = getCategoriesByExpenseType(expenseTypeByValue[0]);
    setCategoriesByExpenseType(categoriesByExpenseType);
    setCategory(categoriesByExpenseType[0].value);
  }, [expenseType]);

  const handleSubmit = async () => {
    try {
      const expenseObject = createExpenseObject(
        description,
        convertCurrencyToAmount(amount),
        category,
        expenseType,
        moment(startDate)
          .utc()
          .format()
      );
      console.log("calling", expenseObject);
      dispatch(startAddExpense(expenseObject));
      toasterInfo(SUCCESS.addExpenseSuccess);
    } catch (error) {
      await toasterError(ERRORS.addExpenseFailed);
      console.error("Signup error: ", error);
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
            options={categoriesByExpenseType}
            name="category"
            placeholder="Category"
            handleChange={e => setCategory(e.target.value)}
            value={category}
          />
          <Calendar onChange={(date: any) => setStartDate(date)} value={startDate} />
          <Button
            text="Add Expense"
            handleClick={() => handleSubmit()}
            isLoading={isLoading && loadingType === expenseActionsType.ADD}
            disabled={isLoading && loadingType === expenseActionsType.ADD}
          />
          {hasErrors && message && errorType === expenseActionsType.ADD && <ErrorMessage>{message}</ErrorMessage>}
        </div>
      </StdCard>
    </DashboardContainer>
  );
};

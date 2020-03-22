import React, { useState } from "react";
import { StdCard } from "./StdCard";

import { useSelector, useDispatch } from "react-redux";

import { convertAmountToCurrency, convertDateToReadable } from "../../utils/format";
import { startDeleteExpense } from "../../redux/actions/filteredExpensesActions";

import Spinner from "react-svg-spinner";
import { AppState } from "../../redux/configureStore";
import { expenseActionsType } from "../../types/expensesActionTypes";
import { CategoryType } from "../../types";

export const expenseType = {
  EXPENSE: "expense",
  INCOME: "income"
};

interface IExpenseCard {
  className?: string;
  id: string;
  description: string;
  type: string;
  date: string;
  amount: number;
  category: CategoryType;
}

export const ExpenseCard: React.FC<IExpenseCard> = props => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { isLoading, loadingType } = useSelector((state: AppState) => state.expense);
  const dispatch = useDispatch();

  const handleDeleteExpense = async (expenseId: string) => {
    await dispatch(startDeleteExpense(expenseId));
    setIsEditMode(false);
  };

  return (
    <StdCard className={props.type === expenseType.EXPENSE ? "StdCard--primary" : "StdCard--secondary"}>
      {!isEditMode && (
        <div className="StdCard__content__data" onDoubleClick={() => setIsEditMode(!isEditMode)}>
          <>
            <div className="StdCard__content__category" style={{ color: props.category.color }}>
              {props.category.caption}
            </div>
            <div className="StdCard__content__description">
              <span className="no-wrap">{props.description}</span>
            </div>
            <div className="StdCard__content__date">{convertDateToReadable(props.date)}</div>
          </>
        </div>
      )}
      {!isEditMode && (
        <div className="StdCard__content__amount">
          <span>{convertAmountToCurrency(props.amount, props.type)}</span>
        </div>
      )}
      {isEditMode && isLoading && loadingType === expenseActionsType.DELETE && (
        <div className="StdCard__content__data--center">
          <Spinner color="#007aff" thickness={3} speed="slow" size="48px" />
        </div>
      )}
      {isEditMode && !isLoading && (
        <div className="StdCard__content__dialog no-margin" onDoubleClick={() => setIsEditMode(!isEditMode)}>
          <span className="no-wrap">Delete this expense?</span>
          <span className="StdCard__content__dialog__action" onClick={() => handleDeleteExpense(props.id)}>
            Yes, delete
          </span>
        </div>
      )}
    </StdCard>
  );
};

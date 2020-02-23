import React, { useState } from "react";
import { StdCard } from "./StdCard";
import {
  convertAmountToCurrency,
  convertDateToReadable
} from "../../utils/format";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpenseMutation($id: String!) {
    deleteExpense(id: $id) {
      id,
    }
}
`;

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
  category: string;
}

export const ExpenseCard: React.FC<IExpenseCard> = props => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [deleteExpenseMutation, {data}] = useMutation(DELETE_EXPENSE_MUTATION)

  const handleDeleteExpense = async(id: string) =>{
    try{
      await deleteExpenseMutation({ variables: { id }})
    }catch(err){
      console.error("Handle delete expense mutation error: ",err)
    }
  }

  return (
    <StdCard
      className={
        props.type === expenseType.EXPENSE
          ? "StdCard--primary"
          : "StdCard--secondary"
      }
    >
      <div
        className="StdCard__content__data"
        onDoubleClick={() => setIsEditMode(!isEditMode)}
      >
        {!isEditMode && (
          <>
            <div
              className="StdCard__content__category"
              style={{ color: "#ff224f" }}
            >
              {props.category}
            </div>
            <div className="StdCard__content__description">
              <span className="no-wrap">{props.description}</span>
            </div>
            <div className="StdCard__content__date">
              {convertDateToReadable(props.date)}
            </div>
          </>
        )}
      </div>
      {!isEditMode && (
        <div className="StdCard__content__amount">
          <span>{convertAmountToCurrency(props.amount, props.type)}</span>
        </div>
      )}
      {isEditMode && (
        <div
          className="StdCard__content__dialog no-margin"
          onDoubleClick={() => setIsEditMode(!isEditMode)}
        >
          <span className="no-wrap">Delete this expense?</span>
          <span
            className="StdCard__content__dialog__action"
            onClick={() => handleDeleteExpense(props.id)}
          >
            Yes, delete
          </span>
        </div>
      )}
    </StdCard>
  );
};

import React, { useState } from "react";
import { StdCard } from "./StdCard";

import {
  convertAmountToCurrency,
  convertDateToReadable
} from "../../utils/format";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Spinner from 'react-svg-spinner';
import {  GET_EXPENSES_BY_USER_QUERY } from '../Widgets/ExpensesWidget/ExpensesWidget';

export const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpenseMutation($id: ID!) {
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
  const [deleteExpenseMutation, {loading}] = useMutation(
    DELETE_EXPENSE_MUTATION, 
    {
      update(cache, {data}) {
        console.log(data)

        // Deep clone
        let getExpensesQuery:any =  cache.readQuery({
          query: GET_EXPENSES_BY_USER_QUERY
        });
        
        // Filter the arr
         getExpensesQuery.getExpenses.filter((expense:any)=>expense.id !==data.deleteExpense.id)

        cache.writeQuery({query: GET_EXPENSES_BY_USER_QUERY, data:{...getExpensesQuery}})
      }
    }
  )


  const handleDeleteExpense = async(id: string) =>{
    try{
      await deleteExpenseMutation({ variables: { id }})
      setIsEditMode(false)
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
    {!isEditMode && (
      <div
        className="StdCard__content__data"
        onDoubleClick={() => setIsEditMode(!isEditMode)}
      >
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
          </div>
          )}
      {!isEditMode && (
        <div className="StdCard__content__amount">
          <span>{convertAmountToCurrency(props.amount, props.type)}</span>
        </div>
      )}
      {isEditMode && loading && <div className="StdCard__content__data--center"><Spinner color="#007aff" thickness={3} speed="slow" size="48px" /></div>}
      {isEditMode && !loading &&(
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

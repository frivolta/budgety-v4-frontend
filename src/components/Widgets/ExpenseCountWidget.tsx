import React from 'react';
import { StdCard } from '../Card/StdCard';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/configureStore';
import { ExpenseType } from '../../types';
import { expenseTypeData } from '../../data/expensesData';
import { convertAmountToCurrency } from '../../utils/format';
import { expenseType } from '../Card/ExpenseCard';

export const ExpenseCountWidget: React.FC = () => {
  const [positiveSymbol, setPositiveSymbol] = React.useState<boolean>(true)
  const {filteredExpenses} = useSelector((state:AppState)=> state.expenses)

  const getExpensesAmount = (expenses: ExpenseType[]): number=>{
    const expensesAmount = expenses.reduce((expenseSum, expense)=>{
      if(expense.type===expenseTypeData[0].value){
        return expenseSum+expense.amount
      } 
        return expenseSum
    }, 0)
    return expensesAmount;
  }

  const getIncomesAmount = (incomes: ExpenseType[]):number=>{
    const incomesAmount = incomes.reduce((incomesSum, incomes)=>{
      if(incomes.type===expenseTypeData[1].value){
        return incomesSum+incomes.amount
      } 
        return incomesSum
    }, 0)
    return incomesAmount;
  }

  const getTotalAmount = (expenses: number, incomes: number) => {
    const totalAmount = incomes-expenses;
    const symbol = incomes>expenses ? expenseType.INCOME : expenseType.EXPENSE
    setPositiveSymbol(symbol === expenseType.EXPENSE);
    return convertAmountToCurrency(totalAmount,symbol)
  }

  return (
  <>
    <StdCard className="ExpenseCountWidget ExpenseCountWidget--primary">
      <div className="ExpenseCountWidget__caption">Expenses: <span>- {getExpensesAmount(filteredExpenses)} €</span></div>
    </StdCard>
    <StdCard className="ExpenseCountWidget  ExpenseCountWidget--alt">
      <div className="ExpenseCountWidget__caption">Incomes: <span>+ {getIncomesAmount(filteredExpenses)} €</span></div>
    </StdCard>
    <StdCard className="ExpenseCountWidget">
      <div className={`ExpenseCountWidget__caption ${positiveSymbol ? 'ExpenseCountWidget__caption--positive' : 'ExpenseCountWidget__caption--negative' }`}>Total: <span>{getTotalAmount(getExpensesAmount(filteredExpenses), getIncomesAmount(filteredExpenses))}</span></div>
    </StdCard>
  </>
  );
};

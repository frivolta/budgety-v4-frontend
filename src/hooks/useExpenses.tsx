import { useState } from 'react';
import { ExpenseType } from '../types';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<ExpenseType[] | undefined>(undefined);
  return { expenses, setExpenses };
};

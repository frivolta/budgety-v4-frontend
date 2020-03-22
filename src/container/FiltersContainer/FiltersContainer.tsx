import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { expenseTypeData, categoryData } from "../../data/expensesData";

import { Label } from "../../components/Label/Label";
import { Select } from "../../components/Select/Select";

import { ExpenseTypeType, CategoryType } from "../../types";
import {
  startAddExpenseTypeFilter,
  startClearExpenseTypeFilter,
  startAddCategoryTypeFilter,
  startClearCategoryTypeFilter
} from "../../redux/actions/staticFiltersActions";
import { DateFilter } from "../../components/Filters/DateFilter";

const defaultExpenseType: ExpenseTypeType = {
  id: 0,
  value: "default",
  caption: "No filter"
};

const defaultCategoryType: CategoryType = {
  id: 0,
  type: defaultExpenseType,
  value: "default",
  caption: "No filter",
  color: "color"
};

const extendedExpenseTypeData: ExpenseTypeType[] = expenseTypeData.concat(defaultExpenseType);
const extendedCategoryTypeData: CategoryType[] = categoryData.concat(defaultCategoryType);

export const FiltersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [expenseTypeFilter, setExpenseTypeFilter] = useState<ExpenseTypeType>(defaultExpenseType);
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<CategoryType>(defaultCategoryType);

  // Set the right expense type, filtering value to the state
  const setExpenseTypeByValue = (value: string) => {
    const expenseType = extendedExpenseTypeData.filter(expense => expense.value === value);
    const [expenseTypeToSetAsState] = expenseType;
    setExpenseTypeFilter(expenseTypeToSetAsState);
  };

  const setCategoryTypeByValue = (value: string) => {
    const categoryType = extendedCategoryTypeData.filter(category => category.value === value);
    const [categoryTypeToSetAsState] = categoryType;
    setCategoryTypeFilter(categoryTypeToSetAsState);
  };

  // Expense type dispatcher when expenseType changes
  const dispatchExpenseTypeFilter = React.useCallback(
    (expenseType: ExpenseTypeType) => {
      if (expenseType.value !== "default") {
        dispatch(startAddExpenseTypeFilter(expenseType.value));
      } else {
        dispatch(startClearExpenseTypeFilter());
      }
    },
    [dispatch]
  );

  // Category type dispatcher when expenseType changes
  const dispatchCategoryTypeFilter = React.useCallback(
    (categoryType: CategoryType) => {
      if (categoryType.value !== "default") {
        dispatch(startAddCategoryTypeFilter(categoryType.value));
      } else {
        dispatch(startClearCategoryTypeFilter());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatchExpenseTypeFilter(expenseTypeFilter);
    dispatchCategoryTypeFilter(categoryTypeFilter);
  }, [expenseTypeFilter, categoryTypeFilter, dispatchCategoryTypeFilter, dispatchExpenseTypeFilter]);

  return (
    <div className="FiltersContainer">
      <div className="FiltersContainer__group">
        <Label classNames="FiltersContainer__group__label">Select month:</Label>
        <DateFilter />
      </div>
      <div className="FiltersContainer__group">
        <Label classNames="FiltersContainer__group__label">Expense type:</Label>
        <Select
          placeholder="Filter by expense type..."
          name="expense-type-filter"
          options={extendedExpenseTypeData}
          value={expenseTypeFilter.value}
          handleChange={event => setExpenseTypeByValue(event.target.value)}
        />
      </div>
      <div className="FiltersContainer__group">
        <Label classNames="FiltersContainer__group__label">Category:</Label>
        <Select
          placeholder="Filter by category..."
          name="category-type-filter"
          options={extendedCategoryTypeData}
          value={categoryTypeFilter.value}
          handleChange={event => setCategoryTypeByValue(event.target.value)}
        />
      </div>
    </div>
  );
};

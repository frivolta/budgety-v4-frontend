import React from "react";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import {
  clearDateTypeFilter,
  clearCategoryTypeFilter,
  clearExpenseTypeFilter
} from "../../redux/actions/staticFiltersActions";

import { StdCard } from "../Card/StdCard";

import { AppState } from "../../redux/configureStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const FiltersManagementBar: React.FC = () => {
  const filters = useSelector((state: AppState) => state.filters);
  const dispatch = useDispatch();

  const _dateFilterRender = () =>
    filters.expenseDateFilter.isActive ? (
      <div className="FiltersManagementBar__item">
        <p>
          {moment(filters.expenseDateFilter.filterValue[0]).format("MMMM YYYY")}
        </p>
        <span
          className="FiltersManagementBar__item__remove"
          onClick={() => dispatch(clearDateTypeFilter())}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    ) : (
      <div className="FiltersManagementBar__item">
        <p>All dates</p>
      </div>
    );

  const _categoryFilterRender = () =>
    filters.expenseCategoryFilter.isActive ? (
      <div className="FiltersManagementBar__item">
        <p>
          {filters.expenseCategoryFilter.filterValue.map(
            filterValue => filterValue
          )}
        </p>
        <span
          className="FiltersManagementBar__item__remove"
          onClick={() => dispatch(clearCategoryTypeFilter())}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    ) : (
      <div className="FiltersManagementBar__item">
        <p>All categories</p>
      </div>
    );

  const _typeFilterRender = () =>
    filters.expenseTypeFilter.isActive ? (
      <div className="FiltersManagementBar__item">
        <p>
          {filters.expenseTypeFilter.filterValue.map(
            filterValue => filterValue
          )}
        </p>
        <span
          className="FiltersManagementBar__item__remove"
          onClick={() => dispatch(clearExpenseTypeFilter())}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    ) : (
      <div className="FiltersManagementBar__item">
        <p>All categories</p>
      </div>
    );

  return (
    <StdCard>
      <div className="FiltersManagementBar">
        {_dateFilterRender()} {_categoryFilterRender()}
        {_typeFilterRender()}
      </div>
    </StdCard>
  );
};

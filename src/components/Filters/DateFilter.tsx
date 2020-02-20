import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addDateTypeFilter } from "../../redux/actions/staticFiltersActions";
import moment from "moment";

export const DateFilter: React.FC = () => {
  const [month, setMonth] = useState<moment.Moment>(moment());
  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  const _filterByMonth = useCallback(() => {
    /* const minDate = month
      .clone()
      .startOf("month")
      .format("MMM YYYY");
    const maxDate = month
      .clone()
      .endOf("month")
      .format("MMM YYYY"); */

    filterIsActive && dispatch(addDateTypeFilter(month.toString()));
  }, [month]);

  useEffect(() => {
    _filterByMonth();
  }, [month, _filterByMonth, filterIsActive]);

  // those should be async
  const _decreaseMonth = (): void => {
    !filterIsActive && setFilterIsActive(true);
    setMonth(month.clone().subtract(1, "month"));
  };
  const _increaseMonth = (): void => {
    !filterIsActive && setFilterIsActive(true);
    setMonth(month.clone().add(1, "month"));
  };

  return (
    <h2>
      <span onClick={_decreaseMonth}>{"< "}</span>
      <span>{month.format("MMM YYYY")}</span>
      <span onClick={_increaseMonth}>
        {month.clone().add(1, "hour") > moment() ? "" : " >"}
      </span>
    </h2>
  );
};

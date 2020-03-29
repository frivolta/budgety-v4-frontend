import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addDateTypeFilter } from "../../redux/actions/staticFiltersActions";
import moment from "moment";

export const DateFilter: React.FC = () => {
  const [month, setMonth] = useState<moment.Moment>(moment());
  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  const _filterByMonth = useCallback(() => {
    filterIsActive && dispatch(addDateTypeFilter(month.toString()));
  }, [month, dispatch, filterIsActive]);

  useEffect(() => {
    _filterByMonth();
  }, [month, _filterByMonth, filterIsActive]);

  const _decreaseMonth = (): void => {
    !filterIsActive && setFilterIsActive(true);
    setMonth(month.clone().subtract(1, "month"));
  };
  const _increaseMonth = (): void => {
    !filterIsActive && setFilterIsActive(true);
    setMonth(month.clone().add(1, "month"));
  };

  return (
    <div className="DateFilter" data-testid="DateFilter">
      <span onClick={_decreaseMonth} className="DateFilter__button">
        {"< "}
      </span>
      <span className="DateFilter__value">{month.format("MMM YYYY")}</span>
      <span onClick={_increaseMonth} className="DateFilter__button">
        {month.clone().add(1, "hour") > moment() ? "" : " >"}
      </span>
    </div>
  );
};

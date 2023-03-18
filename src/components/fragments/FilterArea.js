import React, { useState, useEffect } from "react";
import moment from "moment";

import DraggableArea from "./DraggableArea";

import "./FilterArea.scss";

const FilterArea = (props) => {
  const [startDate, setStartDate] = useState(moment().startOf("year"));
  const [endDate, setEndDate] = useState(moment());
  const [paymentTypes, setPaymentTypes] = useState([0, 1, 2, 3]);
  const DISPLAY_FORMAT = "MMM D YYYY";

  const {
    setStartDate: setStartDateProp,
    setEndDate: setEndDateProp,
    setPaymentTypes: setPaymentTypesProp,
  } = props;
  useEffect(() => {
    setStartDateProp(startDate);
    setEndDateProp(endDate);
    setPaymentTypesProp(paymentTypes);
  }, [
    setStartDateProp,
    setEndDateProp,
    setPaymentTypesProp,
    startDate,
    endDate,
    paymentTypes,
  ]);

  const setDateRange = (presetName) => {
    setStartDate(dateRangePresets[presetName].startDate);
    setEndDate(dateRangePresets[presetName].endDate);
  };

  const updatePaymentTypeArray = (typeIndex) => {
    if (paymentTypes.includes(typeIndex)) {
      setPaymentTypes((prevState) => {
        const newState = [...prevState];
        newState.splice(prevState.indexOf(typeIndex), 1);
        return newState;
      });
    } else {
      setPaymentTypes((prevState) => {
        const newState = [...prevState];
        newState.push(typeIndex);
        return newState;
      });
    }
  };

  return (
    <DraggableArea
      head={
        <div className="date-range">
          <div>{startDate.format(DISPLAY_FORMAT)}</div>
          <img src="assets/images/next.svg" alt="to" className="to" />
          <div>{endDate.format(DISPLAY_FORMAT)}</div>
        </div>
      }
      body={
        <>
          <div className="filter-section">
            <div className="filter-label">Select a date range:</div>
            <div className="quick-options">
              {Object.keys(dateRangePresets).map((key) => {
                const isActive =
                  dateRangePresets[key].startDate.format(DISPLAY_FORMAT) ===
                    startDate.format(DISPLAY_FORMAT) &&
                  dateRangePresets[key].endDate.format(DISPLAY_FORMAT) ===
                    endDate.format(DISPLAY_FORMAT);
                return (
                  <button
                    key={key}
                    className={`quick-option ${isActive && "active"}`}
                    onClick={() => setDateRange(key)}
                  >
                    {dateRangePresets[key].label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-label">Filter payment types:</div>
            <div className="quick-options">
              {Object.keys(paymentTypesPresets).map((typeKey, index) => {
                const isActive = paymentTypes.includes(index);
                return (
                  <button
                    key={typeKey}
                    onClick={() => updatePaymentTypeArray(index)}
                    className={`${typeKey} ${isActive && "active"}`}
                  >
                    {paymentTypesPresets[typeKey].label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      }
    />
  );
};

const dateRangePresets = {
  pastWeek: {
    label: "Past Week",
    startDate: moment().subtract(7, "days"),
    endDate: moment(),
  },
  weekToDate: {
    label: "Week-to-date",
    startDate: moment().startOf("week").add(2, "days"),
    endDate: moment(),
  },
  pastMonth: {
    label: "Past Month",
    startDate: moment().subtract(30, "days"),
    endDate: moment(),
  },
  monthToDate: {
    label: "Month-to-date",
    startDate: moment().startOf("month"),
    endDate: moment(),
  },
  pastYear: {
    label: "Past Year",
    startDate: moment().subtract(365, "days"),
    endDate: moment(),
  },
  yearToDate: {
    label: "Year-to-date",
    startDate: moment().startOf("year"),
    endDate: moment(),
  },
};

const paymentTypesPresets = {
  cash: {
    label: "Cash",
  },
  credit: {
    label: "Credit",
  },
  venmo: {
    label: "Venmo",
  },
  apple: {
    label: "Apple Pay",
  },
};

export default FilterArea;

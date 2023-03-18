import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import EntryList from "../components/fragments/EntryList";
import FilterArea from "../components/fragments/FilterArea";

import "./ViewAllEntries.scss";

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

// const LoadingIcon = (props) => {
//   if (props.show) {
//     return(
//       <div className='loading-area'>
//         <span className='loading-icon'>
//           Loading...
//         </span>
//       </div>
//     );
//   }
//   return null;
// }

const ViewAllEntries = () => {
  const [state, setState] = useState({
    cardData: [],
    totalAmount: 0,
    isLoading: true,
  });
  const [filterParams, setFilterParams] = useState({
    startDate: moment().startOf("year"),
    endDate: moment(),
    paymentTypes: [],
  });

  const getData = () => {
    const { startDate, endDate, paymentTypes } = filterParams;

    let url = `${process.env.REACT_APP_SERVICE_URL}/entries`;
    url += `?f=${new Date(startDate.format()).getTime()}&t=${new Date(
      endDate.format()
    ).getTime()}`;
    url += paymentTypes.length > 0 && `&pm=${paymentTypes.join(",")}`;

    setState((prevState) => ({ ...prevState, isLoading: true }));

    axios
      .get(url, {
        headers: { Authorization: "bearer " + localStorage.jwt },
      })
      .then((result) => {
        setState((prevState) => ({
          ...prevState,
          cardData: result.data.body.entries,
          totalAmount: result.data.body.totalAmount,
          isLoading: false,
        }));
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    getData();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [filterParams]);

  const mainContent = (isLoading) => {
    const { cardData, totalAmount } = state;
    return (
      <>
        <FilterArea
          setStartDate={(startDate) =>
            setFilterParams((prevState) => ({
              ...prevState,
              startDate,
            }))
          }
          setEndDate={(endDate) =>
            setFilterParams((prevState) => ({
              ...prevState,
              endDate,
            }))
          }
          setPaymentTypes={(paymentTypes) =>
            setFilterParams((prevState) => ({
              ...prevState,
              paymentTypes,
            }))
          }
        />
        <div className="main-content">
          {isLoading && (
            <div className="loading-overlay">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" />
              </svg>
            </div>
          )}
          <div className="view-header">
            <div className="view-total">
              <div className="amount">
                {amountFormatter.format(totalAmount || 0)}
              </div>
              <div className="label">Gross Income</div>
            </div>
            <Link to="/add">
              <button className="add">
                <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Add Entry
              </button>
            </Link>
          </div>
          <div className="entries-container">
            <EntryList cardData={cardData} refreshData={() => getData()} />
          </div>
        </div>
      </>
    );
  };

  return <>{mainContent(state.isLoading)}</>;
};

export default ViewAllEntries;

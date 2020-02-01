import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import EntryList from '../components/fragments/EntryList';
import FilterArea from '../components/fragments/FilterArea';

import './ViewAllEntries.scss';

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const LoadingIcon = (props) => {
  if (props.show) {
    return(
      <div className='loading-area'>
        <span className='loading-icon'>
          Loading...
        </span>
      </div>
    );
  }
  return null;
}

const ViewAllEntries = () => {
  const [state, setState] = useState({
    cardData: [],
    totalAmount: 0,
    isLoading: true
  });
  const [filterParams, setFilterParams] = useState({
    startDate: moment().subtract(30, 'days'),
    endDate: moment(),
    paymentTypes: []
  })

  useEffect(() => {
    getData();
  }, [filterParams]);

  const getData = () => {
    const {startDate, endDate, paymentTypes} = filterParams;

    let url = `${process.env.REACT_APP_SERVICE_URL}/entries`;
    url += `?f=${new Date(startDate.format()).getTime()}&t=${new Date(endDate.format()).getTime()}`;
    url += paymentTypes.length > 0 && `&pm=${paymentTypes.join(',')}`;

    axios.get(url, {
      headers: { 'Authorization': 'bearer ' + localStorage.jwt }
    }).then((result) => {
      setState((prevState) => ({
        ...prevState,
        cardData: result.data.body.entries,
        totalAmount: result.data.body.totalAmount,
        isLoading: false
      }));
    }).catch((err) => {
      console.log('Error:', err);
    });
  }

  const mainContent = (isLoading) => {
    const { cardData, totalAmount } = state;
    if (isLoading) {
      return null;
    }
    return (
      <>
        <FilterArea
          setStartDate={(startDate) => setFilterParams((prevState) => ({ ...prevState, startDate }))}
          setEndDate={(endDate) => setFilterParams((prevState) => ({ ...prevState, endDate }))}
          setPaymentTypes={(paymentTypes) => setFilterParams((prevState) => ({ ...prevState, paymentTypes }))}
        />
        <div className='view-header'>
          <div className='view-total'>
            <div className='amount'>
              {amountFormatter.format(totalAmount || 0)}
            </div>
            <div className='label'>
              Gross Income
            </div>
          </div>
          <Link to='/add'>
            <button className='add'><i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Add Entry</button>
          </Link>
        </div>
        <div className='entries-container'>
          <EntryList cardData={cardData} refreshData={() => getData()} />
        </div>
      </>
    )
  }

  return (
    <>
      <LoadingIcon show={state.isLoading} />
      {mainContent(state.isLoading)}
    </>
  );
}

export default ViewAllEntries;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './ViewAllEntries.scss';

import EntryList from '../components/fragments/EntryList';

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
  const dateArea = useRef();
  const [slideHeight, setSlideHeight] = useState(42);
  const [slideDirection, setSlideDirection] = useState(null);
  const [state, setState] = useState({
    cardData: [],
    totalAmount: 0,
    isLoading: true,
    from: moment().subtract(30, 'days'),
    to: moment(),
    paymentMethods: []
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const {from, to, paymentMethods} = state;

    let url = `${process.env.REACT_APP_SERVICE_URL}/entries`;
    url += `?f=${new Date(from.format()).getTime()}&t=${new Date(to.format()).getTime()}`;
    url += paymentMethods.length > 0 && `&pm=${paymentMethods.join(',')}`;

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

  const handleTouchStart = (e) => {
    e.persist();
    const body = e.nativeEvent.path[4];
    console.log(body);
    const el = e.nativeEvent.path[0];
    if (el.style) {
      el.style.transition = "none";
    }
    if (body.style && body.style.overflowY !== 'hidden') {
      body.style.overflowY = 'hidden';
    }
  }

  const handleTouchMove = (e) => {
    e.persist();
    // console.log('Page Y:', e.nativeEvent && e.nativeEvent.touches[0].pageY);
    if (e.nativeEvent && e.nativeEvent.touches[0].pageY > 42 && e.nativeEvent.touches[0].pageY < 300) {
      setSlideHeight(() => e.nativeEvent.touches[0].pageY);
    }
  }

  const handleTouchEnd = (e) => {
    e.persist();
    const body = e.nativeEvent.path[4];
    const el = e.nativeEvent.path[0];
    if (el.style) {
      el.style.transition = "all 0.2s ease";
    }
    if (body.style && body.style.overflowY === 'hidden') {
      body.style.overflowY = 'scroll';
    }
    if (slideHeight >= 150) {
      setSlideHeight(() => 300);
    } else if (slideHeight < 150) {
      setSlideHeight(() => 42);
    }
  }

  const mainContent = (isLoading) => {
    const { cardData, totalAmount } = state;
    if (isLoading) {
      return null;
    }
    return (
      <>
        <div
          className='date-area'
          ref={dateArea}
          style={{ height: slideHeight+'px' }}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <div className='date-range'>
            <div>{state.from.format('MMM D YYYY')}</div>
            <img src="/assets/images/next.svg" alt="to" className='to' />
            <div>{state.to.format('MMM D YYYY')}</div>
          </div>
          <div className="down" />
        </div>
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
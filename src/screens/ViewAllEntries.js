import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './ViewAllEntries.scss';

import EntryList from '../components/EntryList';

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

class LoadingIcon extends Component {
  render() {
    if (this.props.show) {
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
}

class ViewAllEntries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardData: [],
      totalAmount: 0,
      isLoading: true
    }
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_SERVICE_URL + '/entries/', {
      headers: { 'Authorization': 'bearer ' + localStorage.jwt }
    }).then((result) => {
      this.setState({
        cardData: result.data.body.entries,
        totalAmount: result.data.body.totalAmount,
        isLoading: false
      });
    }).catch((err) => {
      console.log('Error:', err);
    });
  }

  mainContent = (isLoading) => {
    const { cardData, totalAmount } = this.state;
    if (isLoading) {
      return null;
    }
    return (
      <div className='view-container'>
        <div className='view-header'>
          <div className='view-total'>
            <div className='amount'>
              {amountFormatter.format(totalAmount || 0)}
            </div>
            <div className='label'>
              Year-to-date
            </div>
          </div>
          <Link to='/add'>
            <button><i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Add Entry</button>
          </Link>
        </div>
        <div className='entries-container'>
          <EntryList cardData={cardData} refreshData={this.getData} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div
        style={{
          fill: true
        }}>
        <LoadingIcon show={this.state.isLoading} />
        {this.mainContent(this.state.isLoading)}
      </div>
    );
  }
}

export default ViewAllEntries;
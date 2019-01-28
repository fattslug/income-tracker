import React, { Component } from 'react';
import { Box, Button, Text } from 'grommet';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../components/css/EntryCards.scss';

import EntryCards from '../components/EntryCards';

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

class LoadingIcon extends Component {
  render() {
    console.log(this.props);
    if (this.props.show) {
      return(
        <Box
          height='medium'
          align='center'
          alignContent='center'
          justify='center'
        >
          <Text size='large'>Loading...</Text>
        </Box>
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
      console.log('Setting state...');
      console.log(result.data.body.entries);
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
      <Box
        style={{ animationName: 'fadeIn', animationDuration: '2s', animationFillMode: 'forwards' }}
      >
        <Box align="center" pad="large">
          <Box pad='medium'>
            <Text size='xlarge' weight='bold'>
              {amountFormatter.format(totalAmount || 0)}
            </Text>
            <Text size='medium' textAlign='center'>
              Year-to-date
            </Text>
          </Box>
          <Link to='/add'>
            <Button label="Add Entry" onClick={() => {}} />
          </Link>
        </Box>
        <Box align="center" fill={true} width='xlarge' className='entryList-container'>
          <EntryCards cardData={cardData} />
        </Box>
      </Box>
    )
  }

  render() {
    return (
      <Box fill={true}>
        <LoadingIcon show={this.state.isLoading} />
        {this.mainContent(this.state.isLoading)}
      </Box>
    );
  }
}

export default ViewAllEntries;
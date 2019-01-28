import React, { Component } from 'react'
import { Box, Text } from 'grommet'

import './css/EntryCards.scss';

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const paymentColors = {
  'Credit Card': {
    bgColor: '#CE482B',
    text: '#FFFFFF'
  },
  'Cash': {
    bgColor: '#51B84A',
    text: '#FFFFFF'
  },
  'Venmo': {
    bgColor: '#2C94CF',
    text: '#FFFFFF'
  },
  'Apple Pay': {
    bgColor: '#e0e0e0',
    text: '#000000'
  },
  'Google Pay': {
    bgColor: '#b54d9d',
    text: '#FFFFFF'
  }
}

class EntryCards extends Component {
  render() {
    return (
      <Box className='entryCards' width='medium'>
        {this.props.cardData.map((data, index) => {
          return (<EntryCard key={index} index={index} cardData={data} />);
        })}
      </Box>
    )
  }
}

class EntryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  getPaymentColor = (paymentType) => {
    return paymentColors[paymentType];
  }

  toggleCardState = () => {
    this.setState({
      open: !this.state.open 
    });
  }

  showServices = (cardData) => {
    if (this.state.open) {
      return (
        <Box
          direction='row'
          wrap={true}
        >
          {cardData.ServicesRendered.map((service) => {
            return(
              <Box
                pad='medium'
                round='medium'
                margin='small'
                border={{ side: 'all', color: '#444444', size: 'small' }}
                style={{ opacity: 0, animationName: 'swipeIn', animationDuration: '0.5s', animationFillMode: 'forwards' }}
              >
                <Text size='small' color='#444444'>{service.name}</Text>
              </Box>
            )
          })}
        </Box>
      )
    }
    return null;
  }

  render() {
    const cardData = this.props.cardData;
    const colors = this.getPaymentColor(cardData.PaymentType);
    const contentClasses = `content-box-title`;
    // const contentClasses = `content-box-title ${this.state.open ? 'content-box__up' : 'content-box__down'}`;
    const getAnimationDelay = () => {
      return `${this.props.index * 0.1}s`
    }

    return (
      // Card Container
      <Box
        direction='row'
        margin={{ vertical: 'small', horizontal: 'medium' }}
        alignContent='stretch'
        style={{ animationName: 'swipeIn', animationDuration: '0.5s', animationDelay: getAnimationDelay(), animationFillMode: 'forwards' }}
        className='card-container'
        height={this.state.open ? 'small' : 'xsmall'}
        onClick={() => this.toggleCardState()}
      >
        {/* Date Area */}
        <Box
          background='#333333'
          pad={{ horizontal: 'medium' }}
          justify='center'
          elevation='small'
          className='date-box'
        >
          <Text size='small' weight='bold' className='date-box__month'>
            {Intl.DateTimeFormat('en-GB', {
              month: 'short'
            }).format(new Date(cardData.DateAdded))}
          </Text>
          <Text size='xlarge' weight='bold' className='date-box__date'>
            {Intl.DateTimeFormat('en-GB', {
              day: '2-digit'
            }).format(new Date(cardData.DateAdded))}
          </Text>
        </Box>
        {/* END Date Area */}

        {/* Card Content Area */}
        <Box
          background='#FFFFFF'
          pad='medium'
          elevation='small'
          alignContent='stretch'
          className='content-box'
          justify='center'
          fill
        >
          {/* Moving Content */}
          <Box className={contentClasses}>
            {/* Title Area */}
            <Box
              direction='row'
              justify='between'
              alignContent='start'
              align='start'
            >
              {/* Amount Paid */}
              <Text
                size='large'
                weight='bold'
                className='content-box__amount'
              >
                {amountFormatter.format(cardData.AmountPaid || 0)}
              </Text>
              {/* END Amount Paid */}
              
              {/* Payment Type */}
              <Box
                pad={{ horizontal: 'medium', vertical: 'xsmall' }}
                round='medium'
                margin={{ left: 'small' }}
                background={colors.bgColor}
                align='center'
                justify='center'
              >
                <Text
                  size='xsmall'
                  color={colors.text}
                >
                  {cardData.PaymentType}
                </Text>
              </Box>
              {/* END Payment Type */}

            </Box>
            {/* END Title Area */}

            {/* Client Name */}
            <Text size='small'>
              {cardData.ClientName}
            </Text>
            {/* END Client Name */}

          </Box>
          {/* END Moving Content */}

          {/* Services Area */}
          <Box>
            {this.showServices(cardData)}
          </Box>
          {/* END Services Area */}
          
        </Box>
        {/* END Card Content Area */}

      </Box>
    )
  }
}

export default EntryCards;
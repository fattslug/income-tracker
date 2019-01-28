import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
          margin={{ top: 'medium' }}
        >
          {cardData.ServicesRendered.map((service, index) => {
            return(
              <Box
                key={index}
                pad='small'
                round='medium'
                margin='xsmall'
                border={{ side: 'all', color: '#444444', size: 'small' }}
                style={{ opacity: 0, animationName: 'swipeIn', animationDuration: '0.3s', animationFillMode: 'forwards' }}
              >
                <Text size='xsmall' color='#444444'>{service.name}</Text>
              </Box>
            )
          })}
        </Box>
      )
    }
    return null;
  }

  showControls = () => {
      return(
        <Box
          height='100%'
          className={this.state.open ? 'controls in rounded' : 'controls out' }
        >
          <Box
            height='50%'
            background='#ce482b'
            style={{ borderTopRightRadius: '20px' }}
            className='control-button'
            align='center'
            justify='center'
          >
            <Text
              className={this.state.open ? 'control in' : 'control out' }
            >
              <Link to='/' style={{ color: '#FFFFFF' }}>
                <i className="fas fa-trash"></i>
              </Link>
            </Text>
          </Box>
          <Box
            height='50%'
            background='#3c6db5'
            style={{ borderBottomRightRadius: '20px' }}
            className='control-button'
            align='center'
            justify='center'
          >
            <Text
              className={this.state.open ? 'control in' : 'control out' }
            >
              <Link to='/' style={{ color: '#FFFFFF' }}>
                <i className="fas fa-pencil-alt"></i>
              </Link>
            </Text>
          </Box>
        </Box>
      )
  }

  render() {
    const cardData = this.props.cardData;
    const colors = this.getPaymentColor(cardData.PaymentType);
    const getAnimationDelay = () => {
      return `${this.props.index * 0.1}s`
    }

    return (
      // Card Container
      <Box
        direction='row'
        margin={{ vertical: 'small', horizontal: 'medium' }}
        alignContent='stretch'
        style={{
          animationName: 'swipeIn',
          animationDuration: '0.5s',
          animationDelay: getAnimationDelay(),
          animationFillMode: 'forwards',
          borderRadius: '20px'
        }}
        elevation='small'
        className='card-container'
        height={this.state.open ? 'small' : 'xsmall'}
        onClick={() => this.toggleCardState()}
      >
        {/* Date Area */}
        <Box
          background='#333333'
          pad={{ horizontal: 'medium' }}
          justify='center'
          className='date-box'
          width='50px'
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
          alignContent='stretch'
          justify='between'
          className={this.state.open ? 'content-box unrounded' : 'content-box rounded' }
          fill
        >
          {/* Moving Content */}
          <Box className='content-box-title'>
            {/* Title Area */}
            <Box
              direction='row'
              justify='between'
              alignContent='start'
              align='start'
            >
              <Box>
                {/* Amount Paid */}
                <Text
                  size='large'
                  weight='bold'
                  className='content-box__amount'
                >
                  {amountFormatter.format(cardData.AmountPaid || 0)}
                </Text>
                {/* END Amount Paid */}
                {/* Client Name */}
                <Text size='small'>
                  {cardData.ClientName}
                </Text>
                {/* END Client Name */}
              </Box>
              
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

          </Box>
          {/* END Moving Content */}

          {/* Services Area */}
          <Box>
            {this.showServices(cardData)}
          </Box>
          {/* END Services Area */}
          
        </Box>
        {/* END Card Content Area */}

        {this.showControls()}
      </Box>
    )
  }
}

export default EntryCards;
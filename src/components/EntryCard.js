import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './EntryCard.scss'

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const paymentColors = {
  'Credit': {
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

  selectCard = () => {
    this.setState({
      open: !this.state.open 
    });
    this.props.selected(this.props.cardData);
  }

  showServices = (cardData) => {
    if (this.state.open) {
      return (
        <div className='services'>
          {cardData.ServicesRendered.map((service, index) => {
            return(
              <div
                key={index}
                className='services-chip'
              >
                <div className='services-chip__label'>{service.name}</div>
              </div>
            )
          })}
        </div>
      )
    }
    return null;
  }

  showControls = () => {
      return(
        <div className={this.state.open ? 'controls in' : 'controls out' }>
          <div
            style={{
              width: '50%',
              backgroundColor: '#3c6db5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className='control-button'
            onClick={() => this.props.history.push('/edit/'+this.props.cardData._id)}
          >
            <div
              className={this.state.open ? 'control in' : 'control out' }
            >
              <div style={{ color: '#FFFFFF' }}>
                <i className="fas fa-pencil-alt"></i>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '50%',
              backgroundColor: '#ce482b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className='control-button'
            onClick={() => this.props.showDeleteModal(true)}
          >
            <div
              className={this.state.open ? 'control in' : 'control out' }
            >
              <div style={{ color: '#FFFFFF' }}>
                <i className="fas fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
      )
  }

  render() {
    const colors = this.getPaymentColor(this.props.cardData.PaymentType);
    const getAnimationDelay = () => {
      return `${this.props.index * 0.1}s`
    }

    return (
      // Card Container
      <div
        style={{
          animationDelay: getAnimationDelay(),
        }}
        className='card-container'
        onClick={() => this.selectCard()}
      >
        {/* Date Area */}
        <div className='card-date'>
          <div className='month'>
            {Intl.DateTimeFormat('en-US', {
              month: 'short'
            }).format(new Date(this.props.cardData.DateAdded))}
          </div>
          <div className='date'>
            {Intl.DateTimeFormat('en-US', {
              day: '2-digit'
            }).format(new Date(this.props.cardData.DateAdded))}
          </div>
        </div>
        {/* END Date Area */}

        {/* Card Right-Side */}
        <div className='card-right'>

          {/* Card Content Area */}
          <div className='card-content'>
            {/* Title Area */}
            <div className='card-content-area'>
              <div>
                {/* Amount Paid */}
                <div className='card-content__amount'>
                  {amountFormatter.format(this.props.cardData.AmountPaid || 0)}
                </div>
                {/* END Amount Paid */}
                {/* Client Name */}
                <div className='card-content__client'>
                  {this.props.cardData.ClientName}
                </div>
                {/* END Client Name */}
              </div>
              
              {/* Payment Type */}
              <div className='card-content__payment'
                style={{
                  backgroundColor: colors.bgColor,
                }}
              >
                <span
                  className='card-content__payment__text'
                  style={{
                    color: colors.text
                  }}
                >
                  {this.props.cardData.PaymentType}
                </span>
              </div>
              {/* END Payment Type */}

            </div>
            {/* END Title Area */}

            {/* Services Area */}
            <div>
              {this.showServices(this.props.cardData)}
            </div>
            {/* END Services Area */}

          </div>
          {/* END Card Content Area */}

          {/* Card Controls */}
          <div className='card-controls'>
            {this.showControls()}
          </div>
          {/* END Card Controls */}

        </div>
        {/* END Card Right-Side */}

      </div>
    )
  }
}

export default withRouter(EntryCard);
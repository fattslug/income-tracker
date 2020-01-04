import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';

import './EntryForm.scss';

import MultiSelect from '../inputs/MultiSelect/MultiSelect';
import Calendar from '../inputs/Calendar/Calendar';

function Error(props) {
  if (props.show) {
    return (
      <div className='error-message'>
        {props.children}
      </div>
    );
  } else {
    return null;
  }
}

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        DateAdded: new Date(),
        ClientName: '',
        PaymentType: 'Cash',
        ServicesRendered: [],
        AmountPaid: null,
        Tip: null
      },
      options: {
        serviceOptions: [{
          name: 'Women\'s Cut'
        }, {
          name: 'Men\'s Cut'
        }, {
          name: 'Root Color'
        }, {
          name: 'End Color'
        }, {
          name: 'Partial Highlight'
        }, {
          name: 'Full Highlight'
        }, {
          name: 'Balayage'
        }, {
          name: 'Special FX Color'
        }, {
          name: 'Bang Trim'
        }, {
          name: 'Blowout'
        }, {
          name: 'Olaplex'
        }, {
          name: 'Treatment'
        }, {
          name: 'Gloss/Toner'
        }],
        paymentOptions: ['Cash', 'Credit', 'Venmo', 'Apple Pay']
      },
      errors: {}
    }
  }

  componentDidUpdate() {
    if (this.props.mode === 'edit') {
      this.assignFormValues();
    }
  }

  handleChange = (fieldName, newValue) => {
    let currentValues = this.state.values;
    let currentErrors = this.state.errors;

    currentValues[fieldName] = newValue;
    currentErrors[fieldName] = this.validateField(fieldName);

    this.setState({
      values: currentValues,
      errors: currentErrors
    });
  }

  validateField = (fieldName) => {
    if (fieldName === 'AmountPaidString') {
      return (this.state.values[fieldName] <= 0);
    } else if (fieldName === 'ClientName') {
      return (this.state.values[fieldName] === '');
    } else if (fieldName === 'ServicesRendered') {
      return (this.state.values[fieldName] <= 0);
    } else if (fieldName === 'PaymentType') {
      return (this.state.values[fieldName] === '');
    }
  }

  validateForm = () => {
    return new Promise((resolve) => {
      const errors = {
        AmountPaidString: this.validateField('AmountPaidString'),
        ClientName: this.validateField('ClientName'),
        ServicesRendered: this.validateField('ServicesRendered'),
        PaymentType: this.validateField('PaymentType')
      };
      this.setState({ errors: errors });
      resolve(Object.values(errors).find(err => err === true) || false);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    // let currentState = this.state.values;
    // this.setState(currentState);

    this.validateForm().then((hasErrors) => {
      if (!hasErrors) {
        if (this.props.mode === 'edit') {
          // Update data
          axios.put(`${process.env.REACT_APP_SERVICE_URL}/entries/${this.props.entryData._id}`, {
            entry: this.state.values
          }, {
            headers: { 'Authorization': 'bearer ' + localStorage.jwt }
          }).then((result) => {
            this.setState({ errors: { Server: false } });
            this.props.history.push('/');
          }).catch((err) => {
            this.setState({ errors: { Server: true } });
          });
        } else if (this.props.mode === 'new') {
          // Submit data
          axios.post(process.env.REACT_APP_SERVICE_URL + '/entries/', {
            entry: this.state.values
          }, {
            headers: { 'Authorization': 'bearer ' + localStorage.jwt }
          }).then((result) => {
            this.setState({ errors: { Server: false } });
            this.props.history.push('/');
          }).catch((err) => {
            this.setState({ errors: { Server: true } });
          });

        }
      }
    });
  }

  assignFormValues = () => {
    if (!this.state.values.ClientName && this.props.entryData.ClientName) {
      const { DateAdded, ClientName, PaymentType, ServicesRendered, AmountPaid, Tip } = this.props.entryData;
      this.setState({
        values: {
          DateAdded: DateAdded,
          ClientName: ClientName,
          PaymentType: PaymentType,
          ServicesRendered: ServicesRendered,
          AmountPaid: AmountPaid,
          Tip: Tip
        }
      });
    }
  }

  render() {
    const { DateAdded, ClientName, PaymentType, ServicesRendered, AmountPaid, Tip } = this.state.values;
    const { serviceOptions, paymentOptions } = this.state.options;
    const selectedDate = new Date(DateAdded);
    const errors = this.state.errors;
    
    return (
      <form onSubmit={this.handleSubmit} className='entryform'>
        <div className='entryform-body'>
          <div className='entryform-heading'>
            <h1>Add an entry</h1>
          </div>
          <div className='entryform-field'>
            <label htmlFor='dateAdded'>Date of Service:</label>
            <Calendar
              id='dateAdded'
              value={selectedDate}
              description='Select a date:'
              onChange={(value) => this.handleChange('DateAdded', value)}
            />
          </div>
          <div className='entryform-field'>
            <label htmlFor='clientName'>Client Name</label>
            <div className='entryform-inputarea'>
              <input type='text'
                className='entryform-input'
                id='clientName'
                value={ClientName}
                onChange={(e) => this.handleChange('ClientName', e.target.value)}
              />
            </div>
            <Error show={errors.ClientName}>Please enter a client name.</Error>
          </div>
          <div className='entryform-field'>
            <div className='entryform-inputarea'>
              <label htmlFor="paymentType">Payment Type</label>
              <select
                id='paymentType'
                className='entryform-input'
                value={PaymentType}
                placeholder='Select'
                onChange={(e) => this.handleChange('PaymentType', e.target.value)}
              >
                {paymentOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <Error show={errors.PaymentType}>Please select a payment type.</Error>
          </div>
          <div className='entryform-field'>
            <label htmlFor="services">Services</label>
            <MultiSelect
              id='services'
              options={serviceOptions}
              values={ServicesRendered}
              onChange={(value) => this.handleChange('ServicesRendered', value)}
              description='Select services rendered:'
            />
            <Error show={errors.ServicesRendered}>Please select services rendered for this client.</Error>
          </div>
          <div className='entryform-field'>
            <label htmlFor='amountPaid'>Cost of service</label>
            <div className='entryform-inputarea'>
              <NumberFormat
                id='amountPaid'
                className='entryform-input'
                value={AmountPaid}
                thousandSeparator={true}
                decimalSeparator='.'
                fixedDecimalScale={true}
                decimalScale={2}
                prefix={'$'}
                pattern='\d*'
                type='tel'
                onValueChange={(values) => this.handleChange('AmountPaid', values.floatValue)}
              />
            </div>
            <Error show={errors.AmountPaidString}>Please enter the amount paid by this client.</Error>
          </div>
          <div className='entryform-field'>
            <label htmlFor='amountPaid'>Amount tipped (optional)</label>
            <div className='entryform-inputarea'>
              <NumberFormat
                id='tip'
                className='entryform-input'
                value={Tip}
                thousandSeparator={true}
                decimalSeparator='.'
                fixedDecimalScale={true}
                decimalScale={2}
                prefix={'$'}
                pattern='\d*'
                type='tel'
                onValueChange={(values) => this.handleChange('Tip', values.floatValue)}
              />
            </div>
          </div>
          <Error show={errors.Server}>Error submitting form. Please try again later.</Error>          
        </div>

        <button type='submit' onClick={(e) => { this.handleSubmit(e) }}>
          Submit
        </button>
      </form>
    );
  }
}

export default withRouter(EntryForm);
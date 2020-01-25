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
      isSubmitted: false,
      values: {
        DateAdded: new Date(),
        ClientName: '',
        ServicesRendered: [],
        PaymentMethods: [{
          AmountPaid: null,
          PaymentType: 'Credit'
        }]
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

  handleChange = (fieldName, newValue, group=null, index=-1) => {
    let currentValues = this.state.values;
    let currentErrors = this.state.errors;

    if (index > -1) currentValues[group][index][fieldName] = newValue;
    else currentValues[fieldName] = newValue;
    
    if (index > -1) {
      const hasError = this.validateField(group);
      if (hasError) currentErrors[group] = hasError;
      else if (currentErrors[group]) delete currentErrors[group];
    } else {
      const hasError = this.validateField(fieldName);
      if (hasError) currentErrors[fieldName] = hasError;
      else if (currentErrors[fieldName]) delete currentErrors[fieldName];
    }

    this.setState({
      values: currentValues,
      errors: currentErrors
    });
  }

  validateField = (fieldName) => {
    const { values } = this.state;

    if (fieldName === 'ClientName') {
      return (values[fieldName] === '');
    } else if (fieldName === 'ServicesRendered') {
      return (values[fieldName] <= 0);
    } else if (fieldName === 'PaymentMethods') {

      const errors = [];
      values.PaymentMethods.forEach((paymentMethod, index) => {
        const hasAmountPaidError = !paymentMethod.AmountPaid || paymentMethod.AmountPaid <= 0;
        const hasPaymentTypeError = paymentMethod.PaymentType === '';

        if (hasAmountPaidError || hasPaymentTypeError) {
          errors[index] = {
            AmountPaid: hasAmountPaidError,
            PaymentType: hasPaymentTypeError
          };
        }
      });
      return errors.length > 0 ? errors : false;

    }
  }

  validateForm = () => {
    return new Promise((resolve) => {
      const errors = {};

      const hasClientNameError = this.validateField('ClientName');
      if (hasClientNameError) errors.ClientName = hasClientNameError;

      const hasServicesRenderedError = this.validateField('ServicesRendered');
      if (hasServicesRenderedError) errors.ServicesRendered = hasServicesRenderedError;

      const hasPaymentMethodsErrors = this.validateField('PaymentMethods');
      if (hasPaymentMethodsErrors.length > 0) errors.PaymentMethods = hasPaymentMethodsErrors;

      this.setState({ errors: errors });
      resolve(Object.keys(errors).length > 0 || false);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });

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
      const { DateAdded, ClientName, ServicesRendered, PaymentMethods, AmountPaid, PaymentType } = this.props.entryData;

      // Accomodate legacy data model (no PaymentMethods array)
      let paymentMethods;
      if ((AmountPaid || PaymentType) && PaymentMethods.length < 1) {
        paymentMethods = [{
          AmountPaid,
          PaymentType
        }];
      }

      this.setState({
        values: {
          DateAdded,
          ClientName,
          ServicesRendered,
          PaymentMethods: (PaymentMethods.length > 0 && PaymentMethods)
            || paymentMethods
        }
      });
    }
  }

  addPaymentMethod = () => {
    this.setState((prevState) => {
      const { PaymentMethods } = prevState.values;
      PaymentMethods.push({ AmountPaid: null, PaymentType: 'Cash' });
      return {
        ...prevState,
        values: {
          ...prevState.values,
          PaymentMethods
        }
      };
    });
  }

  removePaymentMethod = (index) => {
    const { PaymentMethods } = this.state.values;
    PaymentMethods.splice(index, 1);
    this.setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        PaymentMethods
      }
    }))
  }

  render() {
    const { DateAdded, ClientName, ServicesRendered, PaymentMethods } = this.state.values;
    const { serviceOptions, paymentOptions } = this.state.options;
    const selectedDate = new Date(DateAdded);
    const { errors } = this.state;
    
    return (
      <>
        <form onSubmit={this.handleSubmit} className='entryform'>
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

          <div className='entryform-subsection'>
            {/* Payment methods */}
            {PaymentMethods.map((paymentMethod, index) => (
              <div key={`payment-${index}`} className='entryform-repeating_row'>
                <div className='entryform-repeating_row-field'>
                  <div className='entryform-inputarea'>
                    <label htmlFor="paymentType">Payment Type</label>
                    <select
                      id='paymentType'
                      className='entryform-input'
                      value={paymentMethod.PaymentType}
                      placeholder='Select'
                      onChange={(e) => this.handleChange('PaymentType', e.target.value, 'PaymentMethods', index)}
                    >
                      {paymentOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <Error show={errors.PaymentMethods && errors.PaymentMethods[index] && errors.PaymentMethods[index].PaymentType}>
                    Please select a payment method.
                  </Error>
                </div>
                <div className='entryform-repeating_row-field'>
                  <label htmlFor='amountPaid'>Amount paid</label>
                  <div className='entryform-inputarea'>
                    <NumberFormat
                      id='amountPaid'
                      className='entryform-input'
                      value={paymentMethod.AmountPaid}
                      thousandSeparator={true}
                      decimalSeparator='.'
                      fixedDecimalScale={true}
                      decimalScale={2}
                      prefix={'$'}
                      pattern='\d*'
                      type='tel'
                      inputMode='numeric'
                      onValueChange={(values) => this.handleChange('AmountPaid', values.floatValue, 'PaymentMethods', index)}
                    />
                  </div>
                  <Error show={errors.PaymentMethods && errors.PaymentMethods[index] && errors.PaymentMethods[index].AmountPaid}>
                    Please enter the amount paid by this client.
                  </Error>
                </div>
                {index > 0 && (
                  <div
                    className='delete-row'
                    onClick={() => this.removePaymentMethod(index)}
                    onKeyPress={() => this.addPaymentMethod(index)}
                    role="button"
                    tabIndex={0}
                  >
                    x
                  </div>
                )}
              </div>
            ))}
            {/* END Payment methods */}

            {this.state.values.PaymentMethods.length <2 && (  
              <div
                className='entryform-add_row'
                role="button"
                onClick={() => this.addPaymentMethod()}
                onKeyPress={() => this.addPaymentMethod()}
                tabIndex={0}
              >
                <p>+</p>
              </div>
            )}

            <Error show={errors.Server}>Error submitting form. Please try again later.</Error>          
          </div>
        </form>

        <button type='submit' onClick={(e) => { this.handleSubmit(e) }} disabled={this.state.isSubmitted}>
          Submit
        </button>
      </>
    );
  }
}

export default withRouter(EntryForm);
import React, { Component } from 'react';
import { Accordion, AccordionPanel, Box, Button, Calendar, FormField, MaskedInput, Select, Text } from 'grommet';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Error(props) {
  if (props.show) {
    return (
      <Box
        background='status-error'
        color='light-1'
        round='small'
        pad='small'
      >
        {props.children}
      </Box>
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
        PaymentType: '',
        ServicesRendered: [],
        AmountPaidString: '',
        AmountPaid: 0,
      },
      options: {
        serviceOptions: [{
          name: 'Womens Cut'
        }, {
          name: 'Mens Cut'
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

  parseCurrency = (value) => {
    return parseFloat(value.substr(1, value.length)) || 0;
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
      return (this.parseCurrency(this.state.values[fieldName]) <= 0);
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
    
    // Parse Currency (Amount)
    let currentState = this.state.values;
    currentState.AmountPaid = this.parseCurrency(this.state.values.AmountPaidString);
    this.setState(currentState);

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
      const { DateAdded, ClientName, PaymentType, ServicesRendered, AmountPaid } = this.props.entryData;
      this.setState({
        values: {
          DateAdded: DateAdded,
          ClientName: ClientName,
          PaymentType: PaymentType,
          ServicesRendered: ServicesRendered,
          AmountPaidString: '$' + AmountPaid.toString()
        }
      });
    }
  }

  render() {
    const { DateAdded, ClientName, PaymentType, ServicesRendered, AmountPaidString } = this.state.values;
    const { serviceOptions, paymentOptions } = this.state.options;
    const selectedDate = new Date(DateAdded);
    const dateFullString = Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date(DateAdded));
    const errors = this.state.errors;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <Box pad={{bottom: 'medium', horizontal: 'medium'}}>
              <Text size="xlarge">Add an entry</Text>
            </Box>
            <Box>
              <Accordion animate={true} multiple={false}>
                <AccordionPanel label={`Date: ${dateFullString}`}>
                  <Box style={{ overflow: 'hidden' }}>
                    <Calendar
                      id="dateAdded"
                      date={selectedDate.toString()}
                      onSelect={(e) => this.handleChange('DateAdded', e)}
                      size="medium"
                    />
                  </Box>
                </AccordionPanel>
              </Accordion>
            </Box>
            <Box pad="medium">
              <label htmlFor="clientName">Client Name</label>
              <input type='text'
                id="clientName"
                placeholder="Client Name"
                value={ClientName}
                onChange={(e) => this.handleChange('ClientName', e.target.value)}
              />
              <Error show={errors.ClientName}>Please enter a client name.</Error>
            </Box>
            <Box pad="medium">
              <label htmlFor="paymentType">Payment Type</label>
              <select
                id="paymentType"
                name="select"
                value={PaymentType}
                placeholder="Select"
                onChange={(e) => this.handleChange('PaymentType', e.target.value)}
              >
                {paymentOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <Error show={errors.PaymentType}>Please select a payment type.</Error>
            </Box>
            <Box pad="medium">
              <FormField label="Services" htmlFor="servicesRendered">
                <Select
                  id="servicesRendered"
                  size="medium"
                  placeholder="Select"
                  multiple
                  closeOnChange={false}
                  labelKey="name"
                  valueKey="name"
                  value={ServicesRendered}
                  options={serviceOptions}
                  onChange={({ value: nextValue }) => this.handleChange('ServicesRendered', nextValue)}
                />
              </FormField>
              <Error show={errors.ServicesRendered}>Please select services rendered htmlFor this client.</Error>
            </Box>
            <Box pad="medium">
              <FormField label="Amount Paid" htmlFor="amountPaid">
                <MaskedInput
                  id="amountPaid"
                  mask={[
                    { fixed: "$" },
                    {
                      regexp: /^[0-9]/,
                      placeholder: "0"
                    },
                    { fixed: "." },
                    {
                      length: 2,
                      regexp: /^[0-9]$/,
                      placeholder: "00"
                    }
                  ]}
                  value={AmountPaidString}
                  onChange={(e) => this.handleChange('AmountPaidString', e.target.value)}
                />
              </FormField>
              <Error show={errors.AmountPaidString}>Please enter the amount paid by this client.</Error>
            </Box>
            <Error show={errors.Server}>Error submitting form. Please try again later.</Error>
            <Box pad="medium">
              <Button label="Submit" type='submit' primary={true} onClick={(e) => { this.handleSubmit(e) }} />
            </Box>
          </Box>
        </Box>
      </form>
    );
  }
}

export default withRouter(EntryForm);
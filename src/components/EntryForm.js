import React, { Component } from 'react';
import { Box, Button, FormField, MaskedInput, Select, Text, TextInput } from 'grommet';
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
  constructor() {
    super();
    this.state = {
      values: {
        ClientName: '',
        PaymentType: '',
        ServicesRendered: [],
        AmountPaidString: '',
        AmountPaid: 0
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
        paymentOptions: ['Cash', 'Credit Card', 'Venmo', 'Apple Pay']
      },
      errors: {}
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
        // Submit data
        axios.post(process.env.REACT_APP_SERVICE_URL + '/entries/', { entry: this.state.values }).then((result) => {
          console.log('Result', result);
        });
      }
    });
  }

  render() {
    const { ClientName, PaymentType, ServicesRendered, AmountPaidString } = this.state.values;
    const { serviceOptions, paymentOptions } = this.state.options;
    const errors = this.state.errors;
    return (
      <form onSubmit={this.handleSubmit}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <Box pad={{bottom: 'medium', horizontal: 'medium'}}>
              <Text size="xlarge">Add an entry</Text>
            </Box>
            <Box pad="medium">
              <FormField label="Client Name" htmlFor="clientName">
                <TextInput
                  id="clientName"
                  placeholder="Client Name"
                  value={ClientName}
                  onChange={(e) => this.handleChange('ClientName', e.target.value)}
                />
              </FormField>
              <Error show={errors.ClientName}>Please enter a client name.</Error>
            </Box>
            <Box pad="medium">
              <FormField label="Payment Type" htmlFor="paymentType">
                <Select
                  id="paymentType"
                  name="select"
                  placeholder="Select"
                  value={PaymentType}
                  options={paymentOptions}
                  onChange={({ option }) => this.handleChange('PaymentType', option)}
                />
              </FormField>
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
                  // onSearch={text => {
                  //   const exp = new RegExp(text, "i");
                  //   this.setState({
                  //     options: {
                  //       serviceOptions: serviceOptions.filter(service => exp.test(service.name))
                  //     }
                  //   });
                  // }}
                />
              </FormField>
              <Error show={errors.ServicesRendered}>Please select services rendered for this client.</Error>
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
            <Box pad="medium">
              <Button label="Submit" type='submit' primary={true} onClick={(e) => { this.handleSubmit(e) }} />
            </Box>
          </Box>
        </Box>
      </form>
    );
  }
}

export default EntryForm;
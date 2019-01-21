import React, { Component } from 'react';
import { Box, Button, FormField, MaskedInput, Select, Text, TextInput } from 'grommet';
import axios from 'axios';

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
        }]
      }
    }
  }

  parseCurrency = (value) => {
    return parseFloat(value.substr(1, value.length));
  }

  handleChange = (propertyName, newValue) => {
    let currentState = this.state.values;
    currentState[propertyName] = newValue;
    this.setState(currentState);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse Currency (Amount)
    let currentState = this.state.values;
    currentState.AmountPaid = this.parseCurrency(this.state.values.AmountPaidString);
    this.setState(currentState);
    
    // Submit data
    axios.post(process.env.REACT_APP_SERVICE_URL + '/entries/', { entry: this.state.values }).then((result) => {
      console.log(result);
    });
  }

  render() {
    const { ClientName, PaymentType, ServicesRendered, AmountPaidString } = this.state.values;
    const { serviceOptions } = this.state.options;
    const paymentOptions = ['Cash', 'Credit Card', 'Venmo', 'Apple Pay'];
    return (
      <form onSubmit={this.handleSubmit}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <Box pad={{bottom: 'medium', horizontal: 'medium'}}>
              <Text size="xlarge">Add an entry</Text>
            </Box>
            <Box pad="medium">
              <FormField label="Client Name" htmlFor="text-input">
                <TextInput
                  id="text-input"
                  placeholder="Client Name"
                  value={ClientName}
                  onChange={(e) => this.handleChange('ClientName', e.target.value)}
                />
              </FormField>
            </Box>
            <Box pad="medium">
              <FormField label="Payment Type" htmlFor="text-input">
                <Select
                  id="select"
                  name="select"
                  placeholder="Select"
                  value={PaymentType}
                  options={paymentOptions}
                  onChange={({ option }) => this.handleChange('PaymentType', option)}
                />
              </FormField>
            </Box>
            <Box pad="medium">
              <FormField label="Services" htmlFor="text-input">
                <Select
                  size="medium"
                  placeholder="Select"
                  multiple
                  closeOnChange={false}
                  labelKey="name"
                  valueKey="name"
                  value={ServicesRendered}
                  options={serviceOptions}
                  onChange={({ value: nextValue }) => this.handleChange('ServicesRendered', nextValue)}
                  onSearch={text => {
                    const exp = new RegExp(text, "i");
                    this.setState({
                      options: {
                        serviceOptions: serviceOptions.filter(service => exp.test(service.name))
                      }
                    });
                  }}
                />
              </FormField>
            </Box>
            <Box pad="medium">
              <FormField label="Amount Paid" htmlFor="text-input">
                <MaskedInput
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
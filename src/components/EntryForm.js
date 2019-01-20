import React, { Component } from 'react';
import { Box, Button, FormField, Select, Text, TextInput } from 'grommet';

class EntryForm extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        clientName: '',
        paymentType: '',
        services: [],
        amount: ''
      },
      options: {
        serviceOptions: [{
          name: 'Cut'
        }, {
          name: 'Color'
        }, {
          name: 'Shave'
        }]
      }
    }
  }

  handleChange = (propertyName, newValue) => {
    let currentState = this.state.values;
    currentState[propertyName] = newValue;
    this.setState(currentState);
  }

  render() {
    const { clientName, paymentType, services, amount } = this.state.values;
    const { serviceOptions } = this.state.options;
    const paymentOptions = ['Cash', 'Venmo', 'Apple Pay'];
    return (
      <form>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <Box pad={{vertical: 'large', horizontal: 'medium'}}>
              <Text size="xlarge">Add an entry</Text>
            </Box>
            <Box pad="medium">
              <FormField label="Client Name" htmlFor="text-input">
                <TextInput
                  id="text-input"
                  placeholder="Client Name"
                  value={clientName}
                  onChange={(e) => this.handleChange('clientName', e.target.value)}
                />
              </FormField>
            </Box>
            <Box pad="medium">
              <FormField label="Payment Type" htmlFor="text-input">
                <Select
                  id="select"
                  name="select"
                  placeholder="Select"
                  value={paymentType}
                  options={paymentOptions}
                  onChange={({ option }) => this.handleChange('paymentType', option)}
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
                  value={services}
                  options={serviceOptions}
                  onChange={({ value: nextValue }) => this.handleChange('services', nextValue)}
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
                <TextInput
                  id="text-input"
                  placeholder="$0.00"
                  value={amount}
                  onChange={(e) => this.handleChange('amount', e.target.value)}
                />
              </FormField>
            </Box>
            <Box pad="medium">
              <Button label="Submit" type='submit' primary={true} onClick={() => {}} />
            </Box>
          </Box>
        </Box>
      </form>
    );
  }
}

export default EntryForm;
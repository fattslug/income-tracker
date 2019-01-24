import React, { Component } from 'react'
import { Box, DataTable } from 'grommet'
import axios from 'axios';

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const columns = [
  {
    property: "ClientName",
    header: "Client",
  }, {
    property: "PaymentType",
    header: "Payment",
  }, {
    property: "AmountPaid",
    header: "Amount",
    render: datum => amountFormatter.format(datum.AmountPaid || 0),
    align: "end",
    aggregate: "sum",
    footer: { aggregate: true }
  }
];

class EntryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_SERVICE_URL + '/entries/').then((result) => {
      this.setState({ data: result.data.body });
    });
  }

  render() {
    return(
      <Box pad='medium'>
        <DataTable size='large' columns={columns} data={this.state.data} primaryKey='_id' />
      </Box>
    );
  }
}

export default EntryTable;
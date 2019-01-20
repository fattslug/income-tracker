import React from 'react'
import { Box, DataTable } from 'grommet'

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const columns = [
  {
    property: "clientName",
    header: "Client",
  },
  {
    property: "paymentType",
    header: "Payment",
  },
  {
    property: "amount",
    header: "Amount",
    render: datum => amountFormatter.format(datum.amount),
    align: "end",
    aggregate: "sum",
    footer: { aggregate: true }
  }
];

const DATA = [
  {
    date: "2018-06-10",
    clientName: "Sean Powell",
    paymentType: "Cash",
    amount: 200
  },
  {
    date: "2018-06-09",
    clientName: "Wayland Jeong",
    paymentType: "Venmo",
    amount: 85
  },
  {
    date: "2018-06-11",
    clientName: "Justin Ferrales",
    paymentType: "Card",
    amount: 65
  }
];

const EntryTable = (props) => (
  <Box pad='medium'>
    <DataTable size='small' columns={columns} data={DATA} />
  </Box>
)

export default EntryTable;
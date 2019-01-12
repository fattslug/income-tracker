import React from 'react'
import { Box, DataTable } from 'grommet'

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const columns = [
  {
    property: "date",
    header: "Date",
    render: datum =>
      datum.date && new Date(datum.date).toLocaleDateString("en-US")
  },
  {
    property: "amount",
    header: "Amount Received",
    render: datum => amountFormatter.format(datum.amount),
    align: "end",
    aggregate: "sum",
    footer: { aggregate: true }
  },
  {
    property: "tip",
    header: "Tip Received",
    render: datum => amountFormatter.format(datum.tip),
    align: "end",
    aggregate: "sum",
    footer: { aggregate: true }
  }
];

const DATA = [
  {
    date: "2018-06-10",
    tip: 200 * 0.20,
    amount: 200
  },
  {
    date: "2018-06-09",
    tip: 85 * 0.20,
    amount: 85
  },
  {
    date: "2018-06-11",
    tip: 65 * 0.30,
    amount: 65
  }
];

const EntryTable = (props) => (
  <Box>
    <DataTable columns={columns} data={DATA} />
  </Box>
)

export default EntryTable;
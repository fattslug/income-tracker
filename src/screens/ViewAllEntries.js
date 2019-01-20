import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { Link } from 'react-router-dom';

import EntryTable from '../components/EntryTable';

class ViewAllEntries extends Component {
  render() {
    return (
      <Box fill={true}>
        <Box align="center" pad="large">
          <Link to='/add'>
            <Button label="Add Entry" onClick={() => {}} />
          </Link>
        </Box>
        <Box align="center" fill={true} width='xlarge'>
          <EntryTable />
        </Box>
      </Box>
    );
  }
}

export default ViewAllEntries;
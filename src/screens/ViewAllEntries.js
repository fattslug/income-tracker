import React, { Component } from 'react';
import { Box, Button } from 'grommet';

import EntryTable from '../components/EntryTable';

class ViewAllEntries extends Component {
  render() {
    return (
      <Box>
        <Box align="center" pad="large">
          <Button label="Add Entry" onClick={() => {}} />
        </Box>
        <Box align="center">
          <EntryTable />
        </Box>
      </Box>
    );
  }
}

export default ViewAllEntries;
import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { Link } from 'react-router-dom';

import EntryCards from '../components/EntryCards';

class ViewAllEntries extends Component {
  render() {
    return (
      <Box fill={true}>
        <Box align="center" pad="large">
          <Link to='/add'>
            <Button label="Add Entry" onClick={() => {}} />
          </Link>
        </Box>
        <Box align="center" fill={true} width='xlarge' className='entryList-container'>
          <EntryCards />
        </Box>
      </Box>
    );
  }
}

export default ViewAllEntries;
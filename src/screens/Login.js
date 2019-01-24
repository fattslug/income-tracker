import React, { Component } from 'react'
import { Box, Text } from 'grommet';
import LoginButton from '../components/LoginButton';


class Login extends Component {
  render() {
    return (
      <Box>
        <Box pad='medium'>
          <Text size='xlarge' weight='bold'>Income Tracker</Text>
          <Text size='large'>Sign In</Text>
        </Box>
        <LoginButton />
      </Box>
    )
  }
}

export default Login

import React, { Component } from 'react'
import { Box, ResponsiveContext, Text } from 'grommet';
import LoginButton from '../components/LoginButton';


class Login extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box 
            width='100%'
            height='100%'
            align='center'
          >
            <Box
              width={size === 'small' ? 'auto' : 'large'}
              pad='medium'
              align='center'
            >
              <Box width='large'>
                <Text size='xlarge' weight='bold'>Income Tracker</Text>
                <Text size='large'>Sign In</Text>
              </Box>
              <LoginButton />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    )
  }
}

export default Login

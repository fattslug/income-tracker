import React, { Component } from 'react'
import { Box, Text } from 'grommet';

class LoginButton extends Component {
  render() {
    return (
      <Box align='center' pad={{ top: 'xlarge' }}>
        <img
          width='60%'
          src='/assets/images/btn_google_signin_light_normal_web@2x.png'
          alt='Login with Google'
        />
      </Box>
    )
  }
}

export default LoginButton;
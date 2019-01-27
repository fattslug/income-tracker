import React, { Component } from 'react'
import { Anchor, Box } from 'grommet';

class LoginButton extends Component {
  render() {
    return (
      <Box
        align='center'
        pad={{ top: 'xlarge' }}
        width='medium'
        justify='center'
      >
        <Anchor href={process.env.REACT_APP_SERVICE_URL + '/auth/google'}>
          <img
            width='60%'
            src='/assets/images/btn_google_signin_light_normal_web@2x.png'
            alt='Login with Google'
          />
        </Anchor>
      </Box>
    )
  }
}

export default LoginButton;
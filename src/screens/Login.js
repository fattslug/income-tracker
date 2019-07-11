import React, { Component } from 'react'
import LoginButton from '../components/fragments/LoginButton';


class Login extends Component {
  render() {
    return (
      <div 
        width='100%'
        height='100%'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div
          style={{ padding: '12px 24px', display: 'flex', alignItems: 'center' }}
        >
          <div width='large'>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Income Tracker</div>
            <div size='large'>Sign In</div>
          </div>
          <LoginButton />
        </div>
      </div>
    )
  }
}

export default Login

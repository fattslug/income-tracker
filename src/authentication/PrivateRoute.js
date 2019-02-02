import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import auth from '../authentication/AuthHelper';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    if (!auth.isAuthenticated) {
      auth.setSession((success) => {
        if (success) {
          this.props.history.push('/');
        }
      });
    }
  }

  render() {
    if (auth.isAuthenticated) {
      auth.validateToken((err, success) => {
        if (err || !success) {
          auth.logout(() => {
            this.props.history.push('/login');
          })
        }
      });
    }
    const { component: Component, ...rest } = this.props;
    return(
      <Route {...rest} render={props => (
        auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />
    );
  }
}

export default withRouter(PrivateRoute);
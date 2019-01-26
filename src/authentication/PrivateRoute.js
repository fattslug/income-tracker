import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class PrivateRoute extends Component {
  componentDidMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      localStorage.setItem('jwt', query.token);
      this.props.history.push('/');
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return(
      <Route {...rest} render={props => (
        localStorage.getItem('jwt')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />
    );
  }
}

export default withRouter(PrivateRoute);
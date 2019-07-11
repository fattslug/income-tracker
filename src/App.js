import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// Components
import AppBar from './components/fragments/AppBar';

// Screens
import ViewAllEntries from './screens/ViewAllEntries';
import AddEntry from './screens/AddEntry';
import EditEntry from './screens/EditEntry';
import Login from './screens/Login';
import PrivateRoute from './authentication/PrivateRoute';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    }
  }

  render() {
    return (
      <Router basename='/income-tracker'>
        <div className='rootNode' id='app'>
          <AppBar />

          <div className='appbody'>
            <Route path='/login' exact component={Login}></Route>
            <PrivateRoute path='/' exact component={ViewAllEntries}></PrivateRoute>
            <PrivateRoute path='/add' exact component={AddEntry}></PrivateRoute>
            <PrivateRoute path='/edit/:entryID' exact component={EditEntry}></PrivateRoute>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

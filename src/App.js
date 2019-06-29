import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from "react-router-dom";
import { Grommet, Box, Text } from 'grommet';
import Theme from './Theme';

// Components
import AppBar from './components/AppBar';

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
      <Grommet theme={Theme}>
        <Router basename="/income-tracker">
          <Box className='rootNode'>
            <AppBar>
              <Link to="/">
                <Text size='large' color="white">Income Tracker</Text>
              </Link>
            </AppBar>

            <Box flex={true} fill={true}>
              <Route path='/login' exact component={Login}></Route>
              <PrivateRoute path='/' exact component={ViewAllEntries}></PrivateRoute>
              <PrivateRoute path='/add' exact component={AddEntry}></PrivateRoute>
              <PrivateRoute path='/edit/:entryID' exact component={EditEntry}></PrivateRoute>
            </Box>
          </Box>
        </Router>
      </Grommet>
    );
  }
}

export default App;

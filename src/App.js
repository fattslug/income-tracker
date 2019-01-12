import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grommet, Box } from 'grommet';
import Theme from './Theme';

// Components
import AppBar from './components/AppBar';

// Screens
import ViewAllEntries from './screens/ViewAllEntries';

class App extends Component {
  render() {
    return (
      <Grommet theme={Theme}>
        <AppBar>
          Income Tracker
        </AppBar>
        <Box flex={true} fill='vertical'>
          <Router>
            <Route path='/' exact component={ViewAllEntries}></Route>
          </Router>
        </Box>
      </Grommet>
    );
  }
}

export default App;

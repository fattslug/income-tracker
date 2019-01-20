import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Anchor, Grommet, Box, Text } from 'grommet';
import Theme from './Theme';

// Components
import AppBar from './components/AppBar';

// Screens
import ViewAllEntries from './screens/ViewAllEntries';
import AddEntry from './screens/AddEntry';

class App extends Component {
  render() {
    return (
      <Grommet theme={Theme}>
        <Router fill={true} width='xlarge'>
          <Box>
            <AppBar>
              <Anchor href="/">
                <Text size='large' color="white">Income Tracker</Text>
              </Anchor>
            </AppBar>
            
            <Box flex={true} fill={true}>
              <Route path='/' exact component={ViewAllEntries}></Route>
              <Route path='/add' exact component={AddEntry}></Route>
            </Box>
          </Box>
        </Router>
      </Grommet>
    );
  }
}

export default App;

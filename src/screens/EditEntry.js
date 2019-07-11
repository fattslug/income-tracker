import React, { Component } from 'react';
import axios from 'axios';

import EntryForm from '../components/fragments/EntryForm';

class EditEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {},
      entryID: this.props.match.params.entryID
    };

    if (!this.state.entryID) {
      // TODO: Show error modal -- back to home
      console.log('Error retrieving entry from database.');
      return;
    }

    this.getEntry();
  }

  getEntry = () => {
    axios.get(`${process.env.REACT_APP_SERVICE_URL}/entries/${this.state.entryID}`, {
      headers: { 'Authorization': 'bearer ' + localStorage.jwt }
    }).then((result) => {
      if (result.data.success) {
        this.setState({ entry: result.data.body.entry });
      } else {
        // TODO: Show error modal -- back to home
        console.log('Error retrieving entry from database.');
      }
    }).catch((err) => {
      // TODO: Show error modal -- back to home
      console.log('Error connecting to server.');
    });
  }

  render() {
    return (
      <EntryForm mode='edit' entryData={this.state.entry} />
    );
  }
}

export default EditEntry;
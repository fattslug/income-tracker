import React, { Component } from 'react';

import EntryForm from '../components/fragments/EntryForm';

class AddEntry extends Component {
  render() {
    return (
      <EntryForm mode='new' />
    );
  }
}

export default AddEntry;
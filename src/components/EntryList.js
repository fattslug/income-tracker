import React, { Component } from 'react'
import { Box, ResponsiveContext } from 'grommet'

import DeleteModal from '../screens/DeleteModal';
import EntryCard from './EntryCard';

import './css/EntryList.scss';

class EntryList extends Component {
  constructor() {
    super();
    this.state = {
      isDeleteModalShowing: false,
      selectedEntry: {}
    };
  }

  selectEntry = (entry) => {
    const currentState = this.state;
    currentState.selectedEntry = entry;
    this.setState(currentState);
  }
  
  showDeleteModal = (show, refresh = false) => {
    const currentState = this.state;
    currentState.isDeleteModalShowing = show;
    this.setState(currentState);
    if (refresh) { this.props.refreshData() };
  }

  render() {
    const { isDeleteModalShowing, selectedEntry } = this.state;
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box>
            <Box className='entryCards' width={size === 'small' ? 'medium' : 'large'}>
              {this.props.cardData.map((data, index) => {
                return (<EntryCard key={index} index={index} cardData={data} selected={this.selectEntry} showDeleteModal={this.showDeleteModal} />);
              })}
            </Box>
            <DeleteModal isOpen={isDeleteModalShowing} selectedEntry={selectedEntry} showDeleteModal={this.showDeleteModal} />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    )
  }
}

export default EntryList;
import React, { Component } from 'react'

import DeleteModal from '../../screens/DeleteModal';
import EntryCard from './EntryCard';

import './EntryList.scss';

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
      <div>
        <div className='entries'>
          {this.props.cardData.map((data, index) => {
            return (<EntryCard key={index} index={index} cardData={data} selected={this.selectEntry} showDeleteModal={this.showDeleteModal} />);
          })}
        </div>
        <DeleteModal isOpen={isDeleteModalShowing} selectedEntry={selectedEntry} showDeleteModal={this.showDeleteModal} />
      </div>
    )
  }
}

export default EntryList;
import React, { Component } from 'react';
import CalendarModal from './CalendarModal';

import './Calendar.scss';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleModal = () => {
    return new Promise((resolve) => {
      if (this.state.isOpen) {
        document.getElementsByClassName('ReactModal__Content')[0].style.opacity = '1';
        document.getElementsByClassName('ReactModal__Content')[0].style.animationName = 'swipeDown';
        setTimeout(() => { document.getElementsByClassName('ReactModal__Overlay')[0].style.animationName = 'fadeOut' }, 300);
        setTimeout(() => { this.setState({ isOpen: !this.state.isOpen }); resolve(); }, 500);
      } else {
        this.setState({ isOpen: !this.state.isOpen });
        resolve();
      }
    });
  }

  updateValues = (value) => {
    this.toggleModal().then(() => {
      this.props.onChange(value);
    });
  }

  render() {
    return (
      <div className='multiselect'
        tabIndex='5'
        role='button' aria-pressed='false'
        onClick={() => this.toggleModal()}
        onKeyPress={() => this.toggleModal()}
      >
        <div className='display'>
          Selected Date{this.props.value}
        </div>
        <CalendarModal
          key={this.props.value}
          isOpen={this.state.isOpen}
          onClose={(value) => this.updateValues(value)}
          defaultValue={this.props.value}
          {...this.props}
        />
      </div>
    );
  }
}

export default Calendar;
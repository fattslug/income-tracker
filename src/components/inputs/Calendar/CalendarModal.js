import React, { Component } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar/dist/entry.nostyle';

import './CalendarModal.scss';
import '../../utility/Modal.scss';

import modalStyles from '../../utility/CalendarModalStyles';
Modal.setAppElement('#root');

class CalendarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalDate: props.defaultValue,
      selectedDate: props.defaultValue
    }
  }

  selectDate = (date) => {
    this.setState({ selectedDate: date });
  }

  onClose = (acceptValues) => {
    if (acceptValues) {
      this.setState({ originalDate: this.state.selectedDate })
      this.props.onClose(this.state.selectedDate);
    } else {
      this.setState({ selectedDate: this.state.originalDate })
      this.props.onClose(this.state.originalDate);
    }
  }

  render() {
    return(
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={() => this.toggleModal}
        contentLabel='Select your options...'
        style={modalStyles}
      >
        <div className='modal-body'
          onClick={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
        >
          <div className='description'>
            {this.props.description}
          </div>

          <div className='calendar'>
            <Calendar />
          </div>

          <div className='actions'>
            <button className='actions-cancel'
              onClick={(e) => this.onClose(false)}
              onKeyDown={(e) => e.which !== 9 ? this.onClose(false) : null}
            >
              Cancel
            </button>
            <button className='actions-accept'
              onClick={(e) => this.onClose(true)}
              onKeyDown={(e) => e.which !== 9 ? this.onClose(true) : null}
            >
              Accept
            </button>
          </div>

        </div>
      </Modal>
    );
  }
}

export default CalendarModal;
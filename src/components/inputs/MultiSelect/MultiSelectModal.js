import React, { Component } from 'react';
import Modal from 'react-modal';

import './MultiSelectModal.scss';

import modalStyles from './modalStyles';
Modal.setAppElement('#root');

class MultiSelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalOptions: [...props.defaultValues],
      selectedOptions: [...props.defaultValues]
    }
  }

  toggleOption = (option, index) => {
    const optionIndex = this.state.selectedOptions.findIndex((o) => o.name === option.name);
    const newState = this.state;
    if (optionIndex >= 0) {
      newState.selectedOptions.splice(optionIndex, 1);
    } else {
      newState.selectedOptions.push(option);
    }

    document.getElementById(`option-${index}`).blur();
    this.setState({ selectedOptions: newState.selectedOptions });
  }

  onClose = (acceptValues) => {
    if (acceptValues) {
      this.setState({ originalOptions: [...this.state.selectedOptions] })
      this.props.onClose(this.state.selectedOptions);
    } else {
      this.setState({ selectedOptions: [...this.state.originalOptions] })
      this.props.onClose(this.state.originalOptions);
    }
  }

  render() {
    const selectedStrings = this.state.selectedOptions.map((option) => option.name);
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
          <div className='options'>
            {this.props.options.map((option, index) => {
              const optionSelected = selectedStrings.includes(option.name);
              return (
                <div key={index}
                  className={`options-card ${optionSelected ? 'selected' : ''}`}
                  onClick={(e) => this.toggleOption(option, index)}
                  onKeyPress={(e) => this.toggleOption(option, index)}
                  tabIndex={index} role='checkbox'
                  id={`option-${index}`} aria-checked={optionSelected}
                  aria-labelledby={`label-${index}`}
                >
                  <div className='options-card__label'>
                    <label htmlFor={`label-${index}`}>{option.name}</label>
                  </div>
                  <div className='options-card__checkbox'>
                    {optionSelected && (
                      <i className="fas fa-check"></i>
                    )}
                  </div>
                </div>
              )
            })}
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

export default MultiSelectModal;
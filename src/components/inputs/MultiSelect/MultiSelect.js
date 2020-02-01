import React, { Component } from 'react';
import MultiSelectModal from './MultiSelectModal';

import './MultiSelect.scss';


class MultiSelect extends Component {
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

  updateValues = (values) => {
    this.toggleModal().then(() => {
      this.props.onChange(values);
    });
  }

  render() {
    const selectedStrings = this.props.values.map((option) => option.name);
    return (
      <div className='multiselect'
        tabIndex='5'
        role='button' aria-pressed='false'
        onClick={() => this.toggleModal()}
        onKeyPress={() => this.toggleModal()}
      >
        <div className='multiselect-display'>
          <span className='multiselect-display__text'>
            {selectedStrings.join(', ') || (
              <div className='default'>None selected</div>
            )}
          </span>
          <span className='multiselect-display__icon'>
            <i className="fas fa-edit"></i>
          </span>
        </div>
        <MultiSelectModal
          key={this.props.values.length}
          isOpen={this.state.isOpen}
          onClose={(values) => this.updateValues(values)}
          defaultValues={this.props.values}
          {...this.props}
        />
      </div>
    );
  }
}

export default MultiSelect;
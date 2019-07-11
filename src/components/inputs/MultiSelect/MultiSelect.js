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
    const newState = this.state;
    newState.isOpen = !this.state.isOpen;

    let setStyles = () => new Promise((resolve) => resolve());
    if (!this.state.isOpen) {
      setStyles = () => new Promise((resolve) => {
        document.getElementsByClassName('ReactModal__Content')[0].style.opacity = '1';
        document.getElementsByClassName('ReactModal__Content')[0].style.animationName = 'swipeDown';
        // setTimeout(() => { document.getElementsByClassName('ReactModal__Overlay')[0].style.animationName = 'fadeOut' }, 300);
        setTimeout(() => { resolve() }, 500);
      });
    }

    setStyles().then(() => this.setState(newState));
  }

  updateValues = (values) => {
    this.toggleModal();
    this.props.onChange(values);
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
        <div className='display'>
          {selectedStrings.join(', ')}
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
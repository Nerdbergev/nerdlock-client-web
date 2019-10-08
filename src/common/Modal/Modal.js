import React, { Component } from 'react'
import './Modal.css'

class Modal extends Component {
  render() {
    return (
      <div className={'nl-modal ' + (this.props.visible ? 'nl-modal-visible' : '')}>
        {
          this.props.closeable &&
          <img src={'img/back.svg'} className={'nl-modal-close-icon'} onClick={ this.props.onClose }/>
        }
        <div className={'nl-modal-content'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal

import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import LockTransport from '../../transports/LockTransport'
import './LockControl.css'

class LockControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lockOpen: false,
      initialized: false,
      loading: false
    }
    this.lockTransport = new LockTransport()
    this.init()
  }

  async init() {
    var statusResponse = await this.lockTransport.status()
    if (statusResponse.status === 200) {
      this.setState({
        lockOpen: (statusResponse.data.status === 'open'),
        initialized: true
      })
    }
  }

  async handleLockAction() {
    let res = null

    this.setState({loading: true})
    setTimeout((function() {this.setState({loading: false})}).bind(this), 6000)

    try {
      if(!this.state.lockOpen) {
        res = await this.lockTransport.open(localStorage.getItem('auth'))
        this.setState({lockOpen: true})
      } else {
        res = await this.lockTransport.close(localStorage.getItem('auth'))
        this.setState({lockOpen: false})
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={'nl-lockstate'}>
          {
            this.state.initialized && !this.state.loading &&
            <span>
              { this.state.lockOpen ? 'Open' : 'Closed' }
            </span>
          }
          {
            this.state.loading &&
            <span id='action-indicator'>
              Doing Stuff...
            </span>
          }
        </div>
        <div className={'nl-unlock'}>
          {
            !this.state.loading &&
            <div className={'nl-unlock-btn'}>
              <img src={'img/key.svg'} alt={'open or close'} onClick={ this.handleLockAction.bind(this) }/>
            </div>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default LockControl

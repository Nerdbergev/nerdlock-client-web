import React, { Component } from 'react'
import Header from './components/Header/Header'
import LockControl from './components/LockControl/LockControl'
import CredentialsForm from './components/CredentialsForm/CredentialsForm'
import LockTransport from './transports/LockTransport'
import './app.css'
import Modal from './common/Modal/Modal'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {closeable: false}
    var auth = localStorage.getItem('auth')

    if (!auth || auth.length <= 0) {
      this.state = {view: 'credentials'}
    } else {
      this.state = {view: 'lockcontrol'}
    }

    this.lockTransport = new LockTransport()

    this.credentialsFormSubmitHandler = this.credentialsFormSubmitHandler.bind(this)
    this.settingsClickHandler = this.settingsClickHandler.bind(this)
    this.modalCloseHandler = this.modalCloseHandler.bind(this)
  }

  async credentialsFormSubmitHandler(username, password) {
    const authResponse = await this.lockTransport.authenticate(username, password)
    if (authResponse.status === 200) {
      localStorage.setItem('auth', authResponse.data.token)
      this.setState({view: 'lockcontrol'})
    }
  }

  settingsClickHandler() {
    this.setState({
      view: 'credentials',
      closeable: true
    })
  }

  modalCloseHandler() {
    this.setState({view: 'lockcontrol'})
  }

  render() {
    return (
      <div className={ 'site-wrapper' }>
        <Header showSettings={ this.state.view === 'lockcontrol' } onSettingsClick={ this.settingsClickHandler }/>

        {
          this.state.view === 'lockcontrol' &&
          <LockControl />
        }
        <Modal visible={ this.state.view === 'credentials' } closeable={ this.state.closeable } onClose={ this.modalCloseHandler }>
          <CredentialsForm onSubmit={ this.credentialsFormSubmitHandler }/>
        </Modal>
      </div>
    )
  }
}

export default App

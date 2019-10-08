import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './CredentialsForm.css'

class CredentialsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
    this.submitHandler = props.onSubmit
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <Grid className={"nl-credentials-form"}>
        <Row middle="xs" center="xs">
          <Col xs={12}>
            <img src={'img/logo.svg'} />
            <input type={"text"} placeholder={"Username"} onChange={ this.handleUsernameChange.bind(this) }/>
            <input type={"password"} placeholder={"Password"} onChange={ this.handlePasswordChange.bind(this) }/>
            <button onClick={ () => this.submitHandler(this.state.username, this.state.password) }>Authenticate</button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CredentialsForm

import React, { Component } from 'react'
import './Header.css'

class LockControlView extends Component {
  render() {
    return (
      <div>
        {
          this.props.showSettings &&
          <img src={'img/cog.svg'} alt={"settings"} className={'settings-btn'} onClick={this.props.onSettingsClick}/>
        }
      </div>
    )
  }
}

export default LockControlView

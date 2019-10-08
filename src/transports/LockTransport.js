import axios from 'axios';
import config from '../config'

class LockTransport {
  static instance = null

  constructor(){
    if (this.instance) {
      return this.instance
    }

    this.instance = this
  }

  async authenticate(username, password) {
    let result = new Promise((resolve, reject) => {
      axios.post(`${config.API_URL}/api-token-auth`, { username: username, password: password })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })

    return result
  }

  async open(auth) {
    let result = new Promise((resolve, reject) => {
      axios.get(`${config.API_URL}/open`, { headers: { Authorization: `Token ${auth}` } })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })

    return result
  }

  async close(auth) {
    let result = new Promise((resolve, reject) => {
      axios.get(`${config.API_URL}/close`, { headers: { Authorization: `Token ${auth}` } })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })

    return result
  }

  async status() {
    let result = new Promise((resolve, reject) => {
      axios.get(`${config.API_URL}/status`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })

    return result
  }
}

export default LockTransport

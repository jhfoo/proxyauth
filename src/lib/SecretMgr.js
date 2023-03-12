const axios = require('axios')

class SecretManager {
  static singleton = null

  constructor(ServiceBaseUrl) {
    this.ServiceBaseUrl = ServiceBaseUrl
  }

  static initSingleton(ServiceBaseUrl) {
    console.log(`DEBUG: initSingleton()`)
    this.singleton = new SecretManager(ServiceBaseUrl)
    return this.singleton
  }

  static getSingleton() {
    return this.singleton
  }

  async getSecretByKey(KeyPath) {
    try {
      const resp = await axios.get(this.ServiceBaseUrl + '/v1/kv/' + KeyPath)
      console.log(atob(resp.data[0].Value))
      return atob(resp.data[0].Value)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = SecretManager



'use strict'

module.exports = {
  thisThrows () {
    throw Error('thrown')
  },

  thisRejects () {
    return Promise.reject(Error('rejected'))
  }
}

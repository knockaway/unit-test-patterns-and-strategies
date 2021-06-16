'use strict'

module.exports = {
  method1 (input) {
    if (input === 'failure') throw Error('failure')
    return 'method1'
  },

  method2 (input) {
    if (typeof input !== 'string') throw Error('input must be a string')
    return input
  }
}

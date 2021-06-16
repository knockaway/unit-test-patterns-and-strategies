'use strict'

module.exports = function finishesLater (done) {
  // Do something clever here...

  setImmediate(() => {
    // ...now finish by invoking the `done` callback:
    done(null, 'finished')
  })
}

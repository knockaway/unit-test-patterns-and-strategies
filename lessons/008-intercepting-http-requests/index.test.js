'use strict'

const tap = require('tap')
const nock = require('nock')
const getData = require('./index')

const BASE_URL = 'https://api.github.com'
const URL_PATH = '/users/octocat/repos'

// This is a very basic test using the `nock` library. We configure `nock`
// to intercept requests for the domain specified by `BASE_URL` that target
// the path `URL_PATH`. On the first such request being intercepted, `nock` will
// "respond" to the request with a connection error, thus triggering the
// `req.on('error')` callback.
tap.test('rejects on communication errors', async t => {
  nock(BASE_URL).get(URL_PATH).replyWithError(Error('broken connection'))
  t.rejects(getData, /broken connection/)
})

// This test shows how `nock` can be used to respond to the HTTP request with
// a specific specification compliant error code.
tap.test('rejects for non-200 response', async t => {
  nock(BASE_URL).get(URL_PATH).reply(418)
  t.rejects(getData, /got invalid status code 418/)
})

// This test shows testing a "good" 200 response that fails to parse correctly.
tap.test('rejects for bad response data', async t => {
  nock(BASE_URL).get(URL_PATH).reply(200, '{"broken":"json"')
  t.rejects(getData, /Unexpected end of JSON input/)
})

// Finally, we see a completely successful response test.
tap.test('returns correct data', async t => {
  nock(BASE_URL).get(URL_PATH).reply(200, JSON.stringify([
    { repository: 'information' }
  ]))
  const result = await getData()
  t.strictSame(result, [{ repository: 'information' }])
})

const { port } = require('config')
const host = 'http://localhost:' + port
const breq = require('bluereq')
const logger = require('../../lib/logger')

module.exports = {
  get: (url, lang) => {
    return breq.get({
      url: host + url,
      headers: { 'accept-language': lang }
    })
  },
  // A function to quickly fail when a test gets an undesired positive answer
  undesiredRes: done => res => {
    logger.warn(res, 'undesired positive res')
    done(new Error('.then function was expected not to be called'))
  },
  undesiredErr: done => err => {
    done(err)
    logger.warn(err.body || err, 'undesired err body')
  }
}

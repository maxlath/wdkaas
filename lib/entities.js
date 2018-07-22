const Promise = require('bluebird')
const wdk = require('wikidata-sdk')
const breq = require('bluereq')
const errors = require('./errors')
const { isNonEmptyString, camelifyKeys } = require('./utils')

module.exports = (req, res) => {
  const { query } = req
  Promise.try(() => getUrl(query))
  .then(breq.get)
  .get('body')
  .then(body => {
    const options = camelifyKeys(query)
    const simplified = wdk.simplify.entities(body.entities, options)
    res.json(simplified)
  })
  .catch(errors.Handle(res))
}

const getUrl = query => {
  var { ids, titles, sites, languages, lang, props } = query

  languages = languages || lang

  if (isNonEmptyString(ids)) {
    ids = ids.split('|')
    for (let id of ids) {
      if (!wdk.isEntityId(id)) {
        throw errors.new('invalid entity id', 400, { id })
      }
    }
    return wdk.getEntities({ ids, languages, props })
  }

  if (isNonEmptyString(titles) && isNonEmptyString(sites)) {
    return wdk.getWikidataIdsFromSitelinks({ titles, sites, languages, props })
  }

  throw errors.new('invalid query', 400, query)
}

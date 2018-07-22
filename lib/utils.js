const camelCase = require('lodash/camelCase')

module.exports = {
  identity: value => value,

  isNumber: num => typeof num === 'number' && !Number.isNaN(num),

  isNonEmptyString: str => typeof str === 'string' && str.length > 0,

  camelifyKeys: obj => Object.keys(obj).reduce(aggregateCamelified(obj), {})
}

const aggregateCamelified = obj => (camelified, key) => {
  camelified[camelCase(key)] = obj[key]
  return camelified
}

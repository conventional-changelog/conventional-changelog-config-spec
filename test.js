/* global describe, it */
const assert = require('assert')
const Ajv = require('ajv')
/**
 * @todo this will need to account for multiple versions and `latest`
 */
const schema = require('./versions/1.0.0/schema.json')

describe('JSON Schema', function () {
  it('should be a valid schema', function () {
    const ajv = new Ajv()
    assert.doesNotThrow(ajv.compile(schema))
  })

  it('should validate a simple `type` configuration', function () {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const mock = {
      'types': [
        { 'type': 'feat', 'section': 'Features' },
        { 'type': 'fix', 'section': 'Bug Fixes' },
        { 'type': 'imp', 'hidden': true }
      ]
    }
    assert(validate(mock))
  })

  it('should NOT validate on an invalid `type` configuration', function () {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const mock = {
      'types': [
        { 'type': 'feat', 'section': 'Features' },
        { 'type': 'fix', 'this_will_be_invalid': 'Bug Fixes' },
        { 'type': 'docs', 'hidden': true }
      ]
    }
    assert(validate(mock) === false)
  })
})

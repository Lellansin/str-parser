'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {
  describe('Convert', function () {
    it('should convert to money string', function(done) {
      var str = _s('123456789000')
        .toMoneyStr()
        .toString()
      should.equal(str, '123,456,789,000')
      done()
    })
  })

  /*
    toJson
    parseUrl
    parseQuery
   */
})

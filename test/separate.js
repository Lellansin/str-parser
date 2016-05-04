'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {
  describe('#split', function () {
    it('should split the sentence with blank, colon or plus', function (done) {
      var list = _s('Wed May 04 2016 12:45:03 GMT+0800 (CST)')
        .split(/(\ |\:|\+)/g)
      should.deepEqual(list, [ 'Wed', 'May', '04', '2016', '12', '45', '03', 'GMT', '0800', '(CST)' ])
      done()
    })

    it('should split the sentence with \\r, \\n or \\r\\n', function (done) {
      var str =
      'Line one texts ...\n' +
        'Line two\r' +
        'Line three texts ...\r\n' +
        'Line four ...\n'

      var list = _s(str).split(/\r\n|\n|\r/g, function (match) {
        return match.toUpperCase() 
      })
      should.deepEqual(list, [ 'LINE ONE TEXTS ...',
        'LINE TWO',
        'LINE THREE TEXTS ...',
        'LINE FOUR ...' ])
      done()
    })

    it('should get the separator indexs', function (done) {
      var list = _s('12,123,456,789').split(/,\d{3}/g, function (match, separator, index) {
        return index 
      })
      should.deepEqual(list, [ 2, 6, 10 ])
      done()
    })
  })
})

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

  describe('Range', function () {
    it('#before - should return the string before `world`', function (done) {
      var str = _s('hello world').before('world')
      should.equal(str, 'hello ')
      done()
    })

    it('#before - should return the string before /\\d/', function (done) {
      var str = _s('hello 12 world').before(/\d/)
      should.equal(str, 'hello ')
      done()
    })

    it('#after - should return the string after `hello`', function (done) {
      var str = _s('hello world').after('hello')
      should.equal(str, ' world')
      done()
    })

    it('#after - should return the string after /\\d\\.\\w+/', function (done) {
      var str = _s('1.hello 2.world').after(/\d\.\w+/)
      should.equal(str, ' 2.world')
      done()
    })

    it('#between - should return the string between `hello ` and ` world`', function (done) {
      var s = _s('hello test world').between('hello ', ' world')
      should.equal(s, 'test')
      done()
    })

    it('#between - should return the string between /\\w+\\?\\ /, /\\ \\d\\.\\w+/', function (done) {
      var s = _s('hello? test 2.world').between(/\w+\?\ /, /\ \d\.\w+/)
      should.equal(s, 'test')
      done()
    })
  })
})

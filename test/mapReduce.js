'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {

  describe('#map', function () {
    it('[map] should get a match list', function(done) {
      var list = _s('Alan Bob Cici')
        .map(/\w+/g,
          function(value) {
            return value
          })
      should.deepEqual(list, ['Alan', 'Bob', 'Cici'])
      done()
    })
  })

  describe('#reduce', function () {
    it('[/\\w+/g] should reduce the words', function(done) {
      var str = _s('hello world test')
        .reduce(/\w+/g, function (a, b) {
          return a + ',' + b
        })
      should.equal(str, 'hello,world,test')
      done()
    })

    it('[/\\w+/g] should reserve the words', function(done) {
      var str = _s('hello world test')
        .reduce(/\w+/g, function (a, b) {
          return b + ',' + a
        })
      should.equal(str, 'test,world,hello')
      done()
    })
  })

  describe('#filter', function () {
    it('[/\\w+/g] should filter the words', function(done) {
      var str = '12 1 5 6 18 101 22';
      var res = _s(str).filter(/\d+/g, function (num) { return num.length == 2 })
      should.deepEqual(res, [ '12', '18', '22' ])
      done()
    })
  })
})
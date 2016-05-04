'use strict'

var should = require('should')
var _s = require('../')
var pos = require('../lib/position')

describe('position', function () {

  describe('#get', function () {
    it('should get the position of `May`', function (done) {
      var self = _s('Wed May 04 2016 12:45:03 GMT+0800 (CST)');
      var p = pos.get(self, 'May');
      should.equal(p, 4)
      done()
    })
  })

  describe('#getAfter', function () {
    it('should get the position after `May`', function (done) {
      var self = _s('Wed May 04 2016 12:45:03 GMT+0800 (CST)');
      var p = pos.getAfter(self, 'May');
      should.equal(p, 7)
      done()
    })
  })

  describe('#getLast', function () {
    it('should get last the position of /\\d/', function (done) {
      var self = _s('0123456');
      var p = pos.getLast(self, /\d/);
      should.equal(p, 6)
      done()
    })
  })
})
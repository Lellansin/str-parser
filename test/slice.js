'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {
  describe('#slice', function () {
    it('should slice from first `w` to the end.', function(done) {
      var str = _s('hello world')
          .find('w')
          .sliceTo()
      should.equal(str, 'world')
      done()
    })

    it('should slice from first `w` to pos -2.', function(done) {
      var str = _s('hello world')
          .find('w')
          .sliceTo(-2)
      should.equal(str, 'wor')
      done()
    })

    it('should slice from pos 1 to the first `o`', function(done) {
      var str = _s('hello world')
          .find('o')
          .sliceFrom(1)
      should.equal(str, 'ell')
      done()
    })

    it('should slice from pos 1 to the first `o`', function(done) {
      var str = _s('hello world')
          .find('o')
          .sliceFrom(1)
      should.equal(str, 'ell')
      done()
    })
  })
})
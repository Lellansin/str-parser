'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {
  describe('#slice', function () {
    it('should slice from first `w` to the end.', function(done) {
      var str = _s('hello world')
          .find('w')
          .sliceTo()
          .val()
      should.equal(str, 'world')
      done()
    })

    it('should slice from first `w` to pos -2.', function(done) {
      var str = _s('hello world')
          .find('w')
          .sliceTo(-2)
          .val()
      should.equal(str, 'wor')
      done()
    })

    it('should slice from pos 1 to the first `o`', function(done) {
      var str = _s('hello world')
          .find('o')
          .sliceFrom(1)
          .val()
      should.equal(str, 'ell')
      done()
    })

    it('should slice from pos 1 to the first `o`', function(done) {
      var str = _s('hello world')
          .find('o')
          .sliceFrom(1)
          .val()
      should.equal(str, 'ell')
      done()
    })
  })

  describe('#map / reduce etc..', function () {
    it('[map] should get a match list', function(done) {
      var list = _s('Alan Bob Cici')
        .map(/\w+/g,
          function(value) {
            return value
          })
      should.deepEqual(list, ['Alan', 'Bob', 'Cici'])
      done()
    })

    it('[/\\w+/g] should reduce the words', function(done) {
      var str = _s('hello world test')
        .reduce(/\w+/g, (a, b) => {
          return a + ',' + b
        })
        .val()
      should.equal(str, 'hello,world,test')
      done()
    })

    it('[/\\w+/g] should reserve the words', function(done) {
      var str = _s('hello world test')
        .reduce(/\w+/g, (a, b) => {
          return b + ',' + a
        })
        .val()
      should.equal(str, 'test,world,hello')
      done()
    })
  })

  describe('#get (for more simple regex)', function () {
    it('get(re) should match the url', function(done) {
      var text = '<a href="http://lellansin.com">My blog</a>'
      var list = _s(text).get(/href="([\w\W]+?)"/)
      should.deepEqual(list, [ 'href="http://lellansin.com"', 'http://lellansin.com' ])
      done()
    })

    it('get(re) should get nothing', function(done) {
      var list = _s('<a>My blog</a>').get(/href="([\w\W]+?)"/)
      should.deepEqual(list, [ ])
      done()
    })

    it('get(re, 1) should get the href', function(done) {
      var text = '<a href="http://lellansin.com">My blog</a>'
      var uri = _s(text).get(/href="([\w\W]+?)"/, 1).val()
      should.deepEqual(uri, 'http://lellansin.com')
      done()
    })

    it('get(re, 1) should get nothing', function(done) {
      var text = '<a>My blog</a>'
      var uri = _s(text).get(/href="([\w\W]+?)"/, 1).val()
      should.deepEqual(uri, '')
      done()
    })

    it('get(re) should get list of href', function(done) {
      var text = '<a href="http://lellansin.com">My blog</a>' +
        '<a href="http://google.com">Google</a>'
      var uri = _s(text).get(/href="[\w\W]+?"/g)
      should.deepEqual(uri, ['href="http://lellansin.com"', 'href="http://google.com"'])
      done()
    })

    it('get(re, 1) should get list of href', function(done) {
      var text = '<a href="http://lellansin.com">My blog</a>' +
        '<a href="http://google.com">Google</a>'
      var uri = _s(text).get(/href="([\w\W]+?)"/g, 1)
      should.deepEqual(uri, ['href="http://lellansin.com"', 'href="http://google.com"'])
      done()
    })
  })

  it('should convert to money string', function(done) {
    var str = _s('123456789000')
      .toMoneyStr()
      .toString()
    should.equal(str, '123,456,789,000')
    done()
  })
})

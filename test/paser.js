'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {
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
      var uri = _s(text).get(/href="([\w\W]+?)"/, 1)
      should.deepEqual(uri, 'http://lellansin.com')
      done()
    })

    it('get(re, 1) should get nothing', function(done) {
      var text = '<a>My blog</a>'
      var uri = _s(text).get(/href="([\w\W]+?)"/, 1)
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
})

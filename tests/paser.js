'use strict'

var should = require('should')
var _s = require('../')

describe('parser', function () {
  it('should slice', function(done) {
    should(
      _s('hello world')
        .find('w')
        .sliceTo()
      )
      .equal('world')
    done()
  })

  it('should slice', function(done) {
    should(
      _s('hello world')
        .find('w')
        .sliceTo(-2)
      )
      .equal('wor')
    done()
  })

  it('should slice', function(done) {
    should(
      _s('hello world')
        .find('o')
        .sliceFrom(1)
      )
      .equal('ell')
    done()
  })

  it('should slice from find', function(done) {
    _s('123456789000').toMoneyStr().should.equal('123,456,789,000')
    done()
  })

  it('should do regular exp', function(done) {
    _s('<a href="http://lellansin.com"></a>')
      .get(/href="([\w\W]+?)"/)
      .should.deepEqual([ 'href="http://lellansin.com"', 'http://lellansin.com' ])
    done()
  })

  it('should do regular exp', function(done) {
    _s('<a></a>')
      .get(/href="([\w\W]+?)"/)
      .should.deepEqual([ ])
    done()
  })

  it('should do map', function(done) {
    _s('Alan Bob Cici').map(/\w+/g, function(value) {
        return value
      })
      .should.deepEqual(['Alan', 'Bob', 'Cici'])
    done()
  })
})

'use strict'

var should = require('should')
var utils = require('../lib/utils')

describe('utils', function () {
  it('should get md5', function(done) {
    var txt = utils.md5('hello world')
    txt.should.equal('5eb63bbbe01eeed093cb22bb8f5acdc3')
    done()
  })
})

'use strict'

var url = require('url')
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

exports.md5 = function (str) {
  return md5sum.update(str).digest('hex');
};

exports.parseUrl = function (str) {
  return url.parse(str);
};

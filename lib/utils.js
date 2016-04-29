'use strict'

var url = require('url');
var querystring = require('querystring');
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

exports.md5 = function (str) {
  return md5sum.update(str).digest('hex');
};

exports.parseUrl = function (str) {
  return url.parse(str);
};

exports.parseQuery = function (str) {
  return querystring.parse(str);
};

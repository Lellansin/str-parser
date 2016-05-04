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


exports.getRegExp = function (str) {
  switch(typeof str) {
    case 'string':
      if (str.length)
        return new RegExp(str, 'g');
      return null;
    case 'object':
      if (str.constructor == RegExp)
        return str;
    default:
      return null;
  }
}

exports.getGlobalRegExp = function (str) {
  var re = exports.getRegExp(str);
  if (!re) throw new Error('Invalid RegExp: ' + str);

  if (re.global) {
    return re;
  }
  var flags = 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return new RegExp(re.source, flags)
}

'use strict'

var utils = require('./utils')

module.exports = function (str) {
  if (typeof str == 'string') 
    return new Parser(str)
  return new Parser(new String(str).toString())
}

function Parser (str) {
  this.value = str;
}

Parser.prototype.valueOf =
Parser.prototype.toString = function() {
  return this.value;
};

Parser.prototype.get = function(re) {
  var res = this.value.match(re);
  if (res && res.length) 
    return res.slice(0, res.length)
  return []
};

Parser.prototype.map = function(re, fn) {
  var res = []
  this.value.replace(re, function() {
    res.push(fn.apply(this, arguments))
  })
  return res
};

Parser.prototype.find = 
Parser.prototype.indexOf = function(str) {
  this.index = this.value.indexOf(str)
  return this;
};

Parser.prototype.rfind = function() {
  // TODO
}

Parser.prototype.sliceTo = function(to) {
  if (this.index !== undefined) {
    var index = this.index
    delete this.index
    return this.value.slice(index, to)
  }
};

Parser.prototype.sliceFrom = function(from) {
  if (this.index !== undefined) {
    var index = this.index
    delete this.index
    return this.value.slice(from, index)
  }
};

Parser.prototype.isInt = function() {
  return /^\d+$/.test(this.value);
};

Parser.prototype.isFloat = function() {
  return /^\d+\.(\d+)?$/.test(this.value);
};

/*
 * '123456789000' => '123,456,789,000'
 */
Parser.prototype.toMoneyStr = function() {
  return this.value.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

Parser.prototype.toJson = function() {
  return JSON.parse(this.value);
};

Parser.prototype.parseUrl = function() {
  return utils.parseUrl(this.value);
};

Parser.prototype.encodeURI = function() {
  return encodeURI(this.value);
};

Parser.prototype.encodeURIComponent = function() {
  return encodeURIComponent(this.value);
};

Parser.prototype.decodeURI = function() {
  return decodeURI(this.value);
};

Parser.prototype.decodeURIComponent = function() {
  return decodeURIComponent(this.value);
};

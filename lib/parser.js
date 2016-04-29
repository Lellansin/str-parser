'use strict'

var utils = require('./utils')

module.exports = function (str) {
  if (typeof str == 'string') 
    return new Parser(str)
  return new Parser(new String(str).toString())
}

function Parser (str) {
  this.content = str;
}

Parser.prototype.valueOf =
Parser.prototype.toString = function() {
  return this.content;
};

Parser.prototype.val = 
Parser.prototype.value = function(val) {
  if (val)
    this.content = val;
  return this.content;
};

Parser.prototype.get = function(re, index) {
  var res = this.content.match(re);
  if (!re.global && index != undefined) {
    this.content = (res && res[index]) || ''
    return this
  }
  if (res && res.length) {
    return res.slice(0, res.length)
  }
  return []
};

Parser.prototype.map = function(re, fn) {
  var res = []
  if (typeof fn !== 'function')
    fn = function () { return arguments[0] }
  this.content.replace(re, function() {
    res.push(fn.apply(this, arguments))
  })
  return res
};

Parser.prototype.reduce = function(re, fn) {
  var list = this.map(re, function () {
    if (arguments.length === 3) {
      return arguments[0];
    }
    return Array.prototype.slice.call(arguments, 0, -2);
  })

  var currentIndex = 1, currentValue, previousValue = list[0];
  do {
    currentValue = list[currentIndex];
    if (currentValue !== undefined) {
      previousValue = fn(previousValue, currentValue, currentIndex, list); 
    }
  } while(list[++currentIndex] !== undefined);
  this.content = previousValue;
  return this;
};

Parser.prototype.find = 
Parser.prototype.indexOf = function(str) {
  this.index = this.content.indexOf(str)
  return this;
};

Parser.prototype.rfind = 
Parser.prototype.lastIndexOf = function(str) {
  this.index = this.content.lastIndexOf(str)
  return this
};

Parser.prototype.sliceTo = function(to) {
  if (typeof to === 'string') {
    to = this.content.slice(this.index).indexOf(to)
    if (to === -1) to = this.index
  }
  if (this.index !== undefined) {
    this.content = this.content.slice(this.index, to)
    delete this.index
  }
  return this
};

Parser.prototype.sliceFrom = function(from) {
  if (typeof from === 'string') {
    from = this.content.slice(0, this.index).indexOf(from)
    if (from === -1) from = this.index
  }
  if (this.index !== undefined) {
    this.content = this.content.slice(from || 0, this.index)
    delete this.index
  }
  return this;
};

Parser.prototype.substr = function(length) {
  if (this.index !== undefined) {
    this.content.substr(this.index, length)
    delete this.index
  }
  return this;
};

Parser.prototype.substring = function(indexEnd) {
  if (this.index !== undefined) {
    this.content.substring(this.index, indexEnd)
    delete this.index
  }
  return this;
};

Parser.prototype.replace = function() {
  this.content = String.prototype.replace.apply(this.content, arguments)
  return this
};

Parser.prototype.replaceOff = function(re) {
  
};

Parser.prototype.split = function(separator) {
  
};

Parser.prototype.equal = function(str) {
  return this.content === str;
};

Parser.prototype.isInt = function() {
  return /^\d+$/.test(this.content);
};

Parser.prototype.isFloat = function() {
  return /^\d+\.(\d+)?$/.test(this.content);
};

/*
 * '123456789000' => '123,456,789,000'
 */
Parser.prototype.toMoneyStr = function() {
  this.content = this.content.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  return this;
};

Parser.prototype.toJson = function() {
  this.content = JSON.parse(this.content);
  return this;
};

Parser.prototype.parseUrl = function() {
  this.content = utils.parseUrl(this.content);
  return this;
};

Parser.prototype.parseQuery = function() {
  this.content = utils.parseQuery(this.content);
  return this;
};

Parser.prototype.encodeURI = function() {
  this.content = encodeURI(this.content);
  return this;
};

Parser.prototype.encodeURIComponent = function() {
  this.content = encodeURIComponent(this.content);
  return this;
};

Parser.prototype.decodeURI = function() {
  this.content = decodeURI(this.content);
  return this;
};

Parser.prototype.decodeURIComponent = function() {
  this.content = decodeURIComponent(this.content);
  return this;
};

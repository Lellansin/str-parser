'use strict'

var pos = require('./position')
var utils = require('./utils')

module.exports = function (str) {
  if (typeof str == 'string') 
    return new Parser(str);
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
    return (res && res[index]) || ''
  }
  if (res && res.length) {
    return res.slice(0, res.length)
  }
  return []
};

Parser.prototype.gets = function(re, index) {
  var res = this.get(re, index);
  if (typeof res === 'string') {
    return new Parser(res);
  }
  return map2Parser(res);
};

Parser.prototype.map = function(re, fn) {
  var res = []
  if (typeof fn !== 'function')
    fn = function () { return arguments[0] }
  this.content.replace(getGlobalRegExp(re), function() {
    res.push(fn.apply(this, arguments))
  })
  return res
};

Parser.prototype.maps = function(re, fn) {
  return map2Parser(this.map(re, fn));
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

  return previousValue
};

Parser.prototype.reduces = function(re, fn) {
  var res = this.reduce(re, fn);
  if (typeof res === 'string') {
    this.content = res;
    return this;
  }
  return map2Parser(res);
};

// Parser.prototype.reduceRight = function() {
  // TODO
// };

// Parser.prototype.reduceRights = function() {
  // TODO
// };

// Parser.prototype.every = function() {
  // TODO
// };

// Parser.prototype.everys = function() {
  // TODO
// };

// Parser.prototype.some = function() {
  // TODO
// };

// Parser.prototype.somes = function() {
  // TODO
// };

Parser.prototype.filter = function(re, fn) {
  var list = this.map(re, function () {
    if (arguments.length === 3) {
      return arguments[0];
    }
    return Array.prototype.slice.call(arguments, 0, -2);
  })

  if (typeof fn !== 'function') {
    return list;
  }

  return list.filter(fn);
};

Parser.prototype.filters = function(re, fn) {
  return map2Parser(this.filter(re, fn));
};

// Parser.prototype.reverse = function() {
  // TODO
// };

// Parser.prototype.next = function() {
//   // TODO find with cursor
// };

// Parser.prototype.nextIndexOf = function() {
//   // TODO find with cursor
// };

Parser.prototype.find = 
Parser.prototype.indexOf = function(str) {
  this.index = this.content.indexOf(str);
  return this;
};

Parser.prototype.rfind = 
Parser.prototype.lastIndexOf = function(str) {
  this.index = this.content.lastIndexOf(str);
  return this
};

Parser.prototype.slice = function(start, end) {
  var indexStart = pos.get(this, start, 0),
    indexEnd = pos.get(this, end, undefined);
  return this.content.slice(indexStart, indexEnd);
};

Parser.prototype.slices = function(start, end) {
  this.content = this.slice(start, end);
  return this;
};

Parser.prototype.sliceTo = function(to) {
  if (typeof to === 'string') {
    to = this.content.slice(this.index).indexOf(to)
    if (to === -1) return '';
  }
  if (this.index !== undefined) {
    return this.content.slice(this.index, to)
  }
  return ''
};

Parser.prototype.sliceTos = function(to) {
  if (typeof to === 'string') {
    to = this.content.slice(this.index).indexOf(to)
    if (to === -1) return '';
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
    if (from === -1) return '';
  }
  if (this.index !== undefined) {
    return this.content.slice(from || 0, this.index)
  }
  return '';
};

Parser.prototype.sliceFroms = function(from) {
  if (typeof from === 'string') {
    from = this.content.slice(0, this.index).indexOf(from)
    if (from === -1) return '';
  }
  if (this.index !== undefined) {
    return this.content.slice(from || 0, this.index)
  }
  return this;
};

Parser.prototype.before = function(str) {
  var index = pos.get(this, str, undefined);
  return this.content.slice(0, index);
};

Parser.prototype.befores = function(str) {
  this.content = this.before(str);
  return this;
};

Parser.prototype.after = function(str) {
  var index = pos.getAfter(this, str, 0);
  return this.content.slice(index);
};

Parser.prototype.afters = function(str) {
  this.content = this.after(str);
  return this;
};

Parser.prototype.between = function(start, end) {
  var indexStart = pos.getAfter(this, start, 0);
  var indexEnd = pos.get(this, end, undefined);
  return this.content.slice(indexStart, indexEnd);
};

Parser.prototype.betweens = function(start, end) {
  this.content = this.between(start, end)
  return this;
};

Parser.prototype.substr = function(length) {
  if (this.index !== undefined) {
    return this.content.substr(this.index, length);
  }
  return '';
};

Parser.prototype.substrs = function(length) {
  if (this.index !== undefined) {
    this.content.substr(this.index, length)
    delete this.index
  }
  return this;
};

Parser.prototype.substring = function(indexEnd) {
  if (this.index !== undefined) {
    return this.content.substring(this.index, indexEnd);
  }
  return '';
};

Parser.prototype.substrings = function(indexEnd) {
  if (this.index !== undefined) {
    this.content.substring(this.index, indexEnd);
    delete this.index
  }
  return this;
};

Parser.prototype.replace = function() {
  return String.prototype.replace.apply(this.content, arguments)
};

Parser.prototype.replaces = function() {
  this.content = String.prototype.replace.apply(this.content, arguments)
  return this;
};

Parser.prototype.split = function(separator, fn) {
  var re = getRegExp(separator);
  if (re === null)  return String.prototype.split.apply(this.content, arguments);

  var index = 0, results = [];
  if (typeof fn !== 'function') fn = function () { return true };

  do {
    var match = re.exec(this.content);
    if (!match) {
      if (index !== this.content.length)
        results.push(this.content.slice(index));
      break;
    }

    var before = this.content.slice(index, match.index);
    var selector = fn(before, match[0], match.index);
    switch(typeof selector) {
      case 'boolean':
        if (!!selector) results.push(before);
        break;
      case 'undefined': break;
      case 'object':
        if (selector === null) break;
        // else push the selector to results
      default:
        results.push(selector);
    }
    index = match.index + match[0].length;
  } while (true);

  return results;
};

Parser.prototype.splits = function(separator, fn) {
  return map2Parser(this.split(separator, fn));
};

// Parser.prototype.forEach = function() {
  // TODO no split match
// };

// Parser.prototype.repeat = function() {
  // TODO
// };

Parser.prototype.equal = function(str) {
  return this.content === str;
};

Parser.prototype.isInt = function() {
  return /^\d+$/.test(this.content);
};

Parser.prototype.isFloat = function() {
  return /^\d+\.(\d+)?$/.test(this.content);
};

// Parser.prototype.startsWith = function() {
  // TODO
// };

// Parser.prototype.endsWith = function() {
  // TODO
// };

/*
 * '123456789000' => '123,456,789,000'
 */
Parser.prototype.toMoneyStr = function() {
  return this.content.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
};

/*
 * '123456789000' => '123,456,789,000'
 */
Parser.prototype.toMoneyStrs = function() {
  this.content = this.content.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  return this;
};

Parser.prototype.toJson = function() {
  return JSON.parse(this.content);
};

Parser.prototype.parseUrl = function() {
  return utils.parseUrl(this.content);
};

Parser.prototype.parseQuery = function() {
  return utils.parseQuery(this.content);
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

function map2Parser (arr) {
  // TODO check if array
  return arr.map(function (item) {
    return new Parser(item)
  })
}

function getRegExp(str) {
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

function getGlobalRegExp(str) {
  var re = getRegExp(str);
  if (!re) throw new Error('Invalid RegExp: ' + str);

  if (re.global) {
    return re;
  }
  var flags = 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return new RegExp(re.source, flags)
}

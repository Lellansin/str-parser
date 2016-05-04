'use strict';

exports.get = function (self, str, def) {
  var index = def;
  switch(typeof str) {
    case 'number':
      index = str;
      break;
    case 'string':
      index = self.content.indexOf(str);
      break;
    case 'object':
      if (str.constructor == RegExp)
        index = self.content.search(str);
      break;
  }
  return index;
};

exports.getAfter = function (self, str, def) {
  var index = def;
  switch(typeof str) {
    case 'string':
      index = self.content.indexOf(str) + str.length;
      break;
    case 'object':
      if (str.constructor == RegExp) {
        var res = str.exec(self.content);
        if (res) index = res.index + res[0].length;
      }
      break;
  }
  return index;
};

exports.getNextPos = function (self, str) {
  var re = null, lastStart, lastEnd;
  switch(typeof str) {
    case 'string':
      re = new RegExp(str, 'g');
      break;
    case 'object':
      re = getGlobalRegExp(str);
      break;
  }

  if (!re) throw new Error('Invalid RegExp: ' + str);

  return function() {
    var res = re.exec(self.content);
    if (res) {
      lastStart = res.index;
      lastEnd = res.index + res[0].length;
      return { done: false, value: lastStart, start: lastStart, end: lastEnd }; 
    }
    return { done: true, start: lastStart, end: lastEnd }
  }
};

exports.getLastPos = function (self, str)  {
  return lastPosGen(self, str).start;
}

exports.getLastPosAfter = function (self, str)  {
  return lastPosGen(self, str).end;
}

var lastPosGen = function (self, str) {
  var gen = exports.getNextPos(self, str);
  do {
    var res = gen();
    if (res.done) {
      return res;
    }
  } while(true);
};

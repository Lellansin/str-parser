var util = require('util')

var MyString = function(str) {
  this.value = new String(str).toString();
};

util.inherits(MyString, String);

MyString.prototype.valueOf = function() {
  return this.value;
};

MyString.prototype.toString = function() {
  return this.value;
};

var s = new MyString('hello world')
var t = s

console.log(s)
console.log(s.toString())
console.log(s.trim())
console.log(s.split(' '))
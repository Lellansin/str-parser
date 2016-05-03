# str-parser

String parser for node.js.

Foucs on regular expression, for more simple regexp writting.


## Installation

```
npm install --save str-parser
```

# Quickly Start

```javascript
var _s = require('str-parser');

var str1 = '<a href="http://lellansin.com"></a>';
console.log(_s(str1).get(/href="([\w\W]+?)"/));
// [ 'href="http://lellansin.com"', 'http://lellansin.com' ]

var str2 = '<a></a>';
console.log(_s(str2).get(/href="([\w\W]+?)"/));
// [ ]

var str3 = 'Alan Bob Cici';
console.log(_s(str3).map(/\w+/g, (value) => value));
// ['Alan', 'Bob', 'Cici']
```

# Doc

## Get

Directly *get* the regex match part.

```javascript
var _s = require('str-parser');

var str1 = '<a href="http://lellansin.com"></a>';
console.log(_s(str1).get(/href="([\w\W]+?)"/, 1));
// 'http://lellansin.com'
```

If the api end with 's', it means the result is wraped by str-parser.


## Map

```javascript
var _s = require('str-parser');

var html = '...' +
  '<a href="http://google.com">Google</a> ...' +
  '<a href="http://lellansin.com">My blog</a> ...' +
  '<a href="http://facebook.com">FaceBook</a> ...';

console.log(_s(html).map(/href=\"[\w\W]+?\"/g));
/*
[ 'href="http://google.com"',
  'href="http://lellansin.com"',
  'href="http://facebook.com"' ]
*/
```

$ capture

```javascript
var html = '...' +
  '<a href="http://google.com">Google</a> ...' +
  '<a href="http://lellansin.com">My blog</a> ...' +
  '<a href="http://facebook.com">FaceBook</a> ...';

console.log(_s(html).map(/href=\"([\w\W]+?)\"/g, (_, $1) => $1));
/*
[ 'http://google.com',
  'http://lellansin.com',
  'http://facebook.com' ]
*/
```

## Reduce

```javascript
var _s = require('..')

console.log(_s('1a2b3c4d5e').reduce(/[a-z]/g, (a, b) => a + ',' + b))
// a,b,c,d,e
```

$ capture is not support for reduce, pls use map + original array reduce:

```javascript
var _s = require('..')

var html = '...' +
  '<a href="http://google.com">Google</a> ...' +
  '<a href="http://lellansin.com">My blog</a> ...' +
  '<a href="http://facebook.com">FaceBook</a> ...';

console.log(_s(html)
    .map(/\>([\w\W]+?)\<\/a\>/g, (_, $1) => $1)
    .reduce((a, b) => a + ', ' + b))
// Google, My blog, FaceBook
```

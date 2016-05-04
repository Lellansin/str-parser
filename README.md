# str-parser [![Build Status](https://travis-ci.org/Lellansin/str-parser.png?branch=master)](https://travis-ci.org/Lellansin/str-parser) [![Coveralls Status](https://img.shields.io/coveralls/Lellansin/str-parser/master.svg)](https://coveralls.io/github/Lellansin/str-parser)

A string parser for node.js. Foucs on string operating, and more simplely regular expression writting.

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

* `.get` - directly match.
* `Cursor` - get index for slice.
* `Slice` - easily slice by cursor.
* `.map` - map for regex results.
* `.reduce` - reduce for regex results.
* `.filter` - filter for regex results.
* `.split` - more powerful split method.

## get( expr [, n] )

Directly *get* the regex match part.

__Arguments__

* `expr` - RegExp object.
* `n` - directly return $n captue value string.

__Example__

```javascript
var _s = require('str-parser');

var str1 = '<a href="http://lellansin.com"></a>';
console.log(_s(str1).get(/href="([\w\W]+?)"/, 1));
// 'http://lellansin.com'
```

If the api end with 's', it means the result is still wraped by str-parser.

```javascript
var _s = require('str-parser');

var str1 = '<a href="http://lellansin.com"></a>';
console.log(
  _s(str1)
    .gets(/href="([\w\W]+?)"/, 1)
    .find('lellansin')
    .sliceTo(-1)
);
// 'lellansin.co'
```

## Cursor

* find
* indexOf
* rfind
* lastIndexOf

Cursor method will return str-parser object defaultly.

## Slice

Slice with cursor.

```javascript
var _s = require('..');

console.log(
  _s('hello world')
    .find('w')
    .sliceTo()
);
// world

console.log(
  _s('hello world')
    .find('w')
    .sliceTo(-1)
);
// worl

console.log(
  _s('hello world')
    .find(' ')
    .sliceFrom()
);
// hello

console.log(
  _s('hello world')
    .rfind('o')
    .sliceFrom(1)
);
// ello w
```

## map( expr[, iteratee ] )

__Arguments__

* `expr` - RegExp object.
* `iteratee(match, [ $1, $2, ..., ] offset, string)` - A function to apply to each RegExp match string.

__Example__

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

__Related__

* maps(expr, [iteratee])

---------------------------------------


## reduce( expr[, iteratee ] )

__Arguments__

* `expr` - RegExp object.
* `iteratee(previousValue, currentValue, currentIndex, matchList)` - A function to apply to reduce each RegExp match string.

__Example__

```javascript
var _s = require('..')

console.log(_s('1a2b3c4d5e').reduce(/[a-z]/g, (a, b) => a + ',' + b))
// a,b,c,d,e
```

$ capture is not support for .reduce, only for .map, pls use .map + original array reduce:

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

__Related__

* reduces(expr, [iteratee])

---------------------------------------


## filter( expr[, iteratee ] )

__Arguments__

* `expr` - RegExp object.
* `iteratee(match)` - A function to apply to filter each RegExp match string.

__Example__

```javascript
var _s = require('..')

var str = '12 1 5 6 18 101 22';
console.log(
  _s(str).filter(/\d+/g, (num) => num.length == 2)
)
// [ '12', '18', '22' ]
```

__Related__

* filters(expr, [iteratee])

---------------------------------------


## split( expr[, iteratee ] )

__Arguments__

* `expr` - RegExp object.
* `iteratee(match, separator, offset)` - A function to apply to each RegExp match string. if you return `boolean`, it's just like `.filter` for result list; if you return `null`/`undefined`, it means you abandon current match (won't come in your result list).

__Example__

```javascript
var _s = require('..')

var str = 'Wed May 04 2016 12:45:03 GMT+0800 (CST)';
console.log(
  _s(str).split(/(\ |\:|\+)/g)
)
// [ 'Wed', 'May', '04', '2016', '12', '45', '03', 'GMT', '0800', '(CST)' ]

var str = 'Line one texts ...\n' +
  'Line two\r' +
  'Line three texts ...\r\n' +
  'Line four ...\n';
console.log(
  _s(str).split(/\r\n|\n|\r/g, (match) => match.toUpperCase())
)
/*
[ 'LINE ONE TEXTS ...',
  'LINE TWO',
  'LINE THREE TEXTS ...',
  'LINE FOUR ...' ]
*/

var str = '12,123,456,789';
console.log(
  _s(str).split(/,\d{3}/g, (match, separator, index) => index)
)
// [ 2, 6, 10 ]
```

__Related__

* splits(expr, [iteratee])

---------------------------------------



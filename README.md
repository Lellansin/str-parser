# str-parser

String parser for node.js.

# Installation

```
npm install --save str-parser
```

# Quickly Start

```javascript
var _s = require('str-parser');

console.log(
  _s('<a href="http://lellansin.com"></a>')
    .get(/href="([\w\W]+?)"/)); // [ 'href="http://lellansin.com"', 'http://lellansin.com' ]
  

console.log(
  _s('<a></a>')
    .get(/href="([\w\W]+?)"/)); // [ ]

console.log(
  _s('Alan Bob Cici')
    .map(/\w+/g, function(value) {
    return value
  })); // ['Alan', 'Bob', 'Cici']
```


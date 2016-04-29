# str-parser

String parser for node.js.

# Installation

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


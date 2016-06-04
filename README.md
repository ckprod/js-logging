#js-logging

[![NPM version](http://img.shields.io/npm/v/js-logging.svg)](https://www.npmjs.org/package/js-logging)
![](https://img.shields.io/badge/dependencies-none-brightgreen.svg)
[![Build Status](https://travis-ci.org/irhc/js-logging.svg?branch=master)](https://travis-ci.org/irhc/js-logging)

A powerful, feature rich and customizable logging library for node.js and any browser with a console. 

This library is based on baryon's node.js logging library [tracer](https://github.com/baryon/tracer). It has no dependencies, predefined settings and its default log levels are
compliant with RFC 5424.

###Examples

See [here](http://irhc.github.io/js-logging) for some js-logging outputs in the console of your browser. It should be similar to

![](https://raw.github.com/irhc/js-logging/master/browser.png)

On the server side (e.g. nodejs) an example looks like this

![](https://raw.github.com/irhc/js-logging/master/console.png)


###Node.js Example

```html
npm install js-logging
```
```javascript
// use predefined console logger (function console) with standard settings 
let logger1 = require('js-logging').console();
logger1.debug('Hello World!');

// define own logger with standard settings
let Logging = require('js-logging');
let logger2 = new Logging();
logger2.debug('Hello World!');
```
Current version should work with Node.js version 4.0 and above.

###Browser Example

```javascript
<script src='js-logging.browser.js'></script>
<script>
	// use predefined color console logger (function colorConsole) with standard settings 
	let logger1 = Logging.colorConsole();
	logger1.debug('Hello World!');

	// define own logger with standard settings
	let logger2 = new Logging();
	logger2.debug('Hello World!');
<script>
```
Color version works with chrome and firefox, at least.

###Features

- print log messages with timstamp, file name, method name, line number, path or call stack
- simple color support for node.js
- individual color support for chrome and firefox
- customized date/timestamp format and output format
- supports user-defined logging levels
- add easily any transport
- support filter functions
- no dependency
- predefined settings
- production ready with minimal performance overhead
- es6 module

###Usage node.js
One can define a new object of the Logging class
```javascript
let Logging = require('js-logging');
let logger = new Logging([options]);
logger.debug('Hello World!');
```
or can use a predefined function
1) console
```javascript
// the predefined function generates a new object of the Logging class with standard settings
let logger = require('js-logging').console([options]);
logger.debug('Hello World!');
```

2) colorConsole
```javascript
// the predefined function generates a new object of the Logging class with color settings by the use of the option filters
let logger = require('js-logging').colorConsole([options]);
logger.debug('Hello World!');
// equivalent to
let conf = {
	filters: {
    	debug: 'white',
        info: 'yellow',
        notice: 'green',
        warning: 'blue',
        error: 'red',
        critical: 'red',
        alert: 'cyan',
        emergency: 'magenta'
    }
};
let logger = require('js-logging').console(conf);
logger.debug('Hello World!');
// or
let Logging = require('js-logging');
let logger = new Logging(conf);
logger.debug('Hello World!');
```

3) dailyFile
```javascript
// the predefined function generates a new object of the Logging class with file transport, rotating daily.
let logger = require('../js-logging.umd.js').dailyFile([options]);
logger.debug('Hello World!'); 
```

###Usage browser

###Options
The following options can be set by the use of the Logging class or any predefined function (console, colorConsole, dailyFile)
```javascript
let defaultOptions = {
    format: "${timestamp} <${title}> ${file}:${line} ${method} ${message}",
    dateformat: "isoDateTime",
    preprocess: function (data) {
    },
    transport: function (data) {
        console.log(data.output);
    },
	
    filters: [],
	
	// set the initial level, no transports are set for levels below the initial settings for performance reasons 
	// the level can be changed later on, but there is no log output if there are no transports set initially
    level: 'debug',
	
	// the default levels according to RFC 5424, but you can set your own, e.g. ['log', 'info', 'error']
    methods: ['debug', 'info', 'notice', 'warning', 'error', 'critical', 'alert', 'emergency'],
	
	// get the specified index of stack as file information
    stackIndex: 0  
};
```

There are additional options, if one uses the predefined function dailyFile
```javascript
let defaultOptions = {
	// with the options path, filename, filenameDateFormat and pathFormat one can control the filename and
	// and its containing directory
	// with the use of filenameDateFormat one can control the rotation period of new log files
	// e.g. the format yyyymmdd will generate every day a new file, the format yyyymmdd_HH will generate
	// every hour a new file and so on.
    path: '.',
    filename: 'js-logging',
    filenameDateFormat: 'yyyymmdd',
    pathFormat: '${path}/${filename}${filenameDateFormat}.log',
	
	// set the line ending deliminater for all logging messages
    lineEnding: '\r\n'
}
```
###Examples


###Supported browsers

- Internet Explorer 8 and newer
- Opera
- Chrome
- Firefox
- Safari 5.1.7 (and highly possible newer)

###References

This small javascript component uses or is based on other javascript projects and code snippets:

- [tracer](https://github.com/baryon/tracer)
- [dateformat](http://blog.stevenlevithan.com/archives/date-time-format) and the npm package [dateformat-light ](https://www.npmjs.com/package/dateformat-light)

### Licence

MIT





### Simple Console

```javascript
var logger = require('tracer').console();

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

$ node example/console.js
2012-03-02T13:35:22.83Z <log> console.js:3 (Object.<anonymous>) hello
2012-03-02T13:35:22.85Z <trace> console.js:4 (Object.<anonymous>) hello world
2012-03-02T13:35:22.85Z <debug> console.js:5 (Object.<anonymous>) hello world 123
2012-03-02T13:35:22.85Z <info> console.js:6 (Object.<anonymous>) hello world 123 { foo: 'bar' }
2012-03-02T13:35:22.85Z <warn> console.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"}
2012-03-02T13:35:22.85Z <error> console.js:8 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }
```

### Color Console
```javascript
var logger = require('tracer').colorConsole();

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
```

### Daily Log
```javascript
var logger = require('tracer').dailyfile({root:'.', maxLogFiles: 10});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
```

> dailylog will output all types log to diff files every day like log4j

Advanced Example
---------------
some helper package is need, so install -dev for running examples

```javascript
npm install -dev tracer
```


Take a look at the examples directory for different examples.

### Set logging level

the level option support index (number) or method name.


```javascript
var logger = require('tracer').console({level:'warn'});
```
equal

```javascript
var logger = require('tracer').console({level:4});
```


```javascript
var logger = require('tracer').console({level:'warn'});
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

//$ node example/level.js
//2012-03-02T13:41:33.29Z <warn> level.js:6 (Object.<anonymous>) hello world 123 {"foo":"bar"}
//2012-03-02T13:41:33.30Z <error> level.js:7 (Object.<anonymous>) hello world 123 {"foo":"bar"} [ 1, 2, 3, 4 ] function Object() { [native code] }

//log,trace, debug and info level was not ouputed

```



### Customize output format
format tag:

*  timestamp: current time
*  title: method name, default is 'log', 'trace', 'debug', 'info', 'warn', 'error'
*  level: method level, default is 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5
*  message: printf message, support %s string, %d number, %j JSON and auto inspect
*  file: file name
*  line: line number
*  pos: position
*  path: file's path
*  method: method name of caller
*  stack: call stack message

we use tinytim micro-template system to output log.  see details [tinytim](https://github.com/baryon/node-tinytim).
and, we use [Date Format](http://blog.stevenlevithan.com/archives/date-time-format) to format datetime.



```javascript
var logger = require('tracer').console(
				{
					format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
					dateformat : "HH:MM:ss.L"
				});

```


Or, you can set special format for output method

```javascript
var logger = require('tracer')
		.colorConsole(
				{
					format : [
					          "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
					          {
					        	  error : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
					          }
					],
					dateformat : "HH:MM:ss.L",
					preprocess :  function(data){
						data.title = data.title.toUpperCase();
					}
				});
```

the preprocess method is a choice for changing tag.



### Customize output methods

```javascript
var colors = require('colors');

var logger = require('tracer').colorConsole({
	level : 'log1',
	methods : [ 'log0', 'log1', 'log2', 'log3', 'log4', 'log5' ],
	filters : [colors.underline, colors.yellow],

});
logger.log0('hello');
logger.log1('hello', 'world');
logger.log2('hello %s', 'world', 123);
logger.log4('hello %s %d', 'world', 123);
logger.log5('hello %s %d', 'world', 123);
```



### Customize filters

each filtes function was called. the function is synchronous and must be like

```javascript
function f1(str) {
	return str.toUpperCase();
}
```

About [Colors.js](https://github.com/Marak/colors.js)

```javascript
var colors = require('colors');
var logger = require('tracer').colorConsole({
	filters : [
	           f1, colors.underline, colors.blue, //default filter
	           //the last item can be custom filter. here is "warn" and "error" filter
	           {
	        	   warn : colors.yellow,
	        	   error : [f1, colors.red, colors.bold ]
	           }
	]
});

```

the filter support key-function pair, example: [color_console.js](https://github.com/baryon/tracer/blob/master/lib/color_console.js)

```javascript
{
		filters : {
			//log : colors.black,
			trace : colors.magenta,
			debug : colors.blue,
			info : colors.green,
			warn : colors.yellow,
			error : [ colors.red, colors.bold ]
		}
}
```

and the filters is an array, the last item can be custom filter. see example:[filter.js](https://github.com/baryon/tracer/blob/master/example/filter.js)

### Log File Transport
```javascript
var fs = require('fs');

var logger = require('tracer').console({
	transport : function(data) {
		console.log(data.output);
		fs.appendFile('./file.log', data.output + '\n', (err) => {
			if (err) throw err;
		});
	}
});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo : 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo : 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo : 'bar'}, [ 1, 2, 3, 4 ], Object);

```

### Stream Transport
```javascript
var fs = require('fs');

var logger = require('tracer').console({
		transport : function(data) {
			console.log(data.output);
			var stream = fs.createWriteStream("./stream.log", {
			    flags: "a",
			    encoding: "utf8",
			    mode: 0666
			}).write(data.output+"\n");
		}
});

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

```

### MongoDB Transport
```javascript
var mongo = require('mongoskin');
var db = mongo.db("127.0.0.1:27017/test?auto_reconnect");

var log_conf = {
		transport : function(data) {
			console.log(data.output);
			var loginfo = db.collection("loginfo");
			loginfo.insert( data, function(err, log) {
				if (err) {
					console.error(err);
				}
			});
		}
}

var logger = require('tracer').console(log_conf);

logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

console.log('\n\n\npress ctrl-c to exit');

```

### Defining Multiple Transport
```JavaScript
var fs = require('fs');
var logger = require('tracer').console({
	transport: [
		function (data) {
			fs.appendFile('./file.log', data.output + '\n', (err) => {
				if (err) throw err;
			});
		},
		function(data) {
			console.log(data.output);
		}
	]
});
logger.log('hello');
logger.trace('hello', 'world');
logger.debug('hello %s', 'world', 123);
logger.info('hello %s %d', 'world', 123, {foo: 'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo: 'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo: 'bar'}, [1, 2, 3, 4], Object);
```


### Define your logging helper

the work is like [color_console.js](https://github.com/baryon/tracer/blob/master/lib/color_console.js)

```javascript
var colors = require('colors');
module.exports = function(conf) {
	return require('./console')({
		filters : {
			//log : colors.black,
			trace : colors.magenta,
			debug : colors.blue,
			info : colors.green,
			warn : colors.yellow,
			error : [ colors.red, colors.bold ]
		}
	}, conf);
};
```

### Customize output Object's properties

```javascript
var obj =  {Request:
   [ { IsValid: [ 'True' ],
       ItemSearchRequest:
        [ { ResponseGroup: [ 'Small', 'OfferSummary' ],
            Sort: [ 'salesrank' ],
            SearchIndex: [ 'DVD']
          }
        ]
     } ] };

var logger = require('tracer').console({
		inspectOpt: {
			showHidden : true, //the object's non-enumerable properties will be shown too
			depth : null //tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.
		}
	});
logger.log(obj);

//
// 2013-09-30T04:30:44.927Z <log> depth.js:26 (Object.<anonymous>) { Request:
//    [ { IsValid: [ 'True', [length]: 1 ],
//        ItemSearchRequest:
//         [ { ResponseGroup: [ 'Small', 'OfferSummary', [length]: 2 ],
//             Sort: [ 'salesrank', [length]: 1 ],
//             SearchIndex: [ 'DVD', [length]: 1 ] },
//           [length]: 1 ] },
//      [length]: 1 ] }

```

### Specify the stack index for file info

Fix `file`, `path`, and `line` info width `stackIndex`.
It is userful for development package.

```javascript

var logger = require('tracer').console({
		stackIndex : 0 // default 0
	});
var logger2 = require('tracer').console({
		stackIndex : 1
	});
var logMgr = function(type, msg) {
		return logger[type](msg);
	};
var logMgr2 = function(type, msg) {
		return logger2[type](msg);
	};

logger.log('hello'); // the line info is right
logger2.log('hello'); // the line info is error
logMgr('log', 'hello'); // the line info is error
logMgr2('log', 'hello'); // the line info is right

```

### setLevel and close


setLevel and close methods to dynamically change the log level.
these are global settings, affect all output that are created via tracer

```javascript
var tracer = require('tracer');
tracer.setLevel(2); //or tracer.setLevel('debug');
//... ...
tracer.close();

```

notice:
if you set level in initialize, you can't change more lower level than the initial level.

```javascript
var tracer = require('tracer');
var logger = tracer.console({level:'warn'});

logger.log('hello'); //nothing output

tracer.setLevel(0); //dont work.
logger.log('hello'); //nothing output

tracer.setLevel('error'); //it works.
logger.warn('hello'); //nothing output

logger.error('hello'); //'hello'


```



Read examples please. [setLevel.js](https://github.com/baryon/tracer/blob/master/example/setLevel.js)



## History

### 0.8.3
* fixed: Got extra data in the log file. #45 thanks @JohnSmithDr 
* merged: Add Strict mode and EsLint from @HakmiSofian 
* merged: Change the log to file example to using `fs.appendFile()` instead.  from @twang2218  
* merged: Enable use of tracer in strict mode from @madarche  
* merged: Added getter for log level from @ColRad 
* tested on node.js 4/5  

### 0.8.2
* added: Defining a field for max file days filea. #35 thanks @AmitThakkar


### 0.8.1
* added: Adding support for Multiple Transports. #36 thanks @AmitThakkar
* fixed: dailyfile auto create folder #37. thanks @klesh

### 0.8.0
* added: setLevel method to dynamically change the log level. thanks @madarche, #30
* added: close method to end all of the writable streams. thanks @loht, #31

### 0.7.4
* fixed: use the lastest package of colors v1.0.3.
* fixed: removed filter's second parameter

### 0.7.3
* restored: use colors package replace cli-color, because some bugs and a lot of dependencies in cli-color. ref colorConsole2.js example.

### 0.7.2

* fixed: change log dateformat from UTC to LOCAL iso format (Suggest by @felixhao28)
* fixed: change color package from colors to cli-color (Suggest by @jeffreydwalter)

### 0.7.1

* added: format add `%j` placeholder (Thanks @Bacra)
* added: add stackIndex opt to specify the index of stack (Thanks @Bacra)

### 0.7.0

* fixed: change inspect format, using new format of node.js 0.10. (Thanks @Bacra)
* fixed: now support node.js 0.10 and above, NO Support 0.8 and 0.6

### 0.6.2

* fixed: change stack from array to string, and fixed example2.js

### 0.6.1

* fixed: get the filename correctly on windows. thanks Tom Carchrae
* added: added missing repository field. thanks @madarche

### 0.6.0

* feature: add showHidden and depth option for showing object's properties.

### 0.5.1

* feature: add args into data object, now we can check args in preprocess, see example format2.js, merge from yasuyk04/work

### 0.5.0

* performance: speed up when the format don't include method,path,line,pos,file, thanks sharonjl's issue report

### 0.4.2

* fixed: debug color from blue to cyan

### 0.4.1

* fixed: default timestamp is ISO UTC format.

### 0.4.0

* feature: support dailyfile method, added some examples
* feature: add preprocess custom method for changing  tags before format

### 0.3.5

* fixed bug: can't get method/line number in express

### 0.3.4

* use [tinytim package](https://github.com/baryon/node-tinytim)

### 0.3.3

* spell missing (transpot->transport)

### 0.3.2

* speed-up for _log function
* add some test codes

### 0.3.1

* minor-fix for call stack

### 0.3.0

* support custom format and filter for special method

### 0.2.1

* fix spell missing

### 0.2.0

* Add more examples.
* Default methods is log, trace, debug, info, warn, error.
* Support 'string' level, {level:'warn'} equal {level:4}

### 0.1.0

* Initial Tracer implementation.

## License

(The MIT License)

Copyright (c) 2012 LI Long  &lt;lilong@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
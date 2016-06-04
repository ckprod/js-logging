'use strict';

function f1(str) {
	return str.toUpperCase();
}

let tracerLight = require('../js-logging.umd.js');
let logger = new tracerLight({
	filters : [
	           f1, 'blue', //default filter
	           //the last item can be custom filter. here is "warn" and "error" filter
	           {
	        	   warning : 'yellow',
	        	   error : [f1, 'red' ]
	           }
	]
});

logger.debug('Hello World!');
logger.info('Hello World!');
logger.notice('Hello World!');
logger.warning('Hello World!');
logger.error('Hello World!');
logger.critical('Hello World!');
logger.alert('Hello World!');
logger.emergency('Hello World!');
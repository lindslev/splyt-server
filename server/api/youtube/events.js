var EventEmitter = require('events').EventEmitter;
process.setMaxListeners(0);
module.exports = new EventEmitter();

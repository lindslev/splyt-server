/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Youtube = require('./youtube.model');
var eventMachine = require('./events')

exports.register = function(socket) {
  eventMachine.on('updatePlayer', function(data){
    socket.emit('updatePlayer', data);
  })
}

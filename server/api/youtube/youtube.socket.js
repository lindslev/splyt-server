/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Youtube = require('./youtube.model');
var eventMachine = require('./events')
eventMachine.setMaxListeners(0)

exports.register = function(socket) {
  eventMachine.on('updatePlayer', function(data){
    console.log('** ~~ ABOUT TO SOCKET EMIT updatePlayer ~~ **')
    socket.emit('updatePlayer', data);
  })
}

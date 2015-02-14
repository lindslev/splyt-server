/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var User = require('./user.model');
var eventMachine = require('./userEvents')

exports.register = function(socket) {
  eventMachine.on('newSong', function(data) {
    socket.emit('newSong', data)
  })
}

/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Song = require('./song.model');

exports.register = function(socket) {
  Song.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Song.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('song:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('song:remove', doc);
}
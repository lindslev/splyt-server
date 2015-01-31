/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Youtube = require('./youtube.model');

exports.register = function(socket) {
  Youtube.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Youtube.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('youtube:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('youtube:remove', doc);
}
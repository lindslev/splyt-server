'use strict';

var _ = require('lodash');
var Playlist = require('./playlist.model');
var User = require('../user/user.model')

// Get list of playlists
exports.index = function(req, res) {
  Playlist.find(function (err, playlists) {
    if(err) { return handleError(res, err); }
    return res.json(200, playlists);
  });
};

// Get a single playlist
exports.show = function(req, res) {
  Playlist.findById(req.params.id).populate('songs').exec(function (err, playlist) {
    if(err) { return handleError(res, err); }
    if(!playlist) { return res.send(404); }
    console.log('controller playlist with songs', playlist);
    return res.json(playlist);
  });
};

// Creates a new playlist in the DB.
exports.create = function(req, res) {
  var userid = req.params.id;
  console.log('req.body', req.body);
  Playlist.create(req.body, function(err, playlist) {
    if(err) { return handleError(res, err); }
    User.savePlaylist(userid, playlist, function(err, data){
      console.log('sending to User', data);
    })
    return res.json(201, playlist);
  });
};

// Updates an existing playlist in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) { return handleError(res, err); }
    if(!playlist) { return res.send(404); }
    var updated = _.merge(playlist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, playlist);
    });
  });
};

// Deletes a playlist from the DB.
exports.destroy = function(req, res) {
  Playlist.findById(req.params.id, function (err, playlist) {
    if(err) { return handleError(res, err); }
    if(!playlist) { return res.send(404); }
    playlist.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
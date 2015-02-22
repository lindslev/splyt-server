'use strict';

var _ = require('lodash');
var Playlist = require('./playlist.model');
var User = require('../user/user.model')
var Song = require('../song/song.model');

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
    Song.populate(playlist.songs,'addedUser', function(err, data){
      if(err) { return handleError(res, err); }
      playlist.songs = data;
      return res.json(playlist);
    })
  });
};

//Get Default Player
exports.getDefault = function(req, res) {
  var id = req.params.id;
  User.findById(id).populate('playlist').exec(function(err, data) {
    _.findWhere(data,{'aggregate_stream' : true }, function(err, playlist) {
      return res.json(playlist);
    })
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

exports.addSong = function(req, res) {
  var playlistid = req.params.id;
  var songid = req.params.songid;
  Song.findById(songid, function(err, song) {
    Playlist.findByIdAndUpdate(playlistid,
      { $push: {'songs': song }},
      { safe: true, upsert: true },
      function (err, data) {
        return res.json(201, data);
      }
    );
  });
};

// updates re-ordered player
exports.updateOrder = function(req, res) {
  var id = req.params.id;
  var playlist = req.body;
  Playlist.updateOrder(id, playlist, function(err, data) {

    return res.json(200, data);
  });
}

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
// Remove Song from a playlist from the DB.
exports.removeSongfromPlaylist = function(req, res) {
    Playlist.removeSong(req.params.id, req.params.songid, function(err, song){
      res.json(200, song);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}

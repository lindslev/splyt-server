'use strict';

var _ = require('lodash');
var Song = require('./song.model');

// Get list of songs
exports.index = function(req, res) {
  Song.find(function (err, songs) {
    if(err) { return handleError(res, err); }
    return res.json(200, songs);
  });
};

// Get a single song
exports.show = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    return res.json(song);
  });
};

// exports.createYoutube = function(req) {
//   if (req.body.song.args.info.items[0].snippet.categoryId == "10") {
//     Song.create({
//       id: req.body.song.args.info.items[0].id,
//       title: req.body.song.args.info.items[0].snippet.title.split('-')[1],
//       artist: req.body.song.args.info.items[0].snippet.title.split('-')[0],
//       link: req.body.song.args.song.permalink_url,
//       source: 'YouTube'
//     }), function(err, song) {
//       if(err) { return handleError(res,err); }
//       return res.json(201, song);
//     }
//   } else {
//     console.log('category is not a song match');
//   }
// }

// Creates a new song in the DB.
exports.create = function(req, res) {
  Song.create(req.body, function(err, song) {
    if(err) { return handleError(res, err); }
    return res.json(201, song);
  });
};

// Updates an existing song in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Song.findById(req.params.id, function (err, song) {
    if (err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    var updated = _.merge(song, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, song);
    });
  });
};

// Deletes a song from the DB.
exports.destroy = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    song.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

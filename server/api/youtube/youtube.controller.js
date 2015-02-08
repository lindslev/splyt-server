'use strict';

var _ = require('lodash');
var Youtube = require('./youtube.model');
var request = require('request');
var youtubeStream = require('youtube-audio-stream');

// Make api call to youtube for video info
exports.getYouTube = function(req, res) {
  request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + req.params.id + '&key=AIzaSyC_eZm_iimb5fx5So3Bt4h96ZuKQqd7ARU',
    function(err, response, body){
      if(err) return handleError(res, err)
      res.json(body);
    })
}

// Uses youtube-audio-stream for player
exports.getStream = function(req, res) {

  var requestUrl = 'http://youtube.com/watch?v=' + req.params.id;

  try {
    youtubeStream(requestUrl).pipe(res);
  } catch(exception) {
    res.status(500).send(exception);
  }

};

// Get list of youtubes
exports.index = function(req, res) {
  Youtube.find(function (err, youtubes) {
    if(err) { return handleError(res, err); }
    return res.json(200, youtubes);
  });
};

// Get a single youtube
exports.show = function(req, res) {
  Youtube.findById(req.params.id, function (err, youtube) {
    if(err) { return handleError(res, err); }
    if(!youtube) { return res.send(404); }
    return res.json(youtube);
  });
};

// Creates a new youtube in the DB.
exports.create = function(req, res) {
  Youtube.create(req.body, function(err, youtube) {
    if(err) { return handleError(res, err); }
    return res.json(201, youtube);
  });
};

// Updates an existing youtube in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Youtube.findById(req.params.id, function (err, youtube) {
    if (err) { return handleError(res, err); }
    if(!youtube) { return res.send(404); }
    var updated = _.merge(youtube, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, youtube);
    });
  });
};

// Deletes a youtube from the DB.
exports.destroy = function(req, res) {
  Youtube.findById(req.params.id, function (err, youtube) {
    if(err) { return handleError(res, err); }
    if(!youtube) { return res.send(404); }
    youtube.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

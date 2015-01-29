'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  title: String,
  artist: String,
  link: String,
  source: String
});

module.exports = mongoose.model('Song', SongSchema);
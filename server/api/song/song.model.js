'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  title: { type: String, required: true },
  artist: String,
  link: {type: String, required: true },
  source: {type: String, required: true }
});

module.exports = mongoose.model('Song', SongSchema);

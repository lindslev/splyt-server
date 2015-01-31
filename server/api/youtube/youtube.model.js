'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var YoutubeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Youtube', YoutubeSchema);
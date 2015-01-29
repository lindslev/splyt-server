'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  songs:[{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
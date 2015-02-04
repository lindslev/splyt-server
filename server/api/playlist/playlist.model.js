'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  songs:[{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

PlaylistSchema.statics.addNewSong = function(song, listid, cb) {
  var Playlist = this;

  Playlist.findByIdAndUpdate(listid,
    { $push: { "songs" : song }},
    { safe: true, upsert: true },
    function( err, model ) {
      cb(err, model);
    }
  );
}

module.exports = mongoose.model('Playlist', PlaylistSchema);

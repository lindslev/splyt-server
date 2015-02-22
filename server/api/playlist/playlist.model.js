'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  User = require('../user/user.model');

var PlaylistSchema = new Schema({
    title: {type: String, require: true },
    songs:[{ type: Schema.Types.ObjectId, ref: 'Song' }],
    friend_stream: { type: Boolean, default: false },
    aggregate_stream: {type: Boolean, default: false }
});

PlaylistSchema.statics.addNewSong = function(song, playlist, userid, cb) {
  var Playlist = this;
  Playlist.findByIdAndUpdate(playlist,
    { $push: { "songs" : song }},
    { safe: true, upsert: true },
    function( err, model) {
      if ( playlist.aggregate_stream === false ) {
        User.findById(userid, function(err, user) {
          console.log('user', user);
          _.findWhere(user.playlists, {'aggregate_stream': true }, function(err, playlist) {
            Playlist.findByIdAndUpdate(playlist,
              { $push: {"songs" : song }},
              { safe: true, upsert: true },
              function(err, model) {
                cb(err, model);
              })
          })
        })
      } else {
        cb(err, model);
      }
    }
  );
}

PlaylistSchema.statics.removeSong = function(playlistid, songid, cb){
  this.findByIdAndUpdate(playlistid,
    {$pull:{'songs': songid}},
    function(err, data){
      cb(err, data);
    })
}

Playlist.statics.updateOrder = function(userid, playlist) {
  this.findByIdAndUpdate(playlistid,
    {'songs': playlist }, function(err, new_playlist) {
      cb(err, new_playlist);
    }
}


//HOOKS

PlaylistSchema.pre('remove', function(next){
    this.model('User').update(
        {playlist: this._id},
        {$pull: {playlist: this._id}},
        {multi: true},
        next
    );
});

module.exports = mongoose.model('Playlist', PlaylistSchema);

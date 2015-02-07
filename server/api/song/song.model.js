'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Playlist = require('../playlist/playlist.model'),
    User = require('../user/user.model');

var SongSchema = new Schema({
  tag: {type: String },
  title: { type: String, required: true },
  artist: String,
  link: {type: String, required: true },
  source: {type: String, required: true }
});

//obj for returning song objects in proper format according to song source
var transformations = {
  newYoutubeSong: function(song_obj) {
    if (song_obj.args.info.items[0].snippet.categoryId == "10") {
      return {
        tag: song_obj.args.info.items[0].id,
        title: song_obj.args.info.items[0].snippet.title.split(' - ')[1],
        artist: song_obj.args.info.items[0].snippet.title.split(' - ')[0],
        link: song_obj.args.song.permalink_url,
        source: 'YouTube'
      }
    } else {
      console.log("Youtube category is not music");
    }
  },
   newSCSong: function(song_obj) {
    return {
      tag: song_obj.song.args.song.id,
      title: song_obj.song.args.song.title,
      artist: song_obj.song.args.song.user.username,
      link: song_obj.song.args.song.permalink_url,
      source:'SoundCloud'
    }
  },
   newSpotifySong: function(song_obj) {
    return {
      tag: song_obj.song.args.info.id,
      title: song_obj.song.args.song.title,
      artist: song_obj.song.args.info.artists[0].name,
      link: song_obj.song.args.song.permalink_url,
     source: 'Spotify'
    }
  },
   newTumblrSong: function(song_obj) {
    return {
      title: song_obj.song.args.song.title,
      artist: song_obj.song.args.song.artist,
      link: song_obj.song.args.song.permalink_url,
      source: 'Tumblr'
    }
  }
}

//add songs according to collection
SongSchema.statics.createSong = function(song_obj) {

  var Song = this;
  var song_data = transformations[song_obj.song.action](song_obj.song);
  Song.create(song_data, function(err, data) {
    console.log(data);
    Playlist.addNewSong(data, song_obj.playlist, song_obj.userid, function(err, model) {
      if (err)console.log(err);
    });
  });
}

module.exports = mongoose.model('Song', SongSchema);

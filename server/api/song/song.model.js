'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Playlist = require('../playlist/playlist.model'),
    User = require('../user/user.model');

var SongSchema = new Schema({
  tag: String,
  title: { type: String, required: true },
  artist: String,
  link: { type: String },
  audioSource: { type: String, default: null },
  source: {type: String, required: true },
  addedUser: { type: Schema.Types.ObjectId, ref: 'User' },
  thumbnail: String
});

//obj for returning song objects in proper format according to song source
var transformations = {
  newYoutubeSong: function(song_obj) {
    console.log('songobject', song_obj);
    var title = song_obj.song.args.info.items[0].snippet.title.split(' - ')[1];
    var artist = song_obj.song.args.info.items[0].snippet.title.split(' - ')[0];
    if (title === undefined) {
      title = song_obj.song.args.info.items[0].snippet.title;
      artist = '';
    }
    return {
      tag: song_obj.song.args.info.items[0].id,
      title: title,
      artist: artist,
      link: song_obj.song.args.song.permalink_url,
      source: 'YouTube',
      addedUser: song_obj.userid
    }
  },
   newSCSong: function(song_obj) {
    var audio;
    song_obj.song.args.song.streamable ? audio = song_obj.song.args.song.stream_url : audio = null;
    return {
      tag: song_obj.song.args.song.id,
      title: song_obj.song.args.song.title,
      artist: song_obj.song.args.song.user.username,
      link: song_obj.song.args.song.permalink_url,
      audioSource: audio,
      source:'SoundCloud',
      addedUser: song_obj.userid,
      thumbnail: song_obj.song.args.song.artwork_url
    }
  },
   newSpotifySong: function(song_obj) {
    return {
      tag: song_obj.song.args.info.id,
      title: song_obj.song.args.song.title,
      artist: song_obj.song.args.info.artists[0].name,
      link: song_obj.song.args.song.permalink_url,
      source: 'Spotify',
      addedUser: song_obj.userid
    }
  },
   newTumblrSong: function(song_obj) {
    return {
      title: song_obj.song.args.song.title,
      artist: song_obj.song.args.song.artist,
      link: song_obj.song.args.song.permalink_url,
      audioSource: song_obj.song.args.iframeSrc,
      source: 'Tumblr',
      addedUser: song_obj.userid
    }
  }
}

//add songs according to collection
SongSchema.statics.createSong = function(song_obj, cb) {

  var Song = this;
  if (song_obj.song.tag == undefined) {
    var song_data = transformations[song_obj.song.action](song_obj);
  } else {
    var song_data = song_obj.song;
  }
  Song.create(song_data, function(err, data) {
    Playlist.addNewSong(data, song_obj.playlist, song_obj.userid, function(err, model) {
      cb(err, data);
    });
  });
}

module.exports = mongoose.model('Song', SongSchema);

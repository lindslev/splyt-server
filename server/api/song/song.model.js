'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Playlist = require('../playlist/playlist.model'),
    User = require('../user/user.model');

var SongSchema = new Schema({
  id: {type: String, require: true },
  title: { type: String, required: true },
  artist: String,
  link: {type: String, required: true },
  source: {type: String, required: true }
});

//add soundcloud song to collection
SongSchema.statics.createSoundcloud = function(song_obj, cb){
  var Song = this;
  Song.create({
    id: song_obj.song.args.song.id,
    title: song_obj.song.args.song.title,
    artist: song_obj.song.args.song.user.username,
    link: song_obj.song.args.song.permalink_url,
    source:'SoundCloud'
  }, function(err, data) {
    Playlist.addNewSong(data, song_obj.playlist, song_obj.userid, function(err, model) {
        console.log('Error ', err);
      });
  });
}

//add youtube song to collection
SongSchema.statics.createYoutube = function(song_obj, cb){
  var Song = this;
  Song.create({
      id: song_obj.song.args.info.items[0].id,
      title: song_obj.song.args.info.items[0].snippet.title.split(' - ')[1],
      artist: song_obj.song.args.info.items[0].snippet.title.split(' - ')[0],
      link: song_obj.song.args.song.permalink_url,
      source: 'YouTube'
    }, function(err, data) {
      Playlist.addNewSong(data, song_obj.playlist, function(err, model) {
        cb(err, data);
      });
    });
}

SongSchema.statics.createSpotify = function(song_obj, cb){
  var Song = this;
  Song.create({
    id: song_obj.song.args.info.id,
    title: song_obj.song.args.song.title,
    artist: song_obj.song.args.info.artists[0].name,
    link: song_obj.song.args.song.permalink_url,
    source: 'Spotify'
  }, function(err, data) {
    Playlist.addNewSong(data, song_obj.playlist, function(err, model) {
        console.log('Error ', err);
      });
  });
}

module.exports = mongoose.model('Song', SongSchema);

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
  id: {type: String, require: true },
  title: { type: String, required: true },
  artist: String,
  link: {type: String, required: true },
  source: {type: String, required: true }
});


SongSchema.methods.createSoundcloud = function(song_obj){
}

//add youtube song to collection
SongSchema.statics.createYoutube = function(song_obj, cb){
  var Song = this;
  Song.create({

      id: song_obj.song.args.info.items[0].id,
      title: song_obj.song.args.info.items[0].snippet.title.split('-')[1],
      artist: song_obj.song.args.info.items[0].snippet.title.split('-')[0],
      link: song_obj.song.args.song.permalink_url,
      source: 'YouTube'
    }, function(err, data) {
      cb(err, data);
    }

  );
}

SongSchema.methods.createSpotify = function(song_obj){

}

module.exports = mongoose.model('Song', SongSchema);

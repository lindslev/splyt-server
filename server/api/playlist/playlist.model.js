'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
    title: {type: String, require: true},
    songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
    friend_stream: {type: Boolean, default: false},
    aggregate_stream: {type: Boolean, default: false}
});

PlaylistSchema.statics.addNewSong = function(song, playlist, cb) {
    var Playlist = this;

    Playlist.findByIdAndUpdate(playlist, {
            $push: {
                "songs": song
            }
        }, {
            safe: true,
            upsert: true
        },
        function(err, model) {
            cb(err, model);
        }
    );
}

module.exports = mongoose.model('Playlist', PlaylistSchema);
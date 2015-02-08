'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Playlist = require('./playlist.model');
var Song = require('../song/song.model');
var User = require('../user/user.model');

// var playlist = new Playlist({
//   _id : '1',
//   title:'great songs',
//   songs: []
// })
var song;
var playlist;
var user;

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('Playlist Model', function() {
  before(function(done) {
    //Clear playlists before testing
    Playlist.remove().exec().then(function() {
      done();
    });
  });

  before(function(done) {

    Playlist.create({
      title:'great songs',
      songs: []
    }, function(err, data) {
      playlist = data;
    });

    Song.create({
      title: 'title',
      artist: 'artist',
      link: 'http://www.kamilla.com',
      tag: '56',
      source: 'YouTube'
    }, function(err, data) {
      song = data;
    });


    // User.create({
    //   provider: 'local',
    //   name: 'Fake User',
    //   email: 'test@test.com',
    //   password: 'password'
    // }, function(err, data) {
    //   console.log('err', err);
    //   console.log(data);
    //   user = data;
    // });

    done();
  })

  after(function(done) {
    Playlist.remove().exec().then(function() {
      Song.remove().exec().then(function() {
        done();
      })
    });
  });

  it('should begin with no playlists', function(done) {
    Playlist.find({}, function(err, playlists) {
      playlists.should.have.length(1);
      done();
    });
  });

  // it('should push a song to a playlist', function(done) {
  //   Playlist.addNewSong(song, playlist._id, user._id, function(err, playlist) {

  //     playlist.songs.should.have.length(1);
  //     done();
  //   });
  // });

})

// describe('GET /api/playlists', function() {

//   it('should respond with JSON array', function(done) {
//     request(app)
//       .get('/api/playlists')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end(function(err, res) {
//         if (err) return done(err);
//         res.body.should.be.instanceof(Array);
//         done();
//       });
//   });
// });

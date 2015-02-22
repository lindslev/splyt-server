'use strict';

angular.module('splytApp')
  .factory('search', function ($http, Auth) {
    //GOOGLE YOUTUBE API AUTH CODE//

    // Public API here
    return {

      searchSC: function (query, cb) {
          SC.get('/tracks', {q: query, limit: 25 }, function(data) {
            for (var i = 0; i < data.length; i++) {
            }
            cb(data)
          });
      },

      searchYT: function(query, cb) {
        $http.get('/api/youtubes/search/videos/' + query).success(function(data){
          console.log('data');
            cb(data);
        })
      },

      addYT: function(song, playlist, cb) {
        var random = Math.floor(Math.random() * 100);
        var random_image = 'http://lorempixel.com/100/100/abstract/' + random;

        $http.get('api/youtubes/search/addnew/videos/' + song).success(function(song){
          var title = song.items[0].snippet.title.split(' - ')[1];
          var artist = song.items[0].snippet.title.split(' - ')[0];
          if (title === undefined) {
            title = song.items[0].snippet.title;
            artist = '';
          }
          var song_obj = {
            tag: song.items[0].id,
            title: title,
            artist: artist,
            link: 'https://www.youtube.com/watch?v=' + song.items[0].id,
            source: 'YouTube',
            addedUser: Auth.getCurrentUser()._id,
            thumbnail: song.items[0].snippet.thumbnails.default.url
          }
          $http.post('/api/users/addSong/'+Auth.getCurrentUser()._id + '/playlist/' + playlist, song_obj)
          .success(function(model) {
            cb(model);
          })
          .error(function(err){
            cb(err);
          })
        })
      },

      addSC: function(song, playlist, cb) {
        var audio;
        song.streamable ? audio = song.stream_url : audio = null;
        var title = song.title.split(' - ')[1];
          var artist = song.title.split(' - ')[0];
          if (title === undefined) {
            title = song.title;
            artist = '';
          }
          var song_obj = {
            tag: song.id,
            title: title,
            artist: artist,
            link: song.permalink_url,
            audioSource: audio,
            source: 'SoundCloud',
            addedUser: Auth.getCurrentUser()._id,
            thumbnail: song.artwork_url
          };
        $http.post('/api/users/addSong/'+Auth.getCurrentUser()._id + '/playlist/' + playlist, song_obj)
        .success(function(model) {
          cb(model);
        })
        .error(function(err){
          cb(err);
        })
      }

    }
  });

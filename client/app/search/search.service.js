'use strict';

angular.module('splytApp')
  .factory('search', function ($http, Auth) {
    //GOOGLE YOUTUBE API AUTH CODE//

    // Public API here
    return {

      searchSC: function (query, cb) {
          SC.get('/tracks', {q: query }, function(data) {
            console.log(data);
            cb(data)
          });
      },

      searchYT: function(query, cb) {
        $http.get('/api/youtubes/search/videos/' + query).success(function(data){
            cb(data);
        })
      },

      addYT: function(song, playlist, cb) {
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
            link: 'https://www.youtube.com/watch?v=' + song.items[0].id.videoId,
            source: 'YouTube'
          };
          $http.post('/api/users/addSong/'+Auth.getCurrentUser()._id + '/playlist/' + playlist, song_obj)
          .success(function(model) {
            console.log(model);
            cb(err, model);
          })
        })
      }

    }
  });

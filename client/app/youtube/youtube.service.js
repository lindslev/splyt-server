'use strict';

angular.module('splytApp')
    .factory('youtube', function($http) {
        // Service logic
        // ...
        var apiKey = "AIzaSyC_eZm_iimb5fx5So3Bt4h96ZuKQqd7ARU";


        // Public API here
        return {
            getYoutubeVideo: function(videoID) {

                return $http({
                    url: 'https://www.googleapis.com/youtube/v3/videos',
                    method: 'GET',
                    params: {
                        part: 'snippet',
                        id: videoID,
                        key: apiKey
                    }
                }).then(function(res) {

                    if (res.data.items[0].snippet.categoryId == "10") {
                      var artist = res.data.items[0].snippet.title.split('-')[0];
                      var title = res.data.items[0].snippet.title.split('-')[1];
                        return {
                          id: res.data.items[0].id,
                          //title: res.data.items[0].snippet.title,
                          title: title,
                          artist: artist,
                          thumbnail: res.data.items[0].snippet.thumbnails.default.url,
                          source: 'youtube',
                          embed: '<iframe width="200" height="200" src="https://www.youtube.com/embed/u4PAOG83nh8?rel=0" frameborder="0" allowfullscreen></iframe>'
                        }
                    } else {
                        // console.log('Category Id does not match');
                    }
                });
            },
        };
    });

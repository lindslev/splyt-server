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
                        return res;
                    } else {
                        console.log('Category Id does not match');
                    }
                });
            }
        };
    });
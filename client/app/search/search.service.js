'use strict';

angular.module('splytApp')
  .factory('search', function ($http) {
    //GOOGLE YOUTUBE API AUTH CODE//

    // Public API here
    return {

    OAUTH2_CLIENT_ID : '126607749639-5gva62d10a4jbo1o4tmas8roln6frjmh.apps.googleusercontent.com',
    OAUTH2_SCOPE : ['https://www.googleapis.com/auth/youtube'],

    googleApiClientReady:function() {
      gapi.auth.init(function() {
        window.setTimeout(checkAuth, 1);
      })
    },

    checkAuth: function(){
      gapi.auth.authorize({
        client: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPE,
        immediate: true,
      }, handleAuthResult);
    },

    handleAuthResult: function(authResult) {
      if (authResult && !authResult.error) {
        loadAPIClientInterfaces();
      } else {
        console.log('handleAuthResult failed');
      }
    },

    loadAPIClientInterfaces: function() {
      gapi.client.load('youtube', 'v3', function() {
        handleAPILoaded();
      })
    },

      searchSC: function (query) {
        console.log('searching Sound Cloud');
          SC.get('/tracks', {q: query }, function(data) {
            console.log(data);
          });
      },

      searchYT: function(query) {
          // $http.jsonp("https://www.googleapis.com/youtube/v3/search?part=snippet&q=red&key=AIzaSyC_eZm_iimb5fx5So3Bt4h96ZuKQqd7ARU").success(function(data) {
          //   console.log(data);
          // })
          $http.get('/api/youtubes/search/videos/' + query).success(function(data){
            console.log(data);
          })
          // $http.get('https://www.googleapis.com/youtube/v3/search',
          //   {
          //     params: {
          //     'part': 'snippet',
          //     'q': 'red',
          //     'key': 'AIzaSyC_eZm_iimb5fx5So3Bt4h96ZuKQqd7ARU'
          //     }
          //   })
      }


    }
  });

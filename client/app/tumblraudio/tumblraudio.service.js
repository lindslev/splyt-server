'use strict';

angular.module('splytApp')
  .factory('TumblrAudio', function () {
    var TumblrAudioSource = function(song) {
      var music = document.getElementById('music');
      this.source = song.audioSource;
      $('#music').attr('src', this.source);
    }

    TumblrAudioSource.prototype.play = function() {
      console.log('this is where we should play')
      music.play();
    }

    TumblrAudioSource.prototype.pause = function() {
      music.pause();
    }

    TumblrAudioSource.prototype.seek = function(num) {
      music.currentTime = num;
    }

    TumblrAudioSource.prototype.currentTime = function() {
      return music.currentTime;
    }

    TumblrAudioSource.prototype.duration = function() {
      return music.duration;
    }

    TumblrAudioSource.prototype.addEndedListener = function() {
      return music.addEventListener("ended",function() {
        console.log('IT ENDED AND THIS WORKED')
        // $scope.changeSong('next');
      });
    }

    return TumblrAudioSource;
  });

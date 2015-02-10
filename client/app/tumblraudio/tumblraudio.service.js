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
      //
    }

    return TumblrAudioSource;
  });

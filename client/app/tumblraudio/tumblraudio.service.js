'use strict';

angular.module('splytApp')
  .factory('TumblrAudio', function () {
    var TumblrAudioSource = function(song) {
      var music = document.getElementById('music');
      this.source = song.audioSource;
      $('#music').attr('src', this.source);
    }

    TumblrAudioSource.prototype.play = function() {
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

    TumblrAudioSource.prototype.addEndedListener = function(cb) {
      this.onEndCB = cb;
      return music.addEventListener("ended", cb);
    }

    TumblrAudioSource.prototype.stop = function() {
      music.removeEventListener("ended", this.onEndCB);
      music.pause();
      music.currentTime = 0;
    }

    return TumblrAudioSource;
  });

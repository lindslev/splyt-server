'use strict';

angular.module('splytApp')
  .factory('TumblrAudio', function () {
    var TumblrAudioSource = function(song) {
      this.source = song.iframeSrc;
      $('#myaudiotag').attr('src', this.source);
    }

    TumblrAudioSource.prototype.play = function() {
      $('#myaudiotag').play();
    }

    TumblrAudioSource.prototype.pause = function() {
      $('#myaudiotag').pause();
    }

    TumblrAudioSource.prototype.seek = function(num) {
      $('#myaudiotag').currentTime = num;
    }

    return TumblrAudioSource;
  });

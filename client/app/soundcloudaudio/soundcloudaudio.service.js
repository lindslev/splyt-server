'use strict';

angular.module('splytApp')
  .factory('SoundcloudAudio', function () {
    var SoundcloudAudioSource = function(song) {
      this.source = song.stream_url;
      $('#myaudiotag').attr('src', this.source);
    }

    SoundcloudAudioSource.prototype.play = function() {
      $('myaudiotag').play();
    }

    SoundcloudAudioSource.prototype.play = function() {
      $('myaudiotag').play();
    }

    SoundcloudAudioSource.prototype.seek = function(num) {
      // num should be or become ->> music.currentTime = duration * clickPercent(e);
      $('myaudiotag').currentTime = num;
    }

    return SoundcloudAudioSource;
  });

'use strict';

angular.module('splytApp')
  .factory('SoundcloudAudio', function () {
    var SoundcloudAudioSource = function(song) {
      this.source = song.audioSource + '?client_id=7af759eb774be5664395ed9afbd09c46';
      $('#music').attr('src', this.source);
      var music = document.getElementById('music');
    }

    SoundcloudAudioSource.prototype.play = function() {
      music.play();
    }

    SoundcloudAudioSource.prototype.pause = function() {
      music.pause();
    }

    SoundcloudAudioSource.prototype.seek = function(num) {
      // num should be or become ->> music.currentTime = duration * clickPercent(e);
      // $('myaudiotag').currentTime = num;
    }

    return SoundcloudAudioSource;
  });

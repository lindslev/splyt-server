'use strict';

angular.module('splytApp')
  .factory('SoundcloudAudio', function () {
    var SoundcloudAudioSource = function(song) {
      if(song.audioSource.match(/secret_token/)) song.audioSource = song.audioSource.split('?secret_token=tracks')[0]
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
      music.currentTime = num;
    }

    SoundcloudAudioSource.prototype.currentTime = function() {
      return music.currentTime;
    }

    SoundcloudAudioSource.prototype.duration = function() {
      return music.duration;
    }

    SoundcloudAudioSource.prototype.addEndedListener = function(cb) {
      this.onEndCB = cb;
      return music.addEventListener("ended", cb);
    }

    SoundcloudAudioSource.prototype.stop = function() {
      music.removeEventListener("ended", this.onEndCB);
      music.pause();
      music.currentTime = 0;
    }

    return SoundcloudAudioSource;
  });

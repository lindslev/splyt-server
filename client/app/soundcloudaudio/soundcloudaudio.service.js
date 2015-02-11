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
      music.currentTime = num;
    }

    SoundcloudAudioSource.prototype.currentTime = function() {
      return music.currentTime;
    }

    SoundcloudAudioSource.prototype.duration = function() {
      return music.duration;
    }

    SoundcloudAudioSource.prototype.addEndedListener = function() {
      return music.addEventListener("ended",function() {
        console.log('IT ENDED AND THIS WORKED')
        // $scope.changeSong('next');
      });
    }

    SoundcloudAudioSource.prototype.stop = function() {
      music.pause();
      music.currentTime = 0;
    }

    return SoundcloudAudioSource;
  });

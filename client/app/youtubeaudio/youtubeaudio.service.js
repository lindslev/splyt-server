'use strict';

angular.module('splytApp')
  .factory('YoutubeAudio', function () {
    var YoutubeAudioSource = function(song) {
      this.player = new YT.Player('youtubePlayer', {
            height: '500',
            width: '500',
            videoId: song.tag.toString(),
            events: {
              // 'onReady': onPlayerReady
            }
          })
    }

    YoutubeAudioSource.prototype.play = function() {
      this.player.play();
    }
    YoutubeAudioSource.prototype.pause = function() {
      this.player.pause();
    }
    YoutubeAudioSource.prototype.seek = function(num) {
      this.player.seekTo(num, true);
    }

    return YoutubeAudioSource;
  });

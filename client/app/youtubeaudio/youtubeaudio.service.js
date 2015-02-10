'use strict';

angular.module('splytApp')
  .factory('YoutubeAudio', function () {
    var YoutubeAudioSource = function(song) {
      var self = this;
      this.onReadyFunctions = [];
      this.player = new YT.Player('youtubePlayer', {
            height: '500',
            width: '500',
            videoId: song.tag.toString(),
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onEnded
            }
          })
      function onPlayerReady() {
        self.onReadyFunctions.forEach(function(fn){
          fn();
        })
      }
    }

    YoutubeAudioSource.prototype.onReady = function(fn) {
      this.onReadyFunctions.push(fn);
    }
    YoutubeAudioSource.prototype.play = function() {
      this.player.playVideo();
    }
    YoutubeAudioSource.prototype.pause = function() {
      this.player.pauseVideo();
    }
    YoutubeAudioSource.prototype.seek = function(num) {
      this.player.seekTo(num, true);
    }
    YoutubeAudioSource.prototype.currentTime = function() {
      return this.player.getCurrentTime();
    }
    YoutubeAudioSource.prototype.duration = function() {
      return this.player.getDuration();
    }
    YoutubeAudioSource.prototype.addEndedListener = function() {
      return onEnded;
    }

    function onEnded(e) {
      if(e.data === 0) console.log("IT ENDED AND THIS WORKED")
    }

    return YoutubeAudioSource;
  });

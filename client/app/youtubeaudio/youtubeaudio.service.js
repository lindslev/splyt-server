'use strict';

angular.module('splytApp')
  .factory('YoutubeAudio', function () {
    var callback;

    var YoutubeAudioSource = function(song) {
      var self = this;
      this.timerInterval;
      this.onReadyFunctions = [];
      $('#youtubePlayer').remove();
      this.domElement = $('<div id="youtubePlayer"></div>')
      $('body').append(this.domElement);
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
      // this.timer();
    }
    YoutubeAudioSource.prototype.play = function() {
      this.player.unMute();
      this.player.playVideo();
    }
    YoutubeAudioSource.prototype.pause = function() {
      this.player.pauseVideo();
    }
    YoutubeAudioSource.prototype.seek = function(num) {
      this.player.seekTo(num, true);
    }
    YoutubeAudioSource.prototype.currentTime = function() {
      if(this.player.getCurrentTime) return this.player.getCurrentTime();
    }
    YoutubeAudioSource.prototype.duration = function() {
      if(this.player.getDuration) return this.player.getDuration();
    }
    YoutubeAudioSource.prototype.addEndedListener = function(cb) {
      callback = cb;
      return onEnded;
    }
    YoutubeAudioSource.prototype.timer = function(playerTimeUpdate) {
      var x = 0, self = this;
      this.timerInterval = setInterval(function() {
        if(x !== self.currentTime()) {
          x = self.currentTime();
          playerTimeUpdate();
        }
      }, 100);
    }

    function onEnded(e) {
      if(e.data === 0) callback();
    }

    YoutubeAudioSource.prototype.stop = function(newSong) {
      clearInterval(this.timerInterval);
      if(newSong.source !== 'YouTube' || newSong == 'LOGOUT') $('#youtubePlayer').remove();
      //doesnt work from youtube to youtube bc this removes the element before new song can run this.player.playVideo
    }

    YoutubeAudioSource.prototype.setVolume = function(num) {
      this.player.setVolume(num);
    }

    return YoutubeAudioSource;
  });

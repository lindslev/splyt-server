'use strict';

angular.module('splytApp')
  .factory('YoutubeAudio', function () {
    var callback;

    var YoutubeAudioSource = function(song) {
      var self = this;
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
        console.log('self.onReady', self.onReadyFunctions)
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
    YoutubeAudioSource.prototype.addEndedListener = function(cb) {
      callback = cb;
      return onEnded;
    }

    function onEnded(e) {
      if(e.data === 0) callback();
    }

    YoutubeAudioSource.prototype.stop = function(newSong) {
      // do nothing tbh right?? jk needs to remove itself if its followed by
      // a non youtube song
      // console.log('document.getElement', $('youtubePlayer'))
      if(newSong.source !== 'YouTube') $('#youtubePlayer').remove();
      //doesnt work from youtube to youtube bc this removes the element before new song can run this.player.playVideo
    }

    return YoutubeAudioSource;
  });

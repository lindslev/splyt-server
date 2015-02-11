'use strict';

angular.module('splytApp')
  .factory('SoundcloudNonstreamable', function ($sce) {
    var SoundcloudNonstreamableAudioSource = function(song) {
      var trustSrc = $sce.trustAsResourceUrl;
      var self = this;
      this.onReadyFunctions = [];
      this.domElement = $('<iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameborder="no" src=""></iframe>')
      $('body').append(this.domElement);
      this.url = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + song.tag + "&color=0066cc";
      $('#soundcloud_widget').attr('src', trustSrc(this.url));
      this.widget = SC.Widget(document.getElementById('soundcloud_widget'));
      this.widget.bind(SC.Widget.Events.READY, function() {
        console.log(self.onReadyFunctions)
        self.onReadyFunctions.forEach(function(fn){
          fn();
        })
      });
    }

    SoundcloudNonstreamableAudioSource.prototype.onReady = function(fn) {
      this.onReadyFunctions.push(fn);
    }

    SoundcloudNonstreamableAudioSource.prototype.play = function() {
      this.widget.play();
    }

    SoundcloudNonstreamableAudioSource.prototype.pause = function() {
      this.widget.pause();
    }

    SoundcloudNonstreamableAudioSource.prototype.seek = function(num) {
      this.widget.seekTo(num*1000);
    }

    SoundcloudNonstreamableAudioSource.prototype.currentTime = function() {
      return this.widget.currentPosition()/1000;
    }

    SoundcloudNonstreamableAudioSource.prototype.duration = function() {
      return this.widget.getDuration()/1000;
    }

    SoundcloudNonstreamableAudioSource.prototype.addEndedListener = function() {
      return this.widget.bind(SC.Widget.Events.FINISH, function() {
        console.log("IT ENDED AND THIS WORKED");
      })
    }

    SoundcloudNonstreamableAudioSource.prototype.stop = function() {
      $('#soundcloud_widget').remove();
    }

    return SoundcloudNonstreamableAudioSource;
  });

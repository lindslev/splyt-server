'use strict';

angular.module('splytApp')
  .factory('SoundcloudNonstreamable', function ($sce) {
    var SoundcloudNonstreamableAudioSource = function(song) {
      this.widget = SC.Widget(document.getElementById('soundcloud_widget'));
      this.widget.bind(SC.Widget.Events.READY, function() { });
      // this.trustSrc = $sce.trustAsResourceUrl;
      this.url = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + song.tag + "&color=0066cc";
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

    return SoundcloudNonstreamableAudioSource;
  });

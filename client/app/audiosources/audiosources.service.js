'use strict';

angular.module('splytApp')
  .factory('AudioSources', function (YoutubeAudio, SoundcloudAudio, SoundcloudNonstreamable, TumblrAudio) {
    return {
      YouTube: YoutubeAudio,
      SoundCloud: SoundcloudAudio,
      SoundCloudNonstreamable: SoundcloudNonstreamable,
      Tumblr: TumblrAudio
    }
  });

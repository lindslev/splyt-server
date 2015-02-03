'use strict';

angular.module('splytApp')
    .factory('youtube', function($http) {
        // Service logic
        // ...
        var apiKey = "AIzaSyC_eZm_iimb5fx5So3Bt4h96ZuKQqd7ARU";


        // Public API here
        return {
            getYoutubeVideo: function(videoID) {

                return $http({
                    url: 'https://www.googleapis.com/youtube/v3/videos',
                    method: 'GET',
                    params: {
                        part: 'snippet',
                        id: videoID,
                        key: apiKey
                    }
                }).then(function(res) {

                    if (res.data.items[0].snippet.categoryId == "10") {
                      var artist = res.data.items[0].snippet.title.split('-')[0];
                      var title = res.data.items[0].snippet.title.split('-')[1];
                        return {
                          id: res.data.items[0].id,
                          //title: res.data.items[0].snippet.title,
                          title: title,
                          artist: artist,
                          thumbnail: res.data.items[0].snippet.thumbnails.default.url,
                          source: 'youtube'
                        }
                    } else {
                        console.log('Category Id does not match');
                    }
                });
            }
        };

//mp4 converter code from https://github.com/endlesshack/youtube-video
(function() {
  window.YoutubeVideo = function(id, callback) {
    return $.ajax({
      url: "http://www.youtube.com/get_video_info?video_id=" + id,
      dataType: "text"
    }).done(function(video_info) {
      var video;
      video = YoutubeVideo.decodeQueryString(video_info);
      if (video.status === "fail") {
        return callback(video);
      }
      video.sources = YoutubeVideo.decodeStreamMap(video.url_encoded_fmt_stream_map);
      video.getSource = function(type, quality) {
        var exact, key, lowest, source, _ref;
        lowest = null;
        exact = null;
        _ref = this.sources;
        for (key in _ref) {
          source = _ref[key];
          if (source.type.match(type)) {
            if (source.quality.match(quality)) {
              exact = source;
            } else {
              lowest = source;
            }
          }
        }
        return exact || lowest;
      };
      return callback(video);
    });
  };
  window.YoutubeVideo.decodeQueryString = function(queryString) {
    var key, keyValPair, keyValPairs, r, val, _i, _len;
    r = {};
    keyValPairs = queryString.split("&");
    for (_i = 0, _len = keyValPairs.length; _i < _len; _i++) {
      keyValPair = keyValPairs[_i];
      key = decodeURIComponent(keyValPair.split("=")[0]);
      val = decodeURIComponent(keyValPair.split("=")[1] || "");
      r[key] = val;
    }
    return r;
  };
  window.YoutubeVideo.decodeStreamMap = function(url_encoded_fmt_stream_map) {
    var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
    sources = {};
    _ref = url_encoded_fmt_stream_map.split(",");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      urlEncodedStream = _ref[_i];
      stream = YoutubeVideo.decodeQueryString(urlEncodedStream);
      type = stream.type.split(";")[0];
      quality = stream.quality.split(",")[0];
      stream.original_url = stream.url;
      stream.url = "" + stream.url + "&signature=" + stream.sig;
      sources["" + type + " " + quality] = stream;
    }
    return sources;
  };
}).call(this);
    });

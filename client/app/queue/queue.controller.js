'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state) {

    //youtube iframe api include
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    ///

    $scope.playlist = playlist;
    $scope.playlist_tabs=[];
    $scope.tabs = $scope.playlist_tabs;

    //Updating playlist songs when user clicks on new tab
    $scope.update_songs = function(id) {
      console.log('update_songs');
      $state.go('queue', { playlist_id: id }, true);
    }

    var playlistPromise = manage.getPlaylists();

    //Getting playlists
    playlistPromise.success(function(playlists) {
      $scope.playlists = [];
      for (var i = 0; i < playlists.length; i++) {
        $scope.playlist_tabs.push(playlists[i]);
        if (playlists[i].aggregate_stream === true) {
          $scope.main_playlist = playlists[i];

        } if (playlists[i].friend_stream === true) {
          $scope.friend_playlist = playlists[i];
        }
      }
    }).then(function(){
      console.log($scope.playlist_tabs);
    });

    $scope.songs = playlist.songs.map(function(song) { song.playing = 'play_arrow'; return song; });



    //////////////////////////////////////////////
    /////////// PLAYER FUNCTIONALITY /////////////
    //////////////////////////////////////////////

    var music = document.getElementById('music'); // id for audio element
    var duration; // Duration of audio clip
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth; // timeline width adjusted for playhead
    music.addEventListener("timeupdate", timeUpdate, false); // timeupdate event listener
    timeline.addEventListener("click", function (event) { //Makes timeline clickable
      moveplayhead(event);
      music.currentTime = duration * clickPercent(event);
    }, false);

    function clickPercent(e) { // returns click as decimal (.77) of the total timelineWidth
      return (e.pageX - timeline.offsetLeft) / timelineWidth;
    }

    // Makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    // Boolean value so that mouse is moved on mouseUp only when the playhead is released
    var onplayhead = false;

    function mouseDown() {
      onplayhead = true;
      window.addEventListener('mousemove', moveplayhead, true);
      music.removeEventListener('timeupdate', timeUpdate, false);
    }

    function mouseUp(e) {
      if (onplayhead == true) {
        moveplayhead(e);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        if(youtubePlaying) $scope.seekTo(duration*clickPercent(e));
        music.currentTime = duration * clickPercent(e);
        music.addEventListener('timeupdate', timeUpdate, false);
      }
      onplayhead = false;
    }

    // Moves playhead as user drags
    function moveplayhead(e) {
      var newMargLeft = e.pageX - timeline.offsetLeft;
      if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
      }
      if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
      }
      if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
      }
      console.log('dragged')
    }

    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
      var playPercent;
      youtubePlaying ? playPercent = timelineWidth * ($scope.current()/duration) : playPercent = timelineWidth * (music.currentTime / duration);
      playhead.style.marginLeft = playPercent + "px";
      if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
      }
    }

    // $scope.trustSrc = $sce.trustAsResourceUrl;
    // $scope.chosenIcon = 'play_arrow';
    // $scope.notStreamable = false;
    // var player, youtubePlaying = false;

    // var currentlyPlaying;
    // $scope.play = function(song, idx) {
    //   if(currentlyPlaying && currentlyPlaying !== song) currentlyPlaying.playing = 'pause';
    //   song.playing !== 'pause' ? song.playing = 'pause' : song.playing = 'play_arrow';

    //   if(youtubePlaying) {
    //     console.log('in here')
    //     youtubePlaying = false;
    //     toggleYoutube();
    //   }

    //   if(song.source == 'SoundCloud') {
    //     console.log("?????????")
    //     SC.get("/tracks/" + song.tag, {}, function(sound, error) {
    //       if(sound.stream_url) {
    //         $('#music').attr('src', sound.stream_url + '?client_id=7af759eb774be5664395ed9afbd09c46');
    //         $scope.notStreamable = false;
    //         $scope.playTrack(song);
    //       } else {
    //         $scope.notStreamable = true;
    //         $scope.scUrl = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + sound.id + "&color=0066cc";
    //         $scope.$apply()
    //       }
    //     });
    //   }
    //   if(song.source == 'YouTube') {
    //     //iframe api way of streaming the youtube song:
    //     if(currentlyPlaying !== song) {
    //       player = new YT.Player('youtubePlayer', {
    //         height: '500',
    //         width: '500',
    //         videoId: song.tag.toString(),
    //         events: {
    //           'onReady': onPlayerReady
    //         }
    //       });
    //     }
    //     console.log('were in youtube song source')
    //     youtubePlaying = true;
    //     $scope.playTrack();
    //   }
    //   if(song.source == 'Tumblr') {
    //     $('#music').attr('src', song.audioSource)
    //     $scope.playTrack();
    //   }
    //   currentlyPlaying = song;
    // }

    // //Play and Pause
    // $scope.playTrack = function(song, fromPlayer) {
    //   song ? song = song : song = currentlyPlaying;
    //   console.log('song', song)
    //   // start music
    //   if(!youtubePlaying && !$scope.notStreamable) {
    //     // if (music.paused) {
    //     if(song.playing == 'pause') {
    //       console.log("music was paused confirmed")
    //       music.play();
    //       // remove play, add pause
    //       // song.playing = "play_arrow";
    //       pButton.className = "";
    //       pButton.className = "pause";
    //       console.log("so we started playing")
    //     } else { // pause music
    //       console.log("music PLAYING confirmed?")
    //       music.pause();
    //       // remove pause, add play
    //       // song.playing = "pause";
    //       pButton.className = "";
    //       pButton.className = "play";
    //       console.log("so we paused")
    //     }
    //   } else if(youtubePlaying) {
    //     console.log('TOGGLE YOUTUBE')
    //     toggleYoutube();
    //   } else {
    //     // $scope.play(currentlyPlaying, 0)
    //   }
    // }

    // // Gets audio file duration
    // music.addEventListener("canplaythrough", function () {
    //   youtubePlaying ? duration = getDuration() : duration = music.duration;
    // }, false);

    // $scope.current = function(){
    //   if(player.getCurrentTime) return player.getCurrentTime();
    // }

    // $scope.pause = function(){
    //   if(player) player.pauseVideo();
    // }

    // $scope.seekTo = function(num) {
    //   player.seekTo(num, true);
    // }

    // // 4. The API will call this function when the video player is ready.
    // var intervalTest = true;
    // function onPlayerReady(event) {
    //   if(player.getDuration) duration = player.getDuration();
    //   var x = 0;
    //   if(intervalTest) {
    //   console.log('how many times are we getting in intervalTest')
    //     intervalTest = false;
    //     setInterval(function() {
    //       if(x !== $scope.current()) timeUpdate();
    //       x = $scope.current();
    //     }, 100);
    //   }
    //   event.target.playVideo();
    //   pButton.className = "";
    //   pButton.className = "pause";
    // }

    // function stopVideo() {
    //   if(player) player.stopVideo();
    // }

    // function toggleYoutube() {
    //   if(player && player.getPlayerState && player.getPlayerState() == 2) { //paused
    //     currentlyPlaying.playing = 'pause';
    //     pButton.className = "";
    //     pButton.className = "pause";
    //     // youtubePlaying = true;
    //     player.playVideo();
    //   } else if(player && player.getPlayerState && player.getPlayerState() == 1) { //playing
    //     currentlyPlaying.playing = 'play_arrow';
    //     pButton.className = "";
    //     pButton.className = "play";
    //     // youtubePlaying = false;
    //     $scope.pause();
    //   } else {
    //     console.log("THE ELSE")
    //     if(player && player.playVideo) player.playVideo();
    //   }
    // }

    // /// SOUNDCLOUD PLAYER ///
    //  var widget = SC.Widget(document.getElementById('soundcloud_widget'));
    //  widget.bind(SC.Widget.Events.READY, function() {
    //    console.log('Ready...');
    //  });

    // $scope.scSeekTo = function(num) {
    //   widget.seekTo(200000);
    // }

    // $scope.scToggle = function() {
    //   widget.toggle();
    // }

});

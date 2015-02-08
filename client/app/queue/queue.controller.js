'use strict';

angular.module('splytApp')
  .controller('QueueCtrl', function ($http, playlist, $scope, youtube, $sanitize, $sce, manage, $log, $stateParams, $state) {


  $scope.songs = playlist.songs;

  $scope.play = function(song) {
    if(song.source == 'SoundCloud') {
       SC.get("/tracks/" + song.id, {}, function(sound, error) {
        $('#music').attr('src', sound.stream_url + '?client_id=7af759eb774be5664395ed9afbd09c46');
      });
    }
    if(song.source == 'YouTube') {
      $('#music').attr('src', '/api/youtubes/stream/' + song.id);
    }
    // $scope.playTrack();
  }

  $scope.playlist = playlist;

  $scope.playlist_tabs=[];

  $scope.tabs = $scope.playlist_tabs;

  $scope.update_songs = function(id) {
    console.log('update_songs');
    $state.go('queue',{playlist_id: id}, true);
  }

  // var player = new Audio('/api/youtubes/stream/at3FPJaAwoY')
  // player.preload = 'metadata';
  // player.play();
  // player.controls = true;
  // document.body.appendChild(player);


  // var player2 = new Audio('https://www.tumblr.com/audio_file/uncaught/101386977846/tumblr_ne5ykbG3y11qflbpe?play_key=e6ba8f023e92bbb5aaf06052cd0c6551&tumblelog=uncaught&post_id=101386977846')
  // player2.preload = 'metadata';
  // player2.play();
  // player2.controls = true;
  // document.body.appendChild(player2);

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

  var music = document.getElementById('music'); // id for audio element
  var duration; // Duration of audio clip
  var pButton = document.getElementById('pButton'); // play button

  var playhead = document.getElementById('playhead'); // playhead

  var timeline = document.getElementById('timeline'); // timeline
  // timeline width adjusted for playhead
  var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

  // timeupdate event listener
  music.addEventListener("timeupdate", timeUpdate, false);

  //Makes timeline clickable
  timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
  }, false);

  // returns click as decimal (.77) of the total timelineWidth
  function clickPercent(e) {
    return (e.pageX - timeline.offsetLeft) / timelineWidth;
  }

  // Makes playhead draggable
  playhead.addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  // Boolean value so that mouse is moved on mouseUp only when the playhead is released
  var onplayhead = false;
  // mouseDown EventListener
  function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
  }
  // mouseUp EventListener
  // getting input from all mouse clicks
  function mouseUp(e) {
    if (onplayhead == true) {
      moveplayhead(e);
      window.removeEventListener('mousemove', moveplayhead, true);
      // change current time
      music.currentTime = duration * clickPercent(e);
      music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
  }
  // mousemove EventListener
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
  }

  // timeUpdate
  // Synchronizes playhead position with current point in audio
  function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
      pButton.className = "";
      pButton.className = "play";
    }
  }

  //Play and Pause
  $scope.playTrack = function() {
    // start music
    if (music.paused) {
      music.play();
      // remove play, add pause
      pButton.className = "";
      pButton.className = "pause";
    } else { // pause music
      music.pause();
      // remove pause, add play
      pButton.className = "";
      pButton.className = "play";
    }
  }

  // Gets audio file duration
  music.addEventListener("canplaythrough", function () {
    duration = music.duration;
  }, false);



});

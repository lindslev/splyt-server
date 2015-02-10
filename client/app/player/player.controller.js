'use strict';

angular.module('splytApp')
  .controller('PlayerCtrl', function ($scope, AudioSources) {
    var song1 = {"_id":"54da1a72d484cf56345c3395","tag":"95737356","title":"Kavinsky - Odd Look (A-Trak Remix)","artist":"Kavinsky","link":"http://soundcloud.com/deadcruiser/kavinsky-odd-look-a-trak-remix","source":"SoundCloud","__v":0,"audioSource":null,"playing":"play_arrow","$$hashKey":"object:13"}
    var song = {"_id":"54da1a77d484cf56345c3397","tag":"2Rxa4pNAnMY","title":"Live This Nightmare (NGHTMRE Remix) [Free]","artist":"The Griswolds","link":"https://www.youtube.com/watch?v=2Rxa4pNAnMY","source":"YouTube","__v":0,"audioSource":null,"playing":"play_arrow","$$hashKey":"object:15"}
    var song3 = {"_id":"54da1a7bd484cf56345c3398","title":"aloC-acoC","artist":"Brand New","link":"","source":"Tumblr","__v":0,"audioSource":"https://www.tumblr.com/audio_file/uncaught/106453769196/tumblr_n4lvrlXj7Y1qkuto7?play_key=e6ba8f023e92bbb5aaf06052cd0c6551&tumblelog=uncaught&post_id=106453769196","playing":"play_arrow","$$hashKey":"object:16"}
    var song4 = {"_id":"54da1a95d484cf56345c3399","tag":"181633092","title":"Bipolar Sunshine - Daydreamer (Gryffin Remix)","artist":"Gryffin Official","link":"http://soundcloud.com/gryffinofficial/bipolar-sunshine-daydreamer-gryffin-remix","source":"SoundCloud","__v":0,"audioSource":"https://api.soundcloud.com/tracks/181633092/stream","playing":"play_arrow","$$hashKey":"object:17"}

    var music = document.getElementById('music'); // id for audio element
    var duration; // Duration of audio clip
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline

    var musicPlaying = false; //this might need to become something on each factory

    // Communicator.onQueuePlayNewSong

    $scope.toggle = function() {
      if(musicPlaying) {
        $scope.audioProvider.pause();
        musicPlaying = false;
        pButton.className = "";
        pButton.className = "play"
      } else {
        $scope.audioProvider.play();
        musicPlaying = true;
        pButton.className = "";
        pButton.className = "pause"
      }
    }

    $scope.changeSong = function() {
      var AudioSource = AudioSources[handleSongSource(song)];
      $scope.audioProvider = new AudioSource(song);
      if(typeof $scope.audioProvider.onReady === 'function') { //for soundcloud nonstreamable and youtube embeds
        $scope.audioProvider.onReady(function(){
          $scope.toggle();
        });
      } else {
        $scope.toggle();
      }
    }

    function handleSongSource(song) {
      if(song.source == 'SoundCloud') return song.audioSource ? 'SoundCloud' : 'SoundCloudNonstreamable';
      return song.source;
    }

    $scope.changeSong();

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
      var playPercent = timelineWidth * (music.currentTime / duration);
      playhead.style.marginLeft = playPercent + "px";
      if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
      }
    }

    function toggle() {
      // start music
      // if (music.paused) {
      //   music.play();
      //   // remove play, add pause
      //   pButton.className = "";
      //   pButton.className = "pause";
      // } else { // pause music
      //   music.pause();
      //   // remove pause, add play
      //   pButton.className = "";
      //   pButton.className = "play";
      // }
    }

    // Gets audio file duration
    music.addEventListener("canplaythrough", function () {
      duration = music.duration;
    }, false);

  });

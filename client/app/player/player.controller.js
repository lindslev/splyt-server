'use strict';

angular.module('splytApp')
  .controller('PlayerCtrl', function ($scope, AudioSources, QueuePlayerComm) {

    //1. youtube song plays
    //2. youtube song pauses

    var music = document.getElementById('music'); // id for audio element
    var duration; // Duration of audio clip
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline

    $scope.musicPlaying = false;
    var currentlyPlaying, currentAudioProvider; //this might need to become something on each factory

    QueuePlayerComm.onChangeSong = function(song) {
      currentlyPlaying == song ? $scope.toggle() : $scope.changeSong(song);
      return currentlyPlaying;
    }

    $scope.toggle = function() {
      if(!$scope.musicPlaying && !$scope.audioProvider) return; //return if user tries to play before ever choosing a song
      if($scope.musicPlaying) {
        $scope.audioProvider.pause();
        $scope.musicPlaying = false;
      } else {
        $scope.audioProvider.play();
        $scope.musicPlaying = true;
      }
      QueuePlayerComm.trigger('globalPlayerToggle', currentlyPlaying);
    }

    $scope.changeSong = function(song) {
      if(currentlyPlaying) currentlyPlaying.playing = 'play_arrow';
      var songChangeHandler;
      $scope.musicPlaying ? songChangeHandler = switchTracks : songChangeHandler = $scope.toggle; //if a song was already playing, use switchTracks
      currentlyPlaying = song;
      currentAudioProvider = $scope.audioProvider;
      var AudioSource = AudioSources[handleSongSource(song)];
      $scope.audioProvider = new AudioSource(song);
      if(typeof $scope.audioProvider.onReady === 'function') { //for soundcloud nonstreamable and youtube embeds
        $scope.audioProvider.onReady(function(){
          songChangeHandler();
          $scope.$apply();
        });
      } else {
        songChangeHandler();
      }
      $scope.audioProvider.addEndedListener();
    }

    //WRITE STOP FXNS THAT SHOULD REMOVE THE YOUTUBE N SOUNDCLOUD DOM ELEMENTS FROM THE DOM

    //when a song is in the process of playing and another song is selected
    function switchTracks() {
      console.log('INSIDE OF SWITCH TRACKS')
      //need to set the OLD currentlyplaying.playing to play_arrow - do this in changeSong currentlyPlaying.playing = 'play_arrow'
      currentAudioProvider.stop(currentlyPlaying); //maybe stop
      $scope.audioProvider.play();
      QueuePlayerComm.trigger('globalPlayerToggle', currentlyPlaying);
    }

    function handleSongSource(song) {
      if(song.source == 'SoundCloud') return song.audioSource ? 'SoundCloud' : 'SoundCloudNonstreamable';
      return song.source;
    }

    // $scope.changeSong();

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

        //instead of music.currenttime it should be $scope.audioProvider.seek(duration*clickPercent(e))
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
      //playPercent = timelineWidth * ($scope.audioProvider.currentTime / duration)
      var playPercent = timelineWidth * (music.currentTime / duration);
      playhead.style.marginLeft = playPercent + "px";
      if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
      }
    }

    // Gets audio file duration
    music.addEventListener("canplaythrough", function () {
      //duration = $scope.audioProvider.duration
      duration = music.duration;
    }, false);

  });

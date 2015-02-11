'use strict';

angular.module('splytApp')
  .controller('PlayerCtrl', function ($scope, AudioSources, QueuePlayerComm) {
    //what needs to happen:
    //1. music not playing - click toggle
    //2. player icon turns to pause
    //3. playlist icon turns to pause
    //4. click toggle again
    //5. player icon turns to play
    //6. playlist icon of currentplaying turns to play
    //7. click toggle again
    //8. playlist icon of currentplaying turns to pause
    //9. player icon turns to pause
    //10. click playlist icon of currentlyplaying
    //11. playlist icon turns to play
    //12. player icon turns to play
    //13. click playlist icon of currentlyPlaying
    //14. playlist icon of currenly playing turns to pause
    //15. player icon turns to pause
    //16. click playlist icon of new song
    //17. playlist icon of new song turns to pause
    //18. playlist icon of what WAS currentlyPlaying turns to play
    //19. player icon remains pause
    //20. click toggle
    //21. playlist icon of currently playing turns to play
    //22. player icon turns to play

    var music = document.getElementById('music'); // id for audio element
    var duration; // Duration of audio clip
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline

    $scope.musicPlaying = false;
    var currentlyPlaying, currentAudioProvider; //this might need to become something on each factory

    // would be better...
    // QueuePlayerComm.on('changeSong', function() {
    //   currentlyPlaying == song ? $scope.toggle() : $scope.changeSong(song);
    //   return currentlyPlaying;
    // })

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
          // $scope.toggle();
          songChangeHandler();
          $scope.$apply();
        });
      } else {
        songChangeHandler();
        // $scope.toggle();
      }
      $scope.audioProvider.addEndedListener();
    }

    //function similar to toggle that will handle the swap of tracks
    //when a song is in the process of playing and another song is selected
    function switchTracks() {
      console.log('using switch tracks instead of scope.toggle')
      //need to set the OLD currentlyplaying.playing to play_arrow;
      currentAudioProvider.pause();
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

'use strict';

angular.module('splytApp')
  .controller('PlayerCtrl', function ($rootScope, $scope, AudioSources, QueuePlayerComm, Auth, $q, socket, LogoutFactory, $window) {
    var ext_id = "dekmhppoomofnjclcollpbdknpldlgnd";
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; //samuel mccords 'solid' chrome check

    // so player in the ext doesnt exist when tab is closed
    $window.addEventListener("beforeunload", function (event) {
      playerInit();
    });

    $scope.volume = 75;
    $rootScope.$on('user:login', setInitialVolume);
    function setInitialVolume() {
      $('.md-thumb-container').css({ '-webkit-transform' : 'translate3d(75px, 0px, 0px)' })
    }

    var music = document.getElementById('music'); // id for audio element
    var duration; // Duration of audio clip
    var pButton = document.getElementById('pButton'); // play button
    var playhead = document.getElementById('playhead'); // playhead
    var timeline = document.getElementById('timeline'); // timeline

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.currentUser = Auth.getCurrentUser();

    $scope.musicPlaying = false;
    var currentAudioProvider;
    $scope.currentlyPlaying;

    LogoutFactory.on('userLogout', function(){
      if($scope.audioProvider) $scope.audioProvider.stop('LOGOUT');
      $scope.currentlyPlaying = null;
    })

    $scope.$watch('volume', function(newValue, oldValue) {
      var x = 'translate3d(' + newValue + 'px, 0px, 0px)';
      $('.md-thumb-container').css({ '-webkit-transform' : x })
      if($scope.audioProvider) $scope.audioProvider.setVolume(newValue);
    })

    QueuePlayerComm.onChangeSong = function(song) {
      $scope.currentlyPlaying && $scope.currentlyPlaying._id == song._id ? $scope.toggle() : $scope.changeSong(song);
    }

    QueuePlayerComm.getSongsFromQueue = function(songs) {
      $scope.queue = songs;
    }

    QueuePlayerComm.giveCurrentlyPlaying = function() {
      return $scope.currentlyPlaying;
    }

    QueuePlayerComm.on('songDeletion', function(deletedSong){
      if($scope.musicPlaying && deletedSong._id == $scope.currentlyPlaying._id) {
        var nextSong = nextSongInQueue($scope.currentlyPlaying);
        $scope.audioProvider.stop(nextSong);
        if(nextSong == 'done') {
          $scope.musicPlaying = false;
          $scope.currentlyPlaying = null;
        } else {
          $scope.changeSong(nextSong);
        }
      }
    })

    function prevSongInQueue(song) {
      var toReturn = 'top';
      $scope.queue.forEach(function(s,i){
        if(song == s && i !== 0) {
          toReturn = $scope.queue[i-1];
        }
      })
      return toReturn;
    }

    $scope.prevSong = function() {
      if($scope.queue.length) $scope.currentlyPlaying ? $scope.changeSong(prevSongInQueue($scope.currentlyPlaying)) : $scope.changeSong($scope.queue[0]);
    }

    function nextSongInQueue(song) { //takes just played song and returns the next song in the queue
      var toReturn = 'done';
      $scope.queue.forEach(function(s, i){
        if(song == s && i !== $scope.queue.length - 1) {
          toReturn = $scope.queue[i+1];
        }
      })
      return toReturn;
    }

    $scope.nextSong = function() {
      if($scope.queue.length) $scope.currentlyPlaying ? $scope.changeSong(nextSongInQueue($scope.currentlyPlaying)) : $scope.changeSong($scope.queue[0]);
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
      tellExtension();
      QueuePlayerComm.trigger('globalPlayerToggle', $scope.currentlyPlaying);
    }

    $scope.changeSong = function(song, next, scTested) {
      if(song == 'done' || song == 'top') {
        if(song == 'done') { //only when playlist runs its course naturally reset or someone tries to hit >> on last song
          playhead.style.marginLeft = "0px";
          $scope.musicPlaying = false;
          $scope.currentlyPlaying.playing = 'play_arrow';
          $scope.currentlyPlaying = undefined;
          $scope.audioProvider.stop('LOGOUT');
          $scope.audioProvider = undefined;
          playerInit();
        }
        return; //queue is over
      }
      if(next) { //next will be sent as true from onEnded listener callbacks
        $scope.repeat ? $scope.changeSong($scope.currentlyPlaying) : $scope.changeSong(nextSongInQueue($scope.currentlyPlaying));
        return;
      }
      if(song.source == 'Spotify') {
        $scope.changeSong(nextSongInQueue(song)); //dont play spotify songs, just try to play the next
        return;
      }
      if($scope.currentlyPlaying) $scope.currentlyPlaying.playing = 'play_arrow';
      var songChangeHandler;
      $scope.musicPlaying ? songChangeHandler = switchTracks : songChangeHandler = $scope.toggle; //if a song was already playing, use switchTracks
      $scope.currentlyPlaying = song;
      currentAudioProvider = $scope.audioProvider;
      if(!scTested) {
        var songSourceHandled = handleSongSource(song);
        if(songSourceHandled == 'waiting') {
          return;
        }
      } else {
        var songSourceHandled = scTested;
      }
      var AudioSource = AudioSources[songSourceHandled];
      if($scope.repeat && songSourceHandled == 'SoundCloudNonstreamable') {
        currentAudioProvider.stop($scope.currentlyPlaying);
        songChangeHandler = switchSCWidgetTracks;
      }
      // ^ need to do this for SC widget songs bc SC widget is possibly the worst piece of technology in the world
      $scope.audioProvider = new AudioSource(song);
      if(typeof $scope.audioProvider.onReady === 'function') { //for soundcloud nonstreamable and youtube embeds
        $scope.audioProvider.onReady(function(){
          songChangeHandler();
          $scope.$apply();
        });
      } else {
        songChangeHandler();
      }
      $scope.audioProvider.addEndedListener(function() {
        $scope.changeSong(null, true);
        $scope.$apply();
      });
      addDuration();
      if($scope.audioProvider.timer) $scope.audioProvider.timer(function(pos){ timeUpdate(pos); });
    }

    //when a song is in the process of playing and another song is selected
    function switchTracks() {
      currentAudioProvider.stop($scope.currentlyPlaying);
      $scope.audioProvider.play();
      $scope.audioProvider.setVolume($scope.volume);
      QueuePlayerComm.trigger('globalPlayerToggle', $scope.currentlyPlaying);
    }

    //the SC widget is literally the worst technology on earth
    function switchSCWidgetTracks() {
      $scope.audioProvider.play();
      QueuePlayerComm.trigger('globalPlayerToggle', $scope.currentlyPlaying);
    }

    //tests whether sc gave a bullshit streamUrl thanks for NOTHING SC YOU RUINED EVERYTHING
    var aud = document.getElementById("tester");
    aud.onerror = function() {
      $scope.changeSong($scope.currentlyPlaying, false, 'SoundCloudNonstreamable')
    }

    aud.onloadeddata = function() {
      $scope.changeSong($scope.currentlyPlaying, false, 'SoundCloud')
    }

    function doubleCheckSource(src) {
      $('#tester').attr('src', src + '?client_id=7af759eb774be5664395ed9afbd09c46');
    }
    // end bs sc test //

    function handleSongSource(song) {
      if(song.source == 'SoundCloud') {
        if(song.audioSource) {
          doubleCheckSource(song.audioSource)
          return 'waiting';
        } else {
          return 'SoundCloudNonstreamable';
        }
      } else {
        return song.source;
      }
    }

    function addDuration() {
      $q.when($scope.audioProvider.duration()).then(function(dur){
        duration = dur;
      })
    }

    music.addEventListener("canplaythrough", function () {
      $q.when($scope.audioProvider.duration()).then(function(dur){
        duration = dur;
      })
    }, false);

    //visual player functionality
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth; // timeline width adjusted for playhead
    music.addEventListener("timeupdate", timeUpdate, false); // timeupdate event listener
    timeline.addEventListener("click", function (event) { //Makes timeline clickable
      moveplayhead(event);
      // if(music.currentTime) music.currentTime = duration * clickPercent(event); //need the if(music.currentTime) for when user tries to seek a youtube or sc widget song first
      $q.when($scope.audioProvider.duration()).then(function(dur){
        $scope.audioProvider.seek(dur*clickPercent(event))
        // music.addEventListener('timeupdate', timeUpdate, false);
      })
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
        // music.currentTime = duration * clickPercent(e);
        $q.when($scope.audioProvider.duration()).then(function(dur){
          $scope.audioProvider.seek(dur*clickPercent(e))
          music.addEventListener('timeupdate', timeUpdate, false);
        })
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
    }

    // Synchronizes playhead position with current point in audio
    function timeUpdate(currTime) {
      currTime = +currTime || $scope.audioProvider.currentTime();
      $q.when($scope.audioProvider.duration()).then(function(duration){
        var playPercent = timelineWidth * (currTime / duration);
        playhead.style.marginLeft = playPercent + "px";
      })
    }

    ////// chat with extension ///////
    function cb(res) {
      //console.log('Message sent!', res)
    }
    function tellExtension() { //tells extension when an UPDATE has been made to player
      if(is_chrome && chrome.runtime) {
        chrome.runtime.sendMessage(ext_id, { action: 'PLAYERUPDATE', method: $scope.musicPlaying },
         function(response) {
             cb(response);
         });
      }
    }

    //initializes 'player' in extension
    function playerInit() {
      if(is_chrome) {
        if(chrome.runtime) {
          chrome.runtime.sendMessage(ext_id, { action: 'PLAYERINIT', method: $scope.musicPlaying },
             function(response) {
                 cb(response);
             });
        }
      }
    }
    playerInit();

    socket.socket.on('updatePlayer', function(data){
      console.log('Socket received!')
      if($scope.currentlyPlaying && data.user._id == $scope.currentUser._id) $scope.toggle();
    })

    //repeat functionality
    $scope.repeat = false;
    $scope.toggleRepeat = function() {
      $scope.repeat ? $scope.repeat = false : $scope.repeat = true;
    }

    var rememberedVolume = $scope.volume;
    $scope.toggleMute = function() {
      if($scope.volume > 0) {
        rememberedVolume = $scope.volume;
        $scope.volume = 0;
        var x = 'translate3d(' + 0 + 'px, 0px, 0px)';
        $('.md-thumb-container').css({ '-webkit-transform' : x })
        if($scope.audioProvider) $scope.audioProvider.setVolume(0);
      } else {
        $scope.volume = rememberedVolume;
        var x = 'translate3d(' + rememberedVolume + 'px, 0px, 0px)';
        $('.md-thumb-container').css({ '-webkit-transform' : x })
        if($scope.audioProvider) $scope.audioProvider.setVolume(rememberedVolume);
      }
    }
  });

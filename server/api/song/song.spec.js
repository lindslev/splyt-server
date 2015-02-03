'use strict';

var should = require('should');
var app = require('../../app');
var Song = require('./song.model');

// var user = new User({
//   provider: 'local',
//   name: 'Fake User',
//   email: 'test@test.com',
//   password: 'password'
// });

var youtube_song = {
  userid: 1,
  song: {"action":"newYoutubeSong","method":"","args":{"info":{"kind":"youtube#videoListResponse","etag":"\"4FSIjSQU83ZJMYAO0IqRYMvZX98/_5UUyXhhR_hsY80buFNLXXNl30k\"","pageInfo":{"totalResults":1,"resultsPerPage":1},"items":[{"kind":"youtube#video","etag":"\"4FSIjSQU83ZJMYAO0IqRYMvZX98/UR1AAdXygvkiUEQjfYNOubm3aPs\"","id":"fMxIuFMgt4U","snippet":{"publishedAt":"2010-05-15T05:02:58.000Z","channelId":"UCD1g3LY8kFOekjdsmPHXcTA","title":"Best of Me - The Starting Line lyrics","description":"Tell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\nYou can have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we wont give up \r\n\r\nHere we lay again \r\nOn two separate beds \r\nRiding phone lines \r\nto meet a familiar voice \r\nAnd pictures drawn from memory \r\nWe reflect on miscommunications \r\nAnd misunderstandings \r\nAnd missing each other too \r\nMuch to have had to let go \r\n\r\nTurn our music down \r\nAnd we whisper \r\n\"Say what you're thinking right now\" \r\n\r\nTell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\nYou can have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we wont give up \r\n\r\nJumping to conclusions \r\nMade me fall away from you \r\nI'm so glad that the truth has brought back together me and you \r\n\r\nWe're sitting on the ground and we whisper \r\n\"Say what you're thinking out loud\" \r\n\r\nTell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\nYou can have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we wont give up \r\n\r\nTurn our music down \r\nAnd we whisper \r\nWe're sitting on the ground \r\nAnd we whisper \r\nWe turn our music down \r\nWe're sitting on the ground \r\nThe next time I'm in town \r\nWe will kiss girl \r\nWe will kiss girl \r\n\r\nTell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\ncan have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we won't \r\nFeeling that we can't \r\nThat were not ready to give up \r\n\r\nWe got older, but we're still young \r\nWe never grew out of this feeling that we wont give up","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/fMxIuFMgt4U/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/fMxIuFMgt4U/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/fMxIuFMgt4U/hqdefault.jpg","width":480,"height":360}},"channelTitle":"aubschoosesjoy411","categoryId":"10","liveBroadcastContent":"none","localized":{"title":"Best of Me - The Starting Line lyrics","description":"Tell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\nYou can have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we wont give up \r\n\r\nHere we lay again \r\nOn two separate beds \r\nRiding phone lines \r\nto meet a familiar voice \r\nAnd pictures drawn from memory \r\nWe reflect on miscommunications \r\nAnd misunderstandings \r\nAnd missing each other too \r\nMuch to have had to let go \r\n\r\nTurn our music down \r\nAnd we whisper \r\n\"Say what you're thinking right now\" \r\n\r\nTell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\nYou can have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we wont give up \r\n\r\nJumping to conclusions \r\nMade me fall away from you \r\nI'm so glad that the truth has brought back together me and you \r\n\r\nWe're sitting on the ground and we whisper \r\n\"Say what you're thinking out loud\" \r\n\r\nTell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\nYou can have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we wont give up \r\n\r\nTurn our music down \r\nAnd we whisper \r\nWe're sitting on the ground \r\nAnd we whisper \r\nWe turn our music down \r\nWe're sitting on the ground \r\nThe next time I'm in town \r\nWe will kiss girl \r\nWe will kiss girl \r\n\r\nTell me what you thought about when you were gone \r\nAnd so alone \r\nThe worst is over \r\ncan have the best of me \r\nWe got older \r\nBut we're still young \r\nWe never grew out of this feeling that we won't \r\nFeeling that we can't \r\nThat were not ready to give up \r\n\r\nWe got older, but we're still young \r\nWe never grew out of this feeling that we wont give up"}}}]},"iframeSrc":"https://www.youtube.com/embed/fMxIuFMgt4U?feature=oembed&enablejsapi=1&origin=http://safe.txmblr.com&wmode=opaque","song":{"permalink_url":"https://www.youtube.com/watch?v=fMxIuFMgt4U","title":"Best of Me - The Starting Line lyrics"}}},
  playlist: 1
}


describe('Song Model', function() {
  before(function(done) {
    // Clear users before testing
    Song.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Song.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no songs', function(done) {
    Song.find({}, function(err, songs) {
      songs.should.have.length(0);
      done();
    });
  });

  it('should add a Youtube song', function(done) {
    Song.createYoutube(youtube_song, function(err, createdSong) {

      createdSong.id.should.equal('fMxIuFMgt4U');
      createdSong.title.should.equal(' The Starting Line lyrics');
      createdSong.artist.should.equal('Best of Me ');
      createdSong.link.should.equal('https://www.youtube.com/watch?v=fMxIuFMgt4U');
      createdSong.source.should.equal('YouTube');
      done();
    });
  });

});


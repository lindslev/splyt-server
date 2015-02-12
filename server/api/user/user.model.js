'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var Song = require('../song/song.model');
var Playlist = require('../playlist/playlist.model');
var _ = require('lodash');

var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user'
    },
    hashedPassword: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    github: {},
    status: {
        type: String,
        enum: ['private', 'public']
    },
    subscriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    playlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'role': this.role
        };
    });

/**
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('hashedPassword')
    .validate(function(hashedPassword) {
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return hashedPassword.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({
            email: value
        }, function(err, user) {
            if (err) throw err;
            if (user) {
                if (self.id === user.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
            next(new Error('Invalid password'));
        else
            next();
    });

//create aggregate default playlist
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();
        var that = this;
        Playlist.create({
            title: 'Default',
            aggregate_stream: true
        }, function(err, data) {
            if (err) return err;
            that.playlist.push(data._id);
            next();
        });
    });
//create aggregate spotify bookmarks
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();
        var that = this;
        Playlist.create({
            title: 'Spotify Bookmarks',
            aggregate_stream: true
        }, function(err, data) {
            if (err) return err;
            that.playlist.push(data._id);
            next();
        });
    });

//create friends' stream playlist
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();
        var that = this;
        Playlist.create({
            title: 'Friends Music',
            friend_stream: true
        }, function(err, data) {
            if (err) return err;
            that.playlist.push(data._id);
            next();
        });
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },

    //user adds new song
    addSong: function(song_obj, cb) {
      Song.createSong(song_obj, function(err, song) {
        cb(err, song);
      });
    }
};

/**
 * Statics
 */
UserSchema.statics = {
    /**
   * Populates user with playlist objects
   *
   */
  getPlaylists : function(userId, done) {
    this.findById(userId).populate('playlist').exec(function(err, user){
          done(err, user);
    })
  },
      /**
   * Populates user with followers and subscriptions objects
   *
   */
  getFollowersandSubscriptions : function(userId, done) {
    this.findById(userId).populate('subscriptions followers').exec(function(err, user){
          done(err, user);
    })
  },

    /**
   * Sends new song to followers
   *
   */
  propagateToFollowers : function(song, follower_array, cb) {
    var Users = this;
    _.forEach(follower_array, function(id) {
      Users.findById(id).populate('playlist').exec(function(err, user){
         _.forEach(user.playlist, function(playlist) {
          if (playlist.friend_stream === true) {
           Playlist.findByIdAndUpdate(playlist._id,
            { $push: { "songs" : song }},
            { safe: true, upsert: true },
            function( err, model ) {
              cb(err, model);
            }
          );
         }
        });
      })
    });
  },
  /**
   * Populates user with playlist objects
   *
   */
  savePlaylist: function(userId, playlistobj, cb) {
      this.findByIdAndUpdate(userId,
        {$push: {'playlist': playlistobj}},
        { safe: true, upsert: true },
        function(err, model) {
          cb(err, model);
      })
  },

    /**
   * Set Subscription
   *
   */
  setSubscription: function(currentUser, subscription, cb) {
    var Users = this;
      this.findByIdAndUpdate(currentUser,
        {$push: {'subscriptions': subscription._id}},
        { safe: true, upsert: true },
        function(err, model) {
            Users.findByIdAndUpdate(subscription._id,
                {$push: {'followers': currentUser}},
                { safe: true, upsert: true},
                function (err, model2) {
                    console.log('model2', model2);
                    cb(err, model, model2);

                });
      })
  },
      /**
   * Remove Subscription
   *
   */
  removeSubscription: function(currentUser, removeSubscription, cb) {
    var Users = this;
      this.findByIdAndUpdate(currentUser,
        {$pull: {'subscriptions': removeSubscription._id}},
        function(err, data){
            console.log('first errrrrr', err);
            console.log('first data', data);
            Users.findByIdAndUpdate(removeSubscription._id,
                {$pull: {'followers': currentUser}},
                function(err, data2){
                    console.log('second errrrrr', err);
                    console.log('second data', data2);
                    cb(err, data, data2);
                })
      })
  }
};


module.exports = mongoose.model('User', UserSchema);

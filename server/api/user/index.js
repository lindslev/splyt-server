'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var cors = require('cors');

var router = express.Router();
router.use(cors());

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id/playlists', auth.isAuthenticated(), controller.getPlaylists);
router.get('/name/:name', auth.isAuthenticated(), controller.getUsers);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/social/:id', auth.isAuthenticated(), controller.getFollowersandSubscriptions);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/addSong/:id/playlist/:listid', controller.addSong); //should be auth.isAuthenitcated(), controller..
router.post('/', controller.create);
router.post('/:id', controller.setSubscription);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.post('/subscription/:id', auth.isAuthenticated(), controller.removeSubscription);

module.exports = router;

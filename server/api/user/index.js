'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var cors = require('cors');

var router = express.Router();
router.use(cors());

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id/playlists', auth.isAuthenticated(), controller.getPlaylists);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/addSong/:id/playlist/:listid', auth.isAuthenticated(), controller.addSong);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;

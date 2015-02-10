'use strict';

var express = require('express');
var controller = require('./playlist.controller');
var cors = require('cors');

var router = express.Router();
router.use(cors());

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/user/:id', controller.create);
router.post('/playlist/:id/song/:songid', controller.addSong);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/:id/song/:songid', controller.removeSongfromPlaylist)

module.exports = router;

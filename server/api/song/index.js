'use strict';

var express = require('express');
var controller = require('./song.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/youtube/:id', controller.createYoutube);
router.post('/soundcloud/:id', controller.createSoundcloud);
router.post('/spotify/:id', controller.createSpotify);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
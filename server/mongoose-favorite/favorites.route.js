const express = require('express');
const controller = require('./favorite.controller');

const router = express.Router();
const PATH = '/api/user/favourites';

router.put(PATH, [], controller.save);
router.get(PATH, [], controller.findAll);
router.delete(PATH, [], controller.remove);

module.exports = router;

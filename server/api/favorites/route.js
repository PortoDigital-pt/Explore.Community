const express = require('express');
const controller = require('./controller');
const { userAuthenticated } = require('../../passport-openid-connect/utils');

const router = express.Router();
const PATH = '/api/user/favourites';

router.put(PATH, [userAuthenticated], controller.save);
router.get(PATH, [userAuthenticated], controller.findAll);
router.delete(PATH, [userAuthenticated], controller.remove);

module.exports = router;

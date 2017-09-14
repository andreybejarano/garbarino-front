const express = require('express');
const router = express.Router();

const home = require('./home/home-controller');
router.get('/', home.getHome);

module.exports = router;

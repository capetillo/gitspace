var express = require('express');
var router = express.Router();
var profilesCtrl = require('../controllers/profiles')

router.get('/', profilesCtrl.index)

module.exports = router
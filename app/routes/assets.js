'use strict';

var express = require('express');
var ctlr_assets = require('../controllers/assets');
var nconf = require('nconf');

module.exports = function (app) {

    var router = express.Router();

    router.route('*')
        .get(ctlr_assets.staticgenerated);


    app.use('/staticgenerated', router);

    app.use('/staticfiles', express.static(nconf.get().theme.folder + "/files"));


};

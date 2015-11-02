'use strict';

var express = require('express');

var ctlr_api = require('../controllers/api');

module.exports = function (app) {

    var router = express.Router();

    router.route('/theme/changed')
        .get(ctlr_api.themechanged);

    router.route('/clearcache')
        .get(ctlr_api.clearcache);

    app.use('/api', router);


};

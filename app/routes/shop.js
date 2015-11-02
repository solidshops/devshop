'use strict';

var express = require('express');

var ctlr_shop = require('../controllers/shop');


module.exports = function (app) {

    var router = express.Router();

    router.route('*')
        .all(ctlr_shop.render);


    app.use('*', router);
};

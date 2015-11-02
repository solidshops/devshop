'use strict';

var service_theme = require('../services/theme.js');
var service_proxy = require('../services/proxy.js');
var nconf = require('nconf');

exports.themechanged = function (req, res) {

    var obj_theme = new service_theme();


    obj_theme.update(nconf.get().theme.id, function (err, responseObject) {
        if (!responseObject.success) {
            res.status(400);
        }
        //console.log(responseObject);
        res.json(responseObject);

    });


};


exports.clearcache = function (req, res) {

    var obj_proxy = new service_proxy();

    obj_proxy.clearCache();

    res.json({"success": true});
};
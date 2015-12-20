'use strict';

var service_theme = require('../services/theme.js');
var proxy = require('../services/proxy.js');
var  nconf = require('nconf');

exports.render = function (req, res) {

    if (nconf.get('theme:error_sync')) {
        res.status(400);
        res.end(nconf.get('theme:error_sync'));
    } else {
        //console.log(req.headers['cookie']);
        var obj_proxy = new proxy();
        var configObject = {};
        configObject.method = req.method;
        configObject.path = req.originalUrl;//req.params[0];
        configObject.url = req.protocol + "://" + req.get('host') + req.originalUrl;
        // configObject.cartId =  req.session.id;
        configObject.payload = req.rawBody;

        if (req.headers.hasOwnProperty("x-solidshops-themeid")) {
            configObject.themeId = req.headers['x\-solidshops\-themeid'];
        } else {
            configObject.themeId = nconf.get().theme.id;
        }
        configObject.referer = req.headers['referer'];

        configObject.sessionId = req.cookies['PHPSESSID'];
        configObject.header_cookie = req.headers['cookie'];

        obj_proxy.request(configObject, function (responseObject) {
            //console.log(responseObject.headers)


            if (responseObject.success) {
                res.status(responseObject.statusCode);
                res.set(responseObject.headers);
                res.end(responseObject.payload);
            } else {
                res.end("fail");
            }


        });

    }


};
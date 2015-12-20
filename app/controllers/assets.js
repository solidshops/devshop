'use strict';

var nconf = require('nconf');
var proxy = require('../services/proxy.js');

exports.staticgenerated = function (req, res) {
    var obj_proxy = new proxy();


    // /367/themes/2/2240.css?20150725153933
    var scheme = "https";
    var domain = nconf.get().static.domain;

    var path = "/" + nconf.get().shop.id + "/themes/" + nconf.get().theme.id + req.originalUrl.replace('/staticgenerated', '');

    var url_request = scheme + "://" + domain + path;


    var request = require('request');
    request(url_request, function (error, response, body) {
        //if (!error && response.statusCode == 200) {
        /*var h = {};
        for (var i in response.rawHeaders) {
            if ((i % 2 === 0) || i === 0) {
                h[response.rawHeaders[i]] = response.rawHeaders[Number(i) + 1];
            }
        }*/
        var h = {
            'Content-Type': response.headers['content-type']
        };

        res.set(h);

        res.status(response.statusCode);

        res.send(obj_proxy.replaceLinks(body));
        //}
    });


};
'use strict';

var NodeCache = require("node-cache"),
    myCache = new NodeCache({stdTTL: 100, checkperiod: 120}),
    fs = require("fs"),
    request = require('request'),
    nconf = require('nconf'),
    querystring = require('querystring');

var service_proxy = require('./proxy.js');

module.exports = function () {


    this.get = function (callback) {
        var uri = nconf.get().api.scheme + "://" + nconf.get().api.domain + '/v1/shops/' + nconf.get().api.auth.basic.user;

        request(
            {
                method: 'GET'
                , 'json': true
                , uri: uri
                , 'auth': {
                'user': nconf.get().api.auth.basic.user,
                'pass': nconf.get().api.auth.basic.password,
                'sendImmediately': true
            }
            }
            , function (error, response, body) {
                if (response.statusCode == 401) {
                    callback('API authentication failed', null);
                    return;
                }

                var returnObject = {};
                returnObject.success = body.success;
                returnObject.data = body.data;


                callback(null, returnObject);


            });


    };


};



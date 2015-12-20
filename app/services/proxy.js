'use strict';

var NodeCache = require("node-cache"),
    myCache = new NodeCache({stdTTL: 100, checkperiod: 120}),
    fs = require("fs"),
    request = require('request'),
    nconf = require('nconf'),
    querystring = require('querystring'),
    path = require('path'),
    url = require("url");
//request = request.defaults({jar: true});


String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


var arr_sessions = [];
//j = request.jar()
module.exports = function () {


    /*
     optionsObject = {
     method: GET|POST|...
     path : "/product/name"
     payload : "string"
     cartId : "12313";
     themeId : 1
     header_cookie : "sdfsdf"
     url: "http://192.168.2.1:3000/template"
     referer = "http://referer"
     }

     responseObject = {
     success : true
     statusCode : 200
     headers : {}
     payload : "string"
     }

     */

    this.request = function (optionsObject, callback) {
        var key_cache = "payload-" + optionsObject.sessionId + "-" + optionsObject.path;
        var cartId = optionsObject.cartId;
        //console.log(cartId);


        var value;
        if (nconf.get().cache && optionsObject.method == "GET") {
            value = myCache.get(key_cache);
            if (value !== undefined) {
                callback(value);
                return;
            }

        }


        //headers
        var headersObject = {};
        if (optionsObject.themeId) {
            headersObject["X-SolidShops-ThemeId"] = optionsObject.themeId;
        }
        headersObject["X-SolidShops-Url"] = optionsObject.url;
        headersObject["cookie"] = optionsObject.header_cookie;
        headersObject["Referer"] = optionsObject.referer;
        //jar
        /* var j = null;
         if( arr_sessions[cartId] === undefined ) {
         j = request.jar()
         }else{
         j = arr_sessions[cartId];
         }*/

        var requestOptionsObject = {};
        requestOptionsObject.headers = headersObject;
        requestOptionsObject.method = optionsObject.method;
        var x = nconf.get();
        requestOptionsObject.uri = nconf.get().www.scheme + "://" + nconf.get().www.domain + optionsObject.path;
        //requestOptionsObject.jar= j;
        requestOptionsObject.followRedirect = false;
        if (optionsObject.payload !== "") {
            requestOptionsObject.form = decodeURIComponent(optionsObject.payload);
        }


        request(
            requestOptionsObject
            , function (error, response, body) {
                //arr_sessions[cartId] = j;
                var returnObject = {};

                if (error) {
                    //console.log(error);
                    returnObject.success = false;
                    returnObject.statusCode = 500;
                    callback(returnObject);
                } else {
                    var str_body = replaceLinks(body);

                    returnObject.success = true;
                    returnObject.statusCode = response.statusCode;

                    returnObject.headers = response.headers;
                    /*var h = {};
                    for (var i in response.rawHeaders) {
                        if ((i % 2 === 0) || i === 0) {
                            h[response.rawHeaders[i]] = response.rawHeaders[Number(i) + 1];
                        }
                    }
                    returnObject.headers = h;
                    */
                    if (returnObject.headers["location"]) {
                        returnObject.headers["location"] = replaceLinks(returnObject.headers["location"]);
                    }
                    
                    //delete returnObject.headers['set-cookie'];
                    delete returnObject.headers['content-length'];
                    
                    //console.log(returnObject);

                    returnObject.payload = str_body;


                    if (nconf.get().cache) {
                        if (optionsObject.method != "GET") {
                            myCache.flushAll();
                        } else {
                            myCache.set(key_cache, returnObject, 60 * 60 * 24);
                        }
                    }

                    callback(returnObject);

                }

            });


    };


    this.replaceLinks = replaceLinks;


    this.clearCache = function () {

        myCache.flushAll();


    };


};

var replaceLinks = function replaceLinks(str) {

    var url_own = "http://" + nconf.get().server.host + ":" + nconf.get().server.port;
    var url_static_http = "http://" + nconf.get().static.domain;
    var url_static_https = "https://" + nconf.get().static.domain;

    //replace shop domain
    str = str.replaceAll(nconf.get().www.scheme + "://" + nconf.get().www.domain, url_own);

    //replace static domain
    var obj_url_shop = url.parse(nconf.get().shop.url.site);
    var ext_url_shop = path.extname(obj_url_shop.host);

    //https://static.solidshops.dev/367/themes/2/files/images/body_bg.gif
    var url_themefiles_https_server = url_static_https + "/" + nconf.get().shop.id + "/themes/" + nconf.get().theme.id + "/files";
    var url_themefiles_http_server = url_static_http + "/" + nconf.get().shop.id + "/themes/" + nconf.get().theme.id + "/files";
    var url_themefiles_local = url_own + "/staticfiles";
    str = str.replaceAll(url_themefiles_https_server, url_themefiles_local);
    str = str.replaceAll(url_themefiles_http_server, url_themefiles_local);

    //https://static.solidshops.dev/367/themes/2/2240.css?20150725153933
    var url_themesgenerated_https_server = url_static_https + "/" + nconf.get().shop.id + "/themes/" + nconf.get().theme.id;
    var url_themesgenerated_http_server = url_static_http + "/" + nconf.get().shop.id + "/themes/" + nconf.get().theme.id;
    var url_themesgenerated_local = url_own + "/staticgenerated";
    str = str.replaceAll(url_themesgenerated_https_server, url_themesgenerated_local);
    str = str.replaceAll(url_themesgenerated_http_server, url_themesgenerated_local);

    return str;
};

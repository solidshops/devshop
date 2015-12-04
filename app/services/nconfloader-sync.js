'use strict';

var nconf = require('nconf');
var path = require('path');
var fs = require('fs');
var url = require('url');
var g_count = 0;


//FILE: read config
var file_config = global.__base + '/config/config.json';
if (!fs.existsSync(file_config)) {
    throw new Error('The following config file is not valid: ' + file_config);
}
nconf.use('file', {file: file_config});
nconf.set('static:domain', nconf.get().api.domain.replace("api", "static"));
//console.log(nconf.get().theme.folder);


//API: load shop
var service_shop = require('./shop.js');
var obj_shop = new service_shop();
obj_shop.get(function (err, responseObject) {
    if (err) {
        throw new Error(err);
    }
    var url_shop = url.parse(responseObject.data.url.site);

    nconf.set('www:scheme', url_shop.protocol.replace(":", ""));
    nconf.set('www:domain', url_shop.host);


    nconf.set('shop:id', responseObject.data.id);
    nconf.set('shop:url', responseObject.data.url);
    g_count++;
});

//API: upload theme
var service_theme = require('./theme.js');
var obj_theme = new service_theme();
var optionsObject = {};

obj_theme.getLocalDevelopmentTheme(function (id) {

    if (nconf.get().theme.id) {
        optionsObject.id = nconf.get().theme.id;
        obj_theme.update(nconf.get().theme.id, function (err, responseObject) {
            //console.log(responseObject);
            g_count++;
            if (responseObject.success) {

            } else {
                console.error("error while uploading theme(update):");
                console.error(responseObject.error);
            }

        });
    } else {
        obj_theme.create(function (err, responseObject) {
            //console.log("callback theme");
            g_count++;
            if (responseObject.success) {

            } else {
                console.error("error while uploading theme(create):");
                console.error(responseObject.error);
            }
        });
    }

});


require('deasync').loopWhile(function () {
    return g_count < 2;
});
'use strict';

var NodeCache = require("node-cache"),
    myCache = new NodeCache({stdTTL: 100, checkperiod: 120}),
    fs = require("fs"),
    request = require('request'),
    nconf = require('nconf'),
    querystring = require('querystring'),
    path = require('path'),
    service_proxy = require('./proxy.js');

module.exports = function () {

    this.deploy = function (options, callback) {
        //var appDir = path.dirname(require.main.filename);
        var zipFile = global.__base + 'data/theme.zip';
        //console.log(zipFile);
        //https://github.com/archiverjs/node-archiver/blob/master/examples/pack-zip.js
        var archiver = require('archiver');
        var archive = archiver.create('zip', {});

        var d = nconf.get().theme.folder;


        var output = fs.createWriteStream(zipFile);

        output.on('close', function () {
            //console.log(archive.pointer() + ' total bytes');
            //console.log('archiver has been finalized and the output file descriptor has closed.');


            var formData = {
                //x : "sdf",
                assets: fs.createReadStream(zipFile),
            };

            request(
                {
                    method: 'POST'
                    , formData: formData
                    , uri: nconf.get().api.scheme + "://" + nconf.get().api.domain + '/v1/themes'
                    , 'auth': {
                    'user': nconf.get().api.auth.basic.user,
                    'pass': nconf.get().api.auth.basic.password,
                    'sendImmediately': true
                }
                }
                , function (error, response, body) {
                    /*if(response.statusCode == 401){
                     callback('API authentication failed',null);
                     return;
                     }*/
                    var bodyObject = JSON.parse(body);

                    var returnObject = {};
                    returnObject.success = bodyObject.success;
                    if (bodyObject.success) {
                        returnObject.data = bodyObject.data;
                    } else {
                        var errorObject = bodyObject.errors[0];
                        if (errorObject.code == "A0052") {
                            returnObject.error = errorObject.message + "in file " + errorObject.field;
                        }

                    }


                    callback(null, returnObject);


                });


        });

        archive.on('error', function (err) {
            throw err;
        });


        archive.pipe(output);
        archive.directory(d, "/");
        archive.finalize();


    };


    this.getLocalDevelopmentTheme = function (callback) {

        var method = "GET";
        var uri = nconf.get().api.scheme + "://" + nconf.get().api.domain + '/v1/themes?name=devshop-theme';

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
                /*if(response.statusCode == 401){
                 callback('API authentication failed',null);
                 return;
                 }*/
                if (response.statusCode != 200) {
                    callback(null);
                } else {
                    if (body.data.length > 0) {
                        var id = body.data[0].id;
                        nconf.set('theme:id', id);
                        callback(id);
                    } else {
                        callback(null);
                    }
                }

            });

    };

    this.create = function (callback) {
        getDiskConfigAsObject(nconf.get().theme.folder + "/", function (err, templatesObject) {
            var returnObject = {};

            if (err) {
                returnObject.success = false;
                returnObject.error = err;
                nconf.set('theme:error_sync', err);
                return callback(null, returnObject);
            }

            var themeObject = {};
            themeObject.name = "devshop-theme";
            themeObject.assets = templatesObject;


            var uri = "";
            var method = "";

            method = "POST";
            uri = nconf.get().api.scheme + "://" + nconf.get().api.domain + '/v1/themes';
            //console.log(uri);


            var contents = fs.writeFileSync("./write_file.txt", JSON.stringify(themeObject));
            request(
                {
                    method: method
                    , 'body': themeObject
                    , 'json': true
                    , uri: uri
                    , 'auth': {
                    'user': nconf.get().api.auth.basic.user,
                    'pass': nconf.get().api.auth.basic.password,
                    'sendImmediately': true
                }
                }
                , function (error, response, body) {
                    /*if(response.statusCode == 401){
                     callback('API authentication failed',null);
                     return;
                     }*/
                     //console.log(body);
                     returnObject.success = body.success;
                     if(body.success){
                         returnObject.data = body.data;
                         nconf.set('theme:id', body.data.id);
                         nconf.set('theme:error_sync', "");
                     }else{
                         var errorObject = body.errors[0];
                         if(errorObject.code == "A0052"){
                             returnObject.error = errorObject.message + "in file "+ errorObject.field;
                             nconf.set('theme:error_sync', returnObject.error);
                         }

                    }

                    var obj_proxy = new service_proxy();
                    obj_proxy.clearCache();


                    callback(null, returnObject);


                });


        });
    };

    this.update = function (id, callback) {
        getDiskConfigAsObject(nconf.get().theme.folder + "/", function (err, templatesObject) {
            var returnObject = {};

            if (err) {
                returnObject.success = false;
                returnObject.error = err;
                nconf.set('theme:error_sync', err);
                return callback(null, returnObject);
            }
            var themeObject = {};
            themeObject.name = "devshop-theme";
            themeObject.assets = templatesObject;


            var method = "PUT";
            var uri = nconf.get().api.scheme + "://" + nconf.get().api.domain + '/v1/themes/' + id;

            var contents = fs.writeFileSync("./write_file.txt", JSON.stringify(themeObject));
            request(
                {
                    method: method
                    , 'body': themeObject
                    , 'json': true
                    , uri: uri
                    , 'auth': {
                    'user': nconf.get().api.auth.basic.user,
                    'pass': nconf.get().api.auth.basic.password,
                    'sendImmediately': true
                }
                }
                , function (error, response, body) {
                    /*if(response.statusCode == 401){
                     callback('API authentication failed',null);
                     return;
                     }*/
                    //console.log(body);


                    returnObject.success = body.success;
                    if (body.success) {
                        returnObject.data = body.data;
                        nconf.set('theme:id', body.data.id);
                        nconf.set('theme:error_sync', "");
                    } else {
                        var errorObject = body.errors[0];
                        if (errorObject.code == "A0052") {
                            returnObject.error = errorObject.message + "in file " + errorObject.field;
                            nconf.set('theme:error_sync', returnObject.error);
                        }

                    }


                    var obj_proxy = new service_proxy();
                    obj_proxy.clearCache();


                    callback(null, returnObject);


                });


        });
    };

    this.delete = function (id, callback) {

        var method = "DELETE";
        var uri = nconf.get().api.scheme + "://" + nconf.get().api.domain + '/v1/themes/' + id;

        //var contents = fs.writeFileSync("./write_file.txt",JSON.stringify(themeObject));
        request(
            {
                method: method
                , 'json': true
                , uri: uri
                , 'auth': {
                'user': nconf.get().api.auth.basic.user,
                'pass': nconf.get().api.auth.basic.password,
                'sendImmediately': true
            }
            }
            , function (error, response, body) {
                /*if(response.statusCode == 401){
                 callback('API authentication failed',null);
                 return;
                 }*/
                var returnObject = {};
                returnObject.success = body.success;


                var obj_proxy = new service_proxy();
                obj_proxy.clearCache();


                callback(null, returnObject);


            });

    };


};


function getDiskConfigAsObject(folder, callback) {
    if (!fs.existsSync(folder)) {
        console.log("folder does not exist");
        return callback("folder does not exists", null);
    }

    var objTwig = {};

    var arr_folders = ["css", "js", "template", "partial", "lang"];
    for (var i in arr_folders) {
        objTwig[arr_folders[i]] = getFiles(folder + arr_folders[i]);

        if (objTwig[arr_folders[i]].length === 0) {
            switch (arr_folders[i]) {
                case "template":
                    objTwig[arr_folders[i]] = getFiles(folder + "templates");
                    break;
                case "partial":
                    objTwig[arr_folders[i]] = getFiles(folder + "partialss");
                    break;
            }
        }


    }
    //console.log(objTwig);
    return callback(null, objTwig);


}


function getFiles(dir) {
    var arr_files = [];
    var arr_allowedextensions = [".json",".twig",".html",".css",".js"];

    if (fs.existsSync(dir)) {
        var files = fs.readdirSync(dir);
        for (var i in files) {
            var filename = dir + '/' + files[i];
            //console.log(filename);
            if (fs.lstatSync(filename).isFile()) {
                var file_ext = path.extname(files[i]);
                if(arr_allowedextensions.indexOf(file_ext)>-1){
                    var objFile = {};
                    objFile.name = files[i];
                    objFile.content = fs.readFileSync(filename).toString();
                    arr_files.push(objFile);
                }
            }

        }
    }
    return arr_files;
}




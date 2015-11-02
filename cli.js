process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
global.__base = __dirname + '/';

var program = require('commander');
var request = require('request');
var chalk = require('chalk');
var nconf = require('nconf');


nconf.use('file', { file: './config/config.json' });


program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-d, --deploy', 'Deploy')
    .parse(process.argv);

//console.log(program);

if(program.deploy) {
	console.log("Starting upload...");
	
	var service_theme = require('./app/services/theme.js');
	var obj_theme = new service_theme();

    var optionsObject = {};        

    obj_theme.deploy(optionsObject,function(err,responseObject){
    	//console.log(responseObject);
    	if(responseObject.success){
    		console.log("Upload succeeded.");
			process.exit(0);
    	}else{
    		console.log("Upload failed.");
			console.log(responseObject.error);
    		process.exit(1);
    	}
        
    });

}else{
	program.help();
}

// Node settings
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
global.__base = __dirname + '/';

// Dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var chalk = require('chalk');
var logger = require('morgan');
var nconf = require('nconf');
var fs = require('fs');
var semver = require('semver');

//shutdown application if node version is not compatible
var packageString = fs.readFileSync("package.json", "utf8");
packageJson = JSON.parse(packageString);
var versionPackage = packageJson.engines['node']; 
if( ! semver.satisfies(process.version,versionPackage)){
	console.log("node version is not compatible, needs " + versionPackage);
	process.exit();
}


// Create Express app
var app = express();

//load config
var nconf_loadeer = require('./app/services/nconfloader-sync.js');

//load middleware
if(process.env.NODE_ENV != 'test'){
	app.use(logger('dev'));
}

app.use(require('./app/middleware/payload.js')());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//enable cors so fonts are loaded
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Include routes 
var routes = require('./app/routes')(app);


// Error handling middleware should be loaded after the loading the routes
app.use(errorHandler());



// Start server
var server = app.listen(nconf.get().server.port, function(){
    console.log(chalk.white.bgBlue.bold(' S ') +
        ' ' + chalk.grey.bgBlack('SolidShops development environment listening on port ' + 'http://'+nconf.get().server.host + ":"+ nconf.get().server.port + ' '));
});
server.on('checkContinue', function(req, res){
    req.checkContinue = true;
    app(req, res);
});


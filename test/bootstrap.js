// Environment
process.env.NODE_ENV = 'test';

// Dependencies
global.should = require('chai').should(),
global.expect = require('chai').expect,
global.supertest = require('supertest'),
global.async = require('async'),
global.request = require('request'),
global.nock = require('nock'),
global.nconf = require('nconf');
global.fs = require('fs');

// Start the application
global.app = require('../app.js');

// Config
global.st = supertest('http://'+nconf.get().server.host+':' + nconf.get().server.port);




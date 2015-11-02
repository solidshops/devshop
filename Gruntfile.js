module.exports = function(grunt) {

    var solidshopsConfig = grunt.file.readJSON('config/config.json');

    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch','jshint::myFiles'],
                options: {
                  logConcurrentOutput: true
                }
              }
        },
        exec: {
          deploy: 'node cli.js -d'
        },
        http: {
            theme: {
                options: {
                    url: 'http://'+solidshopsConfig.server.host+':'+solidshopsConfig.server.port+'/api/theme/changed',
                }
            },
        },
        watch: {
            theme: {
                //files: solidshopsConfig.theme.folder  +"/solidshops.modified", //+
                files: [
                    solidshopsConfig.theme.folder+ '/**/*.js',
                    solidshopsConfig.theme.folder+ '/**/*.css',
                    solidshopsConfig.theme.folder+ '/**/*.twig',
                    solidshopsConfig.theme.folder+ '/**/*.html',
                    solidshopsConfig.theme.folder+ '/**/*.json'
                ],
                tasks: ['http:theme'],
                options: {
                    livereload: true,
                }
            },
        },
        nodemon: {
          dev: {
            script: 'app.js',
            options: {
              nodeArgs: [],
              env: {
                PORT: '5455'
              }

            }
          }
        },
        jshint: {
            options : {
                node: true,
                laxcomma:true,
                sub:true,
                curly: true,
                mocha: true,
                expr: true
            },
            myFiles: ['app/**/*.js','test/**/*.js']
        },
    });


    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [  'watch']);
    grunt.registerTask('serve', [  'concurrent']);
    grunt.registerTask('deploy', [  'exec:deploy']);

};
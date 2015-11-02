// Config
var theme = require('../../app/services/theme.js');



before(function (done) {
  done();
});

after(function (done) {
    // Clean up the stubs and mocks
    done();
});

function validateApiResponse(responseObject){
  //console.log(responseObject);
  expect(responseObject.success).to.equals(true);

}
var obj_theme = new theme();

describe('Service: Theme', function () {
        themeId = "";

        beforeEach(function (done) {
           done();
        });

        it('create a new theme', function (done) {

                obj_theme.create(function(err,responseObject){
                    themeId = responseObject.data.id;
                    validateApiResponse(responseObject);
                    done();
                });

        });


        it('update existing theme', function (done) {

            obj_theme.update(themeId,function(err,responseObject){
                expect(responseObject.data.id).to.equals(themeId);
                validateApiResponse(responseObject);
                done();
            });

        });

        it('delete existing theme', function (done) {

            obj_theme.delete(themeId,function(err,responseObject){
                validateApiResponse(responseObject);
                done();
            });

        });

        it('deploy theme', function (done) {
            var optionsObject = {};        

            obj_theme.deploy(optionsObject,function(err,responseObject){
                var themeId = responseObject.id;
                expect(responseObject.success).to.equals(true);
                //console.log(responseObject.id);
                //console.log(themeId);
                obj_theme.delete(themeId,function(err,responseObject){
                    validateApiResponse(responseObject);
                    done();
                });

            });

        });


});
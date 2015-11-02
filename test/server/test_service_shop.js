// Config
var shop = require('../../app/services/shop.js');



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
var obj_shop = new shop();

describe('Service: api', function () {

        beforeEach(function (done) {
           done();
        });

        it('get info', function (done) {

            obj_shop.get(function(err,responseObject){
                    validateApiResponse(responseObject);
                    expect(responseObject.data.id).to.be.above(1);
                    done();
                });

        });

      it('get info with wrong credentials', function (done) {
            var api_pw = nconf.get('api').auth.basic.password;
            nconf.set('api:auth:basic:password', "hahaha");


              obj_shop.get(function(err,responseObject){

                    expect(err).to.equal("API authentication failed");

                    nconf.set('api:auth:basic:password', api_pw);

                    done();
                });




        });


});
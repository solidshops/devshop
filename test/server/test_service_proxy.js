// Config
var proxy = require('../../app/services/proxy.js');



before(function (done) {
  done();
});

after(function (done) {
    // Clean up the stubs and mocks
    done();
});

function validateProxyResponse(responseObject){
  //console.log(responseObject);
  expect(responseObject.success).to.equals(true);

}


describe('Service: proxy', function () {


        beforeEach(function (done) {
           done();
        });

        it('All theme functionality is extensively tested in the SolidShops testsuite!', function (done) {
          done();
        });

        it('GET / proxy should return homepage', function (done) {
          var obj_proxy = new proxy();

          var configObject = {};
          configObject.method ="GET";
          configObject.path = "/";
          configObject.cartId = "1";

          obj_proxy.request(configObject,function(responseObject){
              validateProxyResponse(responseObject);
              expect(responseObject.statusCode).to.equal(200);
              expect(responseObject.headers['P3P']).to.equals('CP="not implemented"');
              expect(responseObject.headers['Content-Type']).to.contain('text/html');
              done();
          });
        });

        it('GET /lock/index/confirmmail proxy should redirect', function (done) {
          var obj_proxy = new proxy();

          var configObject = {};
          configObject.method ="GET";
          configObject.path = "/lock/index/confirmmail";
          configObject.cartId = "1";

          obj_proxy.request(configObject,function(responseObject){
              validateProxyResponse(responseObject);
              expect(responseObject.statusCode).to.equal(302);
              expect(responseObject.headers['Location']).to.contain(nconf.get().www.scheme);
              done();
          });
      });





});
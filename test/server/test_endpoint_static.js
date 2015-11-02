

before(function (done) {
  done();
});

after(function (done) {
    // Clean up the stubs and mocks
    done();
});



describe('Endpoint: staticfiles', function () {



  /**
   * Read example
   */
  

    beforeEach(function (done) {
       done();
    });

    var dir = nconf.get().theme.folder + "/files";

    if(fs.existsSync(dir)){
    
      var files = fs.readdirSync(dir);
      if(files[0]){
        console.log(files[0]);
        it('/staticfiles/{firstFileOnDisk}', function (done) {
          st.get('/staticfiles/'+files[0])
          //.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
          .end(function (err, res) {
            //console.log(err,res);
            expect(res.statusCode).to.equal(200);
            //expect(res.headers['content-type']).to.equal("image/svg+xml");
            done();
          });
        });
      }
    }




      it('/staticfiles/thisfile.doesnotexists', function (done) {
        st.get('/staticfiles/thisfile.doesnotexists')
        //.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
        .end(function (err, res) {
          //console.log(err,res);
          expect(res.statusCode).to.equal(404);
          //expect(res.headers['content-type']).to.equal("image/svg+xml");
          done();
        });
      });


});




describe('Endpoint: staticgenerated', function () {

    beforeEach(function (done) {
       done();
    });

      it('/staticgenerated', function (done) {
        st.get('/staticgenerated/123456789.css?20150826213227')
        //.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
        .end(function (err, res) {
          expect(res.statusCode).to.equal(404);
          done();
        });
      });

});
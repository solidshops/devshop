

before(function (done) {
  done();
});

after(function (done) {
    // Clean up the stubs and mocks
    done();
});

describe('Endpoint: shop', function () {



    beforeEach(function (done) {
       done();
    });

    it('/ should return homepage', function (done) {
      st.get('/')
      .set('Accept', 'text/html')
      .end(function (err, res) {
        //expect(res.text).to.contain('EOF');
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('/nonexistingtemplate should return 404', function (done) {
      st.get('/nonexistingtemplate')
      .set('Accept', 'text/html')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });







});




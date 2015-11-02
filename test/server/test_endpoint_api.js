

before(function (done) {
  done();
});

after(function (done) {
    // Clean up the stubs and mocks
    done();
});

describe('Endpoint: API', function () {

    beforeEach(function (done) {
       done();
    });

    it('/api/theme/changed', function (done) {
      st.get('/api/theme/changed')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equals(true);
        done();
      });
    });

    it('/api/clearcache', function (done) {
      st.get('/api/clearcache')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equals(true);
        done();
      });
    });

});
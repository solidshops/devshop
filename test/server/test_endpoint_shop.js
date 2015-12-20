

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


    it('/cart/add/{id} should add item to cart', function (done) {
        var productId = "1";
        st.post('/cart/add/'+productId)
            .set('Accept', 'multipart/form-data')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(302);
                //"PHPSESSID=8349p3oac8qnssr0oqt3s0urb6"
                var strCookie = res.headers['set-cookie'][res.headers['set-cookie'].length -1].split(";")[0];

                st.get('/getjson/cart')
                    .set('Accept', 'application/json')
                    .set('Cookie', strCookie)
                    .end(function (err, res) {
                        expect(res.statusCode).to.equal(200);

                        try {
                            var cartObject = JSON.parse(res.text);
                            expect(cartObject.id).not.to.equal(null);
                            expect(cartObject.items[0].id).to.equal(productId);
                        }
                        catch(ex) {
                            expect(true).to.equal(false);
                        }

                        done();
                    });

            });
    });




});




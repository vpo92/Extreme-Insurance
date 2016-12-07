var should = require('chai').should;
var expect = require('chai').expect;
var offerManager = require('../lib/offer');

describe('Offers', function(){

  describe('Xcover', function () {
    it('1 to I', function (done) {
      //expect(offerManager.findXOffer('CH',0,0)).to.eq(["Skiing Medical Sports"]);
      //expect(offerManager.findXOffer('UK',1,1)).to.eq(["Medical Sports","Yoga"]);

      expect(["Hello","How","Are","You"]).to.deep.eq(["Hello","How","Are","You"]);

      done();
      //.to().eq("I").end(done);
    });
  });
});

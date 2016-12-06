var should = require('chai').should;
var expect = require('chai').expect;
var roman = require('../lib/roman');

describe('Test Roman', function(){

  describe('convert', function () {
    it('1 to I', function (done) {
      expect(roman.convert(1)).to.eq("I");
      expect(roman.convert(5)).to.eq("V");
      expect(roman.convert(9)).to.eq("IX");
      done();
      //.to().eq("I").end(done);
    });
    it('should fail', function (done) {
      expect(roman.convert(4)).not.to.eq("I");
      expect(roman.convert(6)).not.to.eq("V");
      expect(roman.convert(2)).not.to.eq("IX");
      done();
      //.to().eq("I").end(done);
    });
  });
  describe('calculate', function () {
    it('1 to I', function (done) {
      expect(roman.calculate("I")).to.eq(1);
      expect(roman.calculate("V")).to.eq(4.2);
      expect(roman.calculate("X")).to.eq(8.4);
      expect(roman.calculate("L")).to.eq(42);
      expect(roman.calculate("II")).to.eq(2);
      expect(roman.calculate("III")).to.eq(3);
      expect(roman.calculate("XXXX")).to.eq(8.4*4);
      expect(roman.calculate("XL")).to.eq(42-8.4);
      expect(roman.calculate("IV")).to.eq(3.2);
      expect(roman.calculate("IX")).to.eq(7.4);
      expect(roman.calculate("XIV")).to.eq(8.4+3.2);

      //...

      done();
      //.to().eq("I").end(done);
    });
  });

  describe('all', function () {
    it('1 to 1', function (done) {
      expect(roman.all(1)).to.eq(1);
      expect(roman.all(5)).to.eq(4.2);
      expect(roman.all(10)).to.eq(8.4);
      expect(roman.all(50)).to.eq(42);
      expect(roman.all(4)).to.eq(3.2);
      expect(roman.all(9)).to.eq(7.4);
      expect(roman.all(40)).to.eq(42-8.4);
      expect(roman.all(23)).to.eq(8.4*2+3);
      //...

      done();
      //.to().eq("I").end(done);
    });

    it('error value', function (done) {
      expect(roman.all("")).to.eq(0);
      expect(roman.all(null)).to.eq(0);
      expect(roman.all({})).to.eq(0);
      expect(roman.all([])).to.eq(0);
      //...

      done();
      //.to().eq("I").end(done);
    });

  });

});

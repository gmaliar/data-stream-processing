var assert = require('chai').assert;
var fs = require('fs');

var okGenerator = fs.createReadStream(__dirname + '/stream.ok.txt');
var errGenerator = fs.createReadStream(__dirname + '/stream.err.txt');

var processor = require(__dirname + '/../processor');

describe('Processor', function() {

  it('handles a new line delimited json stream', function () {
    var data = { events: {}, words: {} };

    processor(okGenerator, data).on('finish', function() {
      assert.equal({ events: { baz: 2, foo: 3 }, words: { amet: 1, lorem: 2, ipsum: 1, dolor: 1 } }, data);
    });
  });

  it('disregards malformed json lines', function () {
    var data = { events: {}, words: {} };

    processor(errGenerator, data).on('finish', function() {
      assert.equal({ events: {}, words: {} }, data);
    });
  });

});

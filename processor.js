var Transform = require('stream').Transform;
var split = require('split');
var util = require('util');

util.inherits(NormalizeStream, Transform);
util.inherits(AggregateStream, Transform);

function NormalizeStream() {
  Transform.call(this, { 'objectMode': true });
}

function AggregateStream(data) {
  Transform.call(this, { 'objectMode': true });

  this.data = data;
}

NormalizeStream.prototype._transform = function(line, encoding, done) {
  try {
    done(null, JSON.parse(line));
  }
  catch (err) {
    // Disregard unparseable JSON lines or notify for any other type of error.
    if (err.name === 'SyntaxError') {
      done();
    } else {
      console.log(err);
    }
  }
};

AggregateStream.prototype._transform = function(line, encoding, done) {
  var eventCount = this.data['events'][line.event_type] || 0;
  var wordCount = this.data['words'][line.data] || 0;

  this.data['events'][line.event_type] = eventCount + 1;
  this.data['words'][line.data] = wordCount + 1;

  done();
};

module.exports = exports = function(stream, data) {
  return stream
    .pipe(split())
    .pipe(new NormalizeStream())
    .pipe(new AggregateStream(data))
};

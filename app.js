var express = require('express');
var app = express();

module.exports = exports = function(data) {
  app.get('/', function (req, res) {
    res.send(JSON.stringify(data));
  });

  return app;
}

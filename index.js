// Our lovely database

var data = {
  events: {},
  words: {}
};

var spawn = require('child_process').spawn;
var generator = spawn('./generator-macosx-amd64');

var processor = require('./processor')(generator.stdout, data);
var app = require('./app')(data);

app.listen(8080, function () {
  console.log('Web service listening on port 8080.');
});

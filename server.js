var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./lib/routes');
var log4js = require('log4js');

var appInsights = require("applicationinsights");
appInsights.setup("cd444149-7d8c-4d62-8262-074a11443c50").start();

log4js.replaceConsole();
var logger = log4js.getLogger('main');


module.exports = Server;

function Server (doLogRequests) {
  var app = express();
  app.set('json spaces', 2);

  if (doLogRequests) {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.json());

  app.get('/status', function (req, res) {
    res.json({up: true})
  })

  app.post('/order', function (req, res, next) {
    routes.order(req, res, next);
  });
  app.post('/feedback', function (req, res, next) {
    routes.feedback(req, res, next);
  });
 app.post('/quote', function (req, res, next) {
    routes.quote(req, res, next);
    //routes.defQuote(req, res, next);
  });
  app.post('/quote2', function (req, res, next) {
     routes.quote(req, res, next);
     //routes.defQuote(req, res, next);
   });

  var server = http.createServer(app);
  server.start = server.listen.bind(server, process.env.PORT || 3000);
  server.stop = server.close.bind(server);
  return server;
}


var server = new Server(true);
server.start(function () {
  console.log('server listening on port', server.address().port);
});

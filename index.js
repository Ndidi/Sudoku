var fs = require('fs');
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var antie = require('./node/antie/antieframework');

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/node/views');
  app.set('view engine', 'hbs');
  app.use('/antie', express.static(__dirname + '/antie'));
  app.use('/static', express.static(__dirname + '/static'));
});

var jsCacheBust = false;

app.configure('development', function () {
  jsCacheBust = true;
});

var appId = 'sudoku';
var antieConfigPath = __dirname + '/antie/config';

var antieF = new antie(antieConfigPath, antieConfigPath);

app.get('/', function(req, res){
  var deviceBrand = req.query.brand ? req.query.brand : 'default';
  var deviceModel = req.query.model ? req.query.model : 'webkit';

  deviceBrand = antieF.normaliseKeyNames(deviceBrand);
  deviceModel = antieF.normaliseKeyNames(deviceModel);

  var deviceConfigName = deviceBrand + '-' + deviceModel;
  var deviceConfigPath = antieConfigPath + '/devices/' + deviceConfigName + "-default.json";

  fs.readFile(deviceConfigPath, function (err, data) {
    if (!err) {

      var deviceConfig = data.toString('utf8');
      deviceConfig = deviceConfig.replace(/%application%/mg, appId);
      var deviceConfigObj = JSON.parse(deviceConfig);

      res.setHeader('Content-Type', antieF.getMimeType(deviceConfigObj));
        res.render('index', {
          doctype: antieF.getDocType(deviceConfigObj),
          html: antieF.getRootHtmlTag(deviceConfigObj),
          deviceHeaders: antieF.getDeviceHeaders(deviceConfigObj),
          appId: appId,
          jsCacheBust: jsCacheBust,
          deviceConfig: deviceConfig,
          deviceBody: antieF.getDeviceBody(deviceConfigObj)
      });

    } else {
      var body = 'device config not found';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', body.length);
      res.end(body);
    }
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
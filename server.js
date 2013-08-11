module.exports.conf = require('./conf/conf');
var domain = require('domain'),
  http = require('http'),
  fs = require('fs'),
  path = require('path');
var serverDm = domain.create();
var processPath = path.dirname(process.argv[1]);
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
global.app = {};
app.version = '0.0.1';

serverDm.on('error', function (err) {
  delete err.domain;
  console.error(err);
  app.log.error(err);
});
serverDm.run(function () {
  app.conf = module.exports.conf = require('./conf/conf');
  app.module = {};
  app.module.rrestjs = require('rrestjs');
  app.module.mongoskin = require('mongoskin');
  /*    app.module.marked = require('marked');
   app.module.nodemailer = require('nodemailer');*/
  app.log = app.module.rrestjs.restlog;
  app.lib = {};
  app.lib.tools = require('./lib/tools.js');
  app.lib.CacheLRU = require('./lib/cacheLRU.js');
  app.lib.CacheTL = require('./lib/cacheTL.js');
  app.lib.msg = require('./lib/msg.js');
  app.lib.model = require('./lib/model.js');
  app.lib.converter = require('./lib/anyBaseConverter.js');
  app.lib.email = require('./lib/email.js');
  app.dao = {};
  app.dao.db = require('./dao/mongoDao.js').db;
  app.dao.articleDao = require('./dao/articleDao.js');
  //app.dao.bookDao = require('./dao/bookDao.js');
  app.cache = {};
  app.api = {};
  //app.api.book = require('./api/book.js');
  app.api.art = require('./api/article.js');
  //app.api.dir = require('./api/directory.js');
  creatServer();
});

function creatServer() {
  var server = http.createServer(function (req, res) {
    var dm = domain.create();
    dm.on('error', function (err) {
      console.log(err);
      delete err.domain;
      err.type = 'error';
      try {
        res.on('finish', function () {
          //app.dao.db.close();
          process.nextTick(function () {
            dm.dispose();
          });
        });
        if (err.hasOwnProperty('name')) {
          res.sendjson({
            err: err
          });
        } else {
          //console.log('ReqErr:******************');
          console.log(req.session + ':' + req.method + ':' + req.path);
          app.log.error(err);
          res.sendjson({
            err: {
              name: 'Request Error',
              message: 'Sorry，Request Error!',
              type: 'error',
              url: '/'
            }
          });
        }
      } catch (err) {
        delete err.domain;
        //console.log('CatchERR:******************');
        app.log.error(err);
        dm.dispose();
      }
    });
    dm.run(function () {
      if (req.path[0] === 'api' && app.api[req.path[1]]) {
        app.api[req.path[1]][req.method.toUpperCase()](req, res, dm);
      } else {
        res.setHeader("Content-Type", "text/html");
        if (app.indexTpl) {
          res.send(app.indexTpl);
        } else {
          fs.readFile(processPath + '/static/index.html', 'utf8', serverDm.intercept(function (data) {
            //    app.indexTpl = data;
            res.send(data);
          }));
        }
      }//app.module.rrestjs.config.listenPort
    });//process.env.PORT
  }).listen(port, ipaddr);
}
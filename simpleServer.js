var ifile = require('ifile');
var http = require('http');
var zlib = require('zlib');

ifile.add([
  ["/static", __dirname, ['js', 'css', 'jpg']]
], function (req, res, is_static) {
  console.log(is_static);
  var acceptEncoding = req.headers['accept-encoding'] || '';
  if (acceptEncoding.match(/\bdeflate\b/)) {
    res.writeHead(200, { 'content-encoding': 'deflate' });
    //Readable.pipe(zlib.createDeflate()).pipe(res);
    zlib.deflate(asd, function (err, result) {
      res.end(result);
    });
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.writeHead(200, { 'content-encoding': 'gzip' });
    //Readable.pipe(zlib.createGzip()).pipe(res);
    zlib.gzip(asd, function (err, result) {
      res.end(result);
    });
  } else {
    res.writeHead(200, {});
    res.end("ok");
  }
});

http.createServer(function (req, res) {
  ifile.route(req, res);
}).listen(8124);
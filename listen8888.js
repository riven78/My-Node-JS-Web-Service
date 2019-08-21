const gps2city = require("gps2citybybaidu");
const shutdown = require("shutdownpc");
const http = require("http");
const fs = require("fs");
const URL = require("url");
const PATH = require("path")
http.createServer(function (req, res) {
  const pathname = URL.parse(req.url).pathname;
  console.log(pathname);
  console.log(PATH.basename(pathname));
  if (PATH.basename(pathname) == "" || PATH.basename(pathname) == null) {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    fs.readFile("index.html", function (err, data) {
      if (err) {
        var errStr = "";
        errStr += "\n" + err.stack;
        errStr += "\n" + 'Error code: ' + err.code;
        errStr += "\n" + 'Signal received: ' + err.signal;
        console.log(err.stack);
        console.log('Error code: ' + err.code);
        console.log('Signal received: ' + err.signal);
        res.end(errStr);
      } else {
        console.log("data=" + data);
        res.end(data);
      }
    });
  } else {
    gps2city.execute(req, res);
    shutdown.execute(req, res);
  }
}).listen(8888);
console.log("Server running at http://127.0.0.1:8888 /");
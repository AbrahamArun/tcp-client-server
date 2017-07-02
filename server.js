const net = require('net');
var colors = require("colors");

const server = net.createServer((c) => {
  console.log('client connected'.green);
  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {
    var returnData = 'Got this message in server: ' + data;
    c.write(returnData, "UTF8", () => {
      console.log('sent => ' + colors.blue(returnData));
    });
  });

});

server.on('error', (err) => {
  throw err;
});

server.listen(8124, () => {
  console.log('server bound'.yellow);
});

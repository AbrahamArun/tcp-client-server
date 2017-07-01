var net = require("net");
var colors = require("colors");

var server = net.createServer();

server.on("connection", function (socket) {
    var remoteAdd = socket.remoteAddress + ":" + socket.remotePort;
    console.log("new client conn is made %s".green, remoteAdd);

    socket.on("data", function (d) {
        console.log("data made from %s: %s".cyan, remoteAdd, d);
        socket.write("Hello " + d);
    });

    socket.once("close", function () {
        console.log("connection from %s closed".yellow, remoteAdd);
    });

    socket.on("error", function (err) {
        console.log("connection %s error: %s".red, remoteAdd, err.message);
    });

})

server.on("error", function (err) {
    console.log("error occured: %s".red, err.message);
})

server.listen(9000, function () {
    console.log("server listening to %j".green, server.address());
});

var readlinesync = require("readline-sync");
var colors = require("colors");
var net = require("net");

var HOST = "127.0.0.1";
var PORT = 9000;

var client = null;

function OpenConnection() {
  if (client) {
    menu();
    return;
  }

  client = new net.Socket();

  client.on("error", function (err) {
      client.destroy();
      client = null;
      console.log("-- inside openConnection.client.on.error -- ".grey);
      menu();
  });

  client.on("data", function (data) {
      console.log("Received. Msg: %s".cyan, data);
      menu();
  });

  client.connect(PORT, HOST, function () {
      console.log("connection opened sucessfully".green);
      menu();
  });
}

function SendData(data) {
    if (!client) {
      console.log("-- inside sendData.!client -- ".grey);
      menu();
      return;
    }

    client.write(data,"UTF8", function () {
        console.log("-- data has been sent --".green);
    });

    console.log("-- inside sendData.end -- ".grey);
    menu();
}

function CloseConnection() {
  if (!client) {
    menu();
    return;
  }

  client.destroy();
  client = null;
  console.log("-- connection closed sucessfully --".yellow);
  menu();
}

function menu() {
  var lineRead = readlinesync.question("\n\nEnter Option (1-Open, 2-Send, 3-Close, 4-Quit): ");

  switch (lineRead) {
    case "1":
      console.log("Option 1 Selected");
      OpenConnection();
      break;
    case "2":
      console.log("Option 2 Selected");
      var data = readlinesync.question("Enter data to send: ");
      SendData(data);
      break;
    case "3":
      console.log("Option 3 Selected");
      CloseConnection();
      break;
    case "4":
      console.log("Option 4 Selected");
      return;
      //break;
    default:
      menu();
      break;
  }
}

menu();

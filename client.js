process.nextTick = require('process.nexttick')
var colors = require("colors");

const net = require('net');
var readlinesync = require("readline-sync");

const client = net.createConnection({ port: 8124 }, () => {
  console.log('connected to server!');
});

client.on('data', (data) => {
  console.log(colors.blue('received => ' + data.toString()));
});

client.on('end', () => {
  console.log('disconnected from server');
});

client.on('error', () => {
  console.log('Error in connecting to server');
});

function sendData(data) {
  client.write(data, "UTF8", () => {
    console.log('message has been sent');
  });
}

function closeConnection() {
  if(client !== null) {
    client.end();
  }
}

function getUserInput() {
  var data = readlinesync.question(colors.blue("\nEnter data to send: "));
  sendData(data);
  // set a timeout to skip this iteration so that node can process incoming message
  setTimeout(() => {
    getUserInput();
  }, 100);
}

// Defer the execution
process.nextTick(() => {
  getUserInput();
});

const colors = require("colors");
const net = require('net');

let readlinesync = require("readline-sync");

const client = net.createConnection({ port: 8124 }, () => {
  console.log('connected to server!');
});

client.on('data', (data) => {
  console.log('received => ' + colors.blue(data.toString()));
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
  let data = readlinesync.question(colors.blue("\nEnter data to send: "));
  sendData(data);
  // Defer the execution so that node can process incoming message
  setTimeout(() => {
    getUserInput();
  }, 10);
}

// Defer the execution
setTimeout(() => {
  getUserInput();
}, 10);

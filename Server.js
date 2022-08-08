const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require("express");
const app = express();
const server = require("http").createServer(app);




var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

const user = require("./route/Api");
app.use("/user", user);
const appInit = app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.use(bodyParser.json());
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const connect = require("./config/connection");
connect();
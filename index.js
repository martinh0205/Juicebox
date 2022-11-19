require("dotenv").config();
const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();

server.use(express.json());

const { client } = require("./db");
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on PORT", PORT);
});

const apiRouter = require("./api");
server.use("/api", apiRouter);

const morgan = require("morgan");
const { application } = require("express");
server.use(morgan("dev"));

server.use(express.json());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

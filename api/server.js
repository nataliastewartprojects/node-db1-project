const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter = require("../api/account-router.js");

const server = express();

server.use(express.json()); //<< need to be before the router !!!! At the top level in the file

server.use("/api/accounts", accountRouter);

module.exports = server;

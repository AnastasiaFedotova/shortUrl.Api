const { Router } = require("express");
const { linksApi } = require("./links");
const { usersApi } = require('./users');
const api = Router();

api.use("/links", linksApi);
api.use("/users", usersApi);

module.exports = api;

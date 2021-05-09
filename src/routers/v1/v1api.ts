const { Router } = require("express");
const { linksApi } = require("./links");
const api = Router();

api.use("/links", linksApi);

module.exports = api;

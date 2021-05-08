const { Router } = require("express");
const api = Router();
const service = require("./../../service/shortLinkService");

api.post("/", async(req, res) => {
  const { body } = req;
  const shortLink = await service.add(body);

  res.json(shortLink);
})

module.exports = api;

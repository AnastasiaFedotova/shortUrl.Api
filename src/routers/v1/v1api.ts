const { Router } = require("express");
const api = Router();
const service = require("./../../service/shortLinkService");

api.post("/", async(req, res) => {
  const { body } = req;
  const shortLink = service.add(body.url);

  res.json({
    url: shortLink
  });
})

module.exports = api;

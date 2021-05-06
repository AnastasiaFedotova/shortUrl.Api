const { Router } = require("express");
const api = Router();
const service = require("./../../service/shortLinkService");

api.post("/", async(req, res) => {
  const { body } = req;
  const shortLinks = service.generate(body.url);

  res.json({
    url: shortLinks
  });
})

module.exports = api;

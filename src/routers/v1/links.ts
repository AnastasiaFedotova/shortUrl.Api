const { Router } = require("express");
const service = require("./../../service/shortLinkService");
const linksApi = Router();
const getRandomUrl = require("./../../utils/getRandomUrl")

linksApi.post("/", async (req, res) => {
  const { body } = req;
  const newLink = {
    original_url: body.url,
    short_url: getRandomUrl(),
    user_id: body.id,
    view_count: null
  };

  const shortLink = await service.add(newLink);

  res.json(shortLink);
})

linksApi.get("/", async (_req, res) => {
  const shortLinksList = await service.read();

  res.json(shortLinksList);
})

export = { linksApi };

const { Router } = require("express");
const service = require("./../../service/shortLinkService");
const linksApi = Router();

linksApi.post("/", async(req, res) => {
  const { body } = req;
  const shortLink = await service.add(body);

  res.json(shortLink);
})

export { linksApi };

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

  const shortLink = await service.addLink(newLink);

  res.json(shortLink);
})

export { linksApi };

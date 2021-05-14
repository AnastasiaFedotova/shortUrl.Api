import { Router } from "express";
import { Links } from "../../models/links";
import { urlService } from "./../../service/shortLinkService";
import getRandomUrl from "./../../utils/getRandomUrl";
const linksApi = Router();

linksApi.get("/", async (_req, res) => {
  const shortLinksList = await urlService.read();
  res.json(shortLinksList);
});

linksApi.post("/", async (req, res) => {
  const { body } = req;
  const shortUrlLength = 5;
  const newLink: Links = {
    original_url: body.url,
    short_url: getRandomUrl(shortUrlLength),
    user_id: body.userId,
    view_count: null
  };

  const shortLink = await urlService.add(newLink);

  res.json(shortLink);
})

export default linksApi;

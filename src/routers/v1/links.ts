import { Router } from "express";
import Links from "../../interface/links";
import service from "./../../service/shortLinkService";
const linksApi = Router();
import getRandomUrl from "./../../utils/getRandomUrl";

linksApi.get("/", async (_req, res) => {
  const shortLinksList = await service.read();

  res.json(shortLinksList);
})

linksApi.post("/", async (req, res) => {
  const { body } = req;
  const shortUrlLength = 5;
  const newLink: Links = new Links({
    original_url: body.url,
    short_url: getRandomUrl(shortUrlLength),
    user_id: body.id,
    view_count: null
  });

  const shortLink = await service.add(newLink);

  res.json(shortLink);
})

export default linksApi;

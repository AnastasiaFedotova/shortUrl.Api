import { Router } from "express";
import { customRequest } from "../../interfaces/customRequest";
import { LinksInterface } from "./../../interfaces/links";
import { urlService } from "./../../service/shortLinkService";
import getRandomUrl from "./../../utils/getRandomUrl";
const linksApi = Router();

linksApi.get("/", async (_req, res) => {
  const shortLinksList = await urlService.read();
  res.json(shortLinksList);
});

linksApi.get("/userList", async (req: customRequest, res) => {
  const userId = req.auts?.userId;
  const userList = await urlService.readUserList(userId);
  res.json(userList);
});

linksApi.post("/", async (req: customRequest, res) => {
  const { body } = req;
  const userId = req.auts?.userId;
  const shortUrlLength = 5;
  const newLink: LinksInterface = {
    original_url: body.url,
    short_url: getRandomUrl(shortUrlLength),
    user_id: userId || null,
    view_count: null
  };

  const shortLink = await urlService.add(newLink);

  res.json(shortLink);
});

export default linksApi;

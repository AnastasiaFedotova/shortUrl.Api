import { Router } from "express";
import { customRequest } from "../../interfaces/customRequest";
import { urlService } from "./../../service/shortLinkService";

const linksApi = Router();

linksApi.get("/", async (_req, res) => {
  const shortLinksList = await urlService.readLinksList();
  res.json(shortLinksList);
});

linksApi.get("/userList", async (req: customRequest, res) => {
  const userId = req.auts?.userId;
  const userList = await urlService.readUserList(+userId);
  res.json(userList);
});

linksApi.get("/:tag", async (req, res) => {
  const tagName = req.params.tag;
  const shortLinksList = await urlService.readLinksListByTag(tagName);
  res.json(shortLinksList);
});

linksApi.post("/", async (req: customRequest, res) => {
  const { body } = req;
  const userId = req.auts?.userId;

  const shortLink = await urlService.addLink(body, +userId);

  res.json(shortLink);
});

linksApi.put("/", async (req: customRequest, res) => {
  const { body } = req;

  const shortLink = await urlService.renameLink(body);

  res.json(shortLink);
});

export default linksApi;

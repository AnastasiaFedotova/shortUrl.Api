import { Router } from "express";
import { customRequest } from "../../interfaces/customRequest";
import { urlService } from "./../../service/shortLinkService";

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

  const shortLink = await urlService.add(body, userId);

  res.json(shortLink);
});

export default linksApi;

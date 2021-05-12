import { Router } from "express";
import { v4 } from "uuid";
import service from "./../../service/usersService";
const usersApi = Router();

usersApi.get("/", async (_req, res) => {
  const usersList = await service.read();

  res.json(usersList);
});

usersApi.post("/", async (req, res) => {
  const { body } = req;
  body.id = v4().toString();
  const user = await service.add(body);

  res.json(user);
});

export default usersApi;

import { Router } from "express";
import { userService } from "./../../service/usersService";

const usersApi = Router();

usersApi.get("/", async (_req, res) => {
  const usersList = await userService.read();
  res.json(usersList);
});

usersApi.post("/", async (req, res) => {
  const { body } = req;
  await userService.add(body);

  res.status(200).json("ok");
});

export default usersApi;

import { Router } from "express";
import { v4 } from "uuid";
import { Users } from "../../models/users";
import service from "./../../service/usersService";
const usersApi = Router();

usersApi.get("/", async (_req, res) => {
  const usersList = await service.read();
  res.json(usersList);
});

usersApi.post("/", async (req, res) => {
  const { body } = req;
  const newUser: Users = {
    id: v4(),
    login: body.login,
    password: body.password
  }
  const user = await service.add(newUser);

  res.json(user);
});

export default usersApi;

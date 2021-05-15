import { Router } from "express";
import { UsersInterface } from "./../../interfaces/users";
import { userService } from "./../../service/usersService";

const usersApi = Router();

usersApi.get("/", async (_req, res) => {
  const usersList = await userService.read();
  res.json(usersList);
});

usersApi.post("/", async (req, res) => {
  const { body } = req;
  const newUser: UsersInterface = {
    login: body.login,
    password: body.password
  }
  const user = await userService.add(newUser);

  res.json(user);
});

export default usersApi;

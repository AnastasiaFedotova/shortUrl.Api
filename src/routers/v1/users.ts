import { Router } from "express";
import { userService } from "./../../service/usersService";
import { authorizeService } from "./../../service/authorizeService";

const usersApi = Router();

usersApi.get("/", async (_req, res) => {
  const usersList = await userService.read();
  res.json(usersList);
});

usersApi.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.readUserById(+userId);
  res.json(user);
});

usersApi.post("/", async (req, res) => {
  const { body } = req;

  await userService.add(body);

  const login = body.login;
  const password = body.password;
  const userId = await authorizeService.logIn(login, password);

  if (+userId) {
    const sessionId = await authorizeService.create(+userId);
    const dayInMs = 86400000;

    res.cookie('session', sessionId, {
      maxAge: dayInMs
    });

    res.status(200).json(true);
  }
});

export default usersApi;

import { Router } from "express";
import service from "./../../service/authorizeService";

const authorizeApi = Router();

authorizeApi.post("/", async (req, res) => {
  const { body } = req;
  const login = body.login;
  const password = body.password;
  const userId = await service.logIn(login, password);

  if (userId) {
    const sessionId = await service.create(userId);
    const dayInMs = 86400000;

    res.cookie('session', sessionId, {
      maxAge: dayInMs
    });

    res.status(204).send("");
  } else {
    res.status(404).send("Error");
  }
});

export default authorizeApi;

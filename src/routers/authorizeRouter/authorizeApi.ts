import { Router } from "express";
import { authorizeService } from "./../../service/authorizeService";

const authorizeApi = Router();

authorizeApi.post("/", async (req, res) => {
  const { body } = req;
  const login = body.login;
  const password = body.password;
  const userId = await authorizeService.logIn(login, password);

  if (userId) {
    const sessionId = await authorizeService.create(userId);
    const dayInMs = 86400000;

    res.cookie('session', sessionId, {
      maxAge: dayInMs
    });

    res.status(204).send("");
  } else {
    res.status(404).send("Error");
  }
});

authorizeApi.get("/", async (req, res) => {
  res.json(req.cookies?.session ? true : false).status(204);
});

export default authorizeApi;

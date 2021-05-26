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

    res.json(true).status(204);
  } else {
    res.status(404).send("Error");
  }
});

authorizeApi.get("/", async (req, res) => {
  const sessionId = req.cookies.session;
  const session = await authorizeService.find(sessionId);
  if (session) res.json(session.user_id).status(200);
  else res.status(404).send("Error");
});

authorizeApi.get("/user", async (req, res) => {
  const sessionId = req.cookies.session;
  const userId = await authorizeService.findAuthUserId(sessionId);
  if (userId) res.json(userId).status(200);
  else res.status(404).send("Error");
});

authorizeApi.delete("/", async (req, res) => {
  const sessionId = req.cookies.session;

  await authorizeService.remove(sessionId);

  res.status(200).json('deleted');
});

export default authorizeApi;

import { Router } from "express";
import service from "./../../service/authorizeService";
const authorizeApi = Router();

authorizeApi.post("/", async (req, res) => {
  const { body } = req;
  const login = body.login;
  const password = body.password;
  const id = await service.logIn(login, password);

  if (id) res.json(id);
  else res.status(404).send("Error");
});

export default authorizeApi;

const Router = require("express");
const { v4 } = require("uuid");
const service = require("./../../service/usersService");
const usersApi = Router();

usersApi.get("/", async (_req, res) => {
  const usersList = await service.read();

  res.json(usersList);
});

usersApi.post("/", async (req, res) => {
  const { body } = req;
  body.id = v4().toString();
  console.log(body)
  const user = await service.addUser(body);

  res.json(user);
});

export { usersApi };

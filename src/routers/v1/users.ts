const Router = require("express");
const { v4 } = require("uuid");
const service = require("./../../service/usersService");
const usersApi = Router();

usersApi.post("/", async (req, res) => {
  const { body } = req;
  body.id = v4();

  const user = await service.addUser(body);

  res.json(user);
});


export { usersApi };

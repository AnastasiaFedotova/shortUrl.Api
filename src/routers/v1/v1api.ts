import { Router } from "express";
import linksApi from "./links";
import usersApi from './users';
const api = Router();

api.use("/links", linksApi);
api.use("/users", usersApi);

export default api;

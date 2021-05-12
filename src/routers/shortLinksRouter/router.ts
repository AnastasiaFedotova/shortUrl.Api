import { Router } from "express";
import Links from "./../../interface/links";
const shortLinksRouter = Router();

shortLinksRouter.get("/:link", async (req, res) => {
  const link = req.params.link;
  Links.findAll({ where: { short_url: link }, raw: true })
    .then((data) => {
      res.redirect(data[0].original_url);
    })
});

export default shortLinksRouter;

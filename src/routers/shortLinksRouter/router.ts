import { Router } from "express";
import Links from "./../../interface/links";
const shortLinksRouter = Router();

shortLinksRouter.get("/:link", async (req, res) => {
  const link = req.params.link;
  try {
    const data = await Links.findAll({ where: { short_url: link }, raw: true });
    res.redirect(data[0].original_url)
  } catch (err) {
    console.log(err);
  }
});

export default shortLinksRouter;

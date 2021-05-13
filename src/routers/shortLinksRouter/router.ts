import { Router } from "express";
import Link from "../../models/links";
const shortLinksRouter = Router();

shortLinksRouter.get("/:link", async (req, res) => {
  try {
    const link = req.params.link;
    const data = await Link.findAll({ where: { short_url: link }, raw: true });
    res.redirect(data[0].original_url)
  } catch (err) {
    console.log(err);
  }
});

export default shortLinksRouter;

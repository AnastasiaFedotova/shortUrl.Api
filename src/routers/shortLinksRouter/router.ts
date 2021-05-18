import { Router } from "express";
import Link from "../../models/links";
import { urlService } from "./../../service/shortLinkService";

const shortLinksRouter = Router();

shortLinksRouter.get("/:link", async (req, res) => {
  try {
    const link = req.params.link;
    const promiseResult = await Promise.all([urlService.addViews(link), Link.findAll({ where: { short_url: link }, raw: true })])
    const data = promiseResult[1];
    res.redirect(data[0].original_url)
  } catch (err) {
    console.log(err);
  }
});

export default shortLinksRouter;

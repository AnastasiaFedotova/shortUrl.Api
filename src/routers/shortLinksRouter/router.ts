const { Router } = require('express');
const { LinksModel } = require('./../../config/dbShema')
const shortLinksRouter = Router();

shortLinksRouter.get("/:link", async (req, res) => {
  const link = req.params.link;
  LinksModel.findAll({ where: { short_url: link }, raw: true })
    .then(data => {
      res.redirect(data[0].original_url);
    })
    .catch(err => console.log(err));
});

export = shortLinksRouter;

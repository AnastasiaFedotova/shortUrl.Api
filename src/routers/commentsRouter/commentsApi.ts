import { Router } from "express";
import { commentsService } from "./../../service/commentsService";

const commentsApi = Router();

commentsApi.get("/", async (_req, res) => {
  const sessionId = await commentsService.readCommentsLinks();
  if (sessionId) res.json(sessionId).status(204);
  else res.status(404).send("Error");
});

commentsApi.get("/:linksId", async (req, res) => {
  const linksId = req.params.linksId;
  const linksComments = await commentsService.findCommentsByLinksId(linksId);
  if (linksComments) res.json(linksComments).status(204);
  else res.status(404).send("Error");
});

commentsApi.post("/", async (req, res) => {
  const { body } = req;
  const message = body.message;
  const linkId = body.user_id;
  const userId = body.link_id;

  const newComment = await commentsService.addComment(message, userId, linkId);
  if (newComment) res.json(newComment.link_id).status(204);
  else res.status(404).send("Error");
});

export default commentsApi;

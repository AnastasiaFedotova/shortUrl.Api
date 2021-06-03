import Comment from "../db/commentShema";
import User from "../db/userShema";
import { CommentsInterface } from "../interfaces/comments";

async function readCommentsLinks(): Promise<Comment[]> {
  try {
    return Comment.findAll({ include: [User] });
  } catch (err) {
    console.log(err)
  }
}

async function addComment(message: string, userId: number, linkId: number): Promise<Comment> {
  try {
    const comment = {
      message: message,
      link_id: linkId,
      user_id: userId
    }

    return Comment.create(comment);
  } catch (err) {
    console.log(err)
  }
}

async function findCommentsByLinksId(linkId: number): Promise<CommentsInterface[]> {
  try {
    const commentsList = await Comment.findAll({
      where: {
        link_id: linkId
      }, include: [User]
    });

    if (commentsList) {
      const res: CommentsInterface[] = [];
      commentsList.forEach(comment => {
        return res.push({
          id: comment.id,
          message: comment.message,
          link_id: comment.link_id,
          user_id: comment.user_id,
          user: {
            id: comment.User.id,
            login: comment.User.login
          }
        });
      });

      return res
    }

    throw new Error("Not found");
  } catch (err) {
    console.log(err)
  }
}

export const commentsService = {
  readCommentsLinks,
  addComment,
  findCommentsByLinksId
}

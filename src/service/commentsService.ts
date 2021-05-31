import Comment from "../db/commentShema";
import User from "../db/userShema";

async function readCommentsLinks(): Promise<Comment[]> {
  try {
    return Comment.findAll({ include: [User] });
  } catch (err) {
    console.log(err)
  }
}

async function addComment(message: string, userId: string, linkId: string): Promise<Comment> {
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

async function findCommentsByLinksId(linkId: string): Promise<Comment[]> {
  try {
    const commentsList = await Comment.findAll({
      where: {
        link_id: linkId
      }, include: [User]
    });

    if (commentsList) {
      return commentsList;
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

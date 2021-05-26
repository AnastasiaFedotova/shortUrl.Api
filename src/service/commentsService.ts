import Comment from "../db/commentShema";

async function readCommentsLinks(): Promise<Comment[]> {
  try {
    const comments = await Comment.findAll();
    return comments;
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

    const newComment: Comment = await Comment.create(comment);

    return newComment;
  } catch (err) {
    console.log(err)
  }
}

async function findCommentsByLinksId(linkId: string): Promise<Comment[]> {
  try {
    const commentsList = await Comment.findAll({
      where: {
        link_id: linkId
      }, raw: true
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

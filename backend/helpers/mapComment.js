export const mapComment = (comment) => {
  return {
    id: comment.id,
    authorId: comment.author.id || comment.author._id || comment.author,
    author: comment.author.login,
    content: comment.content,
    publishedAt: comment.createdAt,
  };
};

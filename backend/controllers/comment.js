import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });
  await newComment.populate('author');
  return newComment;
}

async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ id: commentId });
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

async function editComment(commentId, commentData) {
  const updatedComment = await Comment.findByIdAndUpdate(commentId, commentData, {
    returnDocument: 'after',
  }).populate('author');

  return updatedComment;
}

export { addComment, deleteComment, editComment };

const mongoose = require('mongoose');
const mapComment = require('./mapComment');

module.exports = function (post) {
  return {
    id: post.id,
    author: post.author,
    category: post.category,
    imageUrl: post.image,
    title: post.title,
    description: post.description,
    content: post.content,
    comments: post.comments.map((comment) =>
      mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
    ),
    timeToRead: post.timetoread,
    publishedAt: post.createdAt,
  };
};

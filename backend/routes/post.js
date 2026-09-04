const express = require('express');
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/post');
const { addComment, deleteComment, editComment } = require('../controllers/comment');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { posts, lastPage } = await getPosts(req.query.search, req.query.limit, req.query.page);

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get('/:id', async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

router.post('/:id/comments', authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

router.delete(
  '/:postId/comments/:commentId',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  }
);

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    author: req.body.author,
    category: req.body.category,
    image: req.body.imageUrl,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    timetoread: req.body.timeToRead,
  });

  res.send({ data: mapPost(newPost) });
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedPost = await editPost(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
    timetoread: req.body.timeToRead,
  });

  res.send({ data: mapPost(updatedPost) });
});

router.patch('/:postId/comments/:commentId', authenticated, async (req, res) => {
  const updatedComment = await editComment(req.params.commentId, {
    content: req.body.content,
  });
  res.send({ data: mapComment(updatedComment) });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.send({ error: null });
});

module.exports = router;

import express from 'express';
import path from 'path';
import fs from 'fs/promises';

import { getPosts, getPost, addPost, editPost, deletePost } from '../controllers/post.js';

import { addComment, deleteComment, editComment } from '../controllers/comment.js';

import authenticated from '../middlewares/authenticated.js';
import hasRole from '../middlewares/hasRole.js';
import upload from '../middlewares/upload.js';

import { mapPost, mapComment } from '../helpers/index.js';

import ROLES from '../constants/roles.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { posts, lastPage } = await getPosts(req.query.search, req.query.limit, req.query.page);

  res.send({
    data: {
      lastPage,
      posts: posts.map(mapPost),
    },
  });
});

router.get('/:id', async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({
    data: mapPost(post),
  });
});

router.post('/:id/comments', authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({
    data: mapComment(newComment),
  });
});

router.delete(
  '/:postId/comments/:commentId',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({
      error: null,
    });
  }
);

router.post(
  '/',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({
          error: 'Изображение обязательно',
        });
      }

      const newPost = await addPost({
        author: req.body.author,
        category: req.body.category,
        image: `/uploads/posts/${req.file.filename}`,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        timetoread: req.body.timeToRead,
      });

      res.send({
        data: mapPost(newPost),
      });
    } catch (error) {
      console.error('Ошибка при создании поста:', error);

      res.status(500).send({
        error: error.message || 'Внутренняя ошибка сервера',
      });
    }
  }
);

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  upload.single('image'),
  async (req, res) => {
    try {
      const post = await getPost(req.params.id);

      if (!post) {
        return res.status(404).send({
          error: 'Пост не найден',
        });
      }

      const updateData = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        timetoread: req.body.timeToRead,
      };

      if (req.file) {
        updateData.image = `/uploads/posts/${req.file.filename}`;
      }

      const updatedPost = await editPost(req.params.id, updateData);

      if (req.file && post.image) {
        const oldImagePath = path.resolve('uploads/posts', path.basename(post.image));

        try {
          await fs.unlink(oldImagePath);

          console.log(`Старое изображение удалено: ${oldImagePath}`);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            console.error('Ошибка удаления старого изображения:', error);
          }
        }
      }

      res.send({
        data: mapPost(updatedPost),
      });
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error);

      res.status(500).send({
        error: error.message || 'Внутренняя ошибка сервера',
      });
    }
  }
);

router.patch('/:postId/comments/:commentId', authenticated, async (req, res) => {
  const updatedComment = await editComment(req.params.commentId, {
    content: req.body.content,
  });

  res.send({
    data: mapComment(updatedComment),
  });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.send({
    error: null,
  });
});

export default router;

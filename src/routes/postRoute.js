const express = require('express');

const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.route('/').post(upload.single('image'), postController.createPost);
router.delete('/:id', postController.deletePost);
router.post('/:id/likes', likeController.toggleLike);
router.post('/:id/comments', commentController.createComment);

module.exports = router;

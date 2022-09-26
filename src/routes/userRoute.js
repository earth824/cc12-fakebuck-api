const express = require('express');

const upload = require('../middlewares/upload');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

const router = express.Router();

router.patch(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  userController.updateUser
);
router.get('/:id/friends', userController.getUserFriends);
router.get('/:id/posts', postController.getUserPosts);

module.exports = router;

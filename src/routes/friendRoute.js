const express = require('express');

const friendController = require('../controllers/friendController');

const router = express.Router();

router
  .route('/:friendId')
  .delete(friendController.deleteFriend)
  .post(friendController.createFriend)
  .patch(friendController.updateFriend);

module.exports = router;

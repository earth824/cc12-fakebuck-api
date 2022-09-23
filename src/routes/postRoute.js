const express = require('express');

const postController = require('../controllers/postController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.route('/').post(upload.single('image'), postController.createPost);

module.exports = router;

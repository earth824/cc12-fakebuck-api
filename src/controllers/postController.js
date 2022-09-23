const fs = require('fs');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const { Post } = require('../models');

exports.createPost = async (req, res, next) => {
  try {
    const { title } = req.body;
    if ((!title || !title.trim()) && !req.file) {
      throw new AppError('title or image is required', 400);
    }

    const data = { userId: req.user.id };
    if (title && title.trim()) {
      data.title = title;
    }
    if (req.file) {
      data.image = await cloudinary.upload(req.file.path);
    }

    const post = await Post.create(data);
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

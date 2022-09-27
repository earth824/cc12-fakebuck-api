const AppError = require('../utils/appError');
const { Comment, User } = require('../models');

exports.createComment = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      throw new AppError('title is required', 400);
    }

    const newComment = await Comment.create({
      title,
      userId: req.user.id,
      postId: req.params.id
    });

    const comment = await Comment.findOne({
      where: { id: newComment.id },
      attributes: { exclude: 'userId' },
      include: { model: User, attributes: { exclude: 'password' } }
    });
    res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
};

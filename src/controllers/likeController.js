const { Like } = require('../models');

exports.toggleLike = async (req, res, next) => {
  try {
    // SELECT * FROM likes WHERE user_id = req.user.id AND post_id = id
    const existLike = await Like.findOne({
      where: { userId: req.user.id, postId: req.params.id }
    });

    if (existLike) {
      await existLike.destroy();
      return res.status(200).json({ like: null });
    }

    const like = await Like.create({
      userId: req.user.id,
      postId: req.params.id
    });
    res.status(201).json({ like });
  } catch (err) {
    next(err);
  }
};

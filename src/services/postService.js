const friendService = require('./friendService');
const { Post, User, Like, Comment } = require('../models');

exports.findUserPosts = async (userId, include) => {
  let whereUserId = userId;
  if (include === 'friend') {
    // SELECT * FROM posts WHERE user_id = userId OR user_id = friend1Id
    // OR user_id = friend2Id OR ...
    // SELECT * FROM posts WHERE user_id
    // IN (userId, friend1Id, friend2Id, ...)
    const friendIds = await friendService.findUserFriendIdsByuserId(userId);
    whereUserId = [userId, ...friendIds];
  }
  const posts = await Post.findAll({
    where: { userId: whereUserId },
    attributes: { exclude: 'userId' },
    include: [
      { model: User, attributes: { exclude: 'password' } },
      { model: Like },
      {
        model: Comment,
        attributes: { exclude: 'userId' },
        include: { model: User, attributes: { exclude: 'password' } }
      }
    ],
    order: [['updatedAt', 'DESC']]
  });
  return posts;
};

const { Op } = require('sequelize');
const { Friend } = require('../models');

exports.deleteFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    // DELETE FROM friends WHERE requester_id = req.user.id AND accepter_id = friendId
    // OR requester_id = friendId AND accepter_id = req.user.id
    await Friend.destroy({
      where: {
        [Op.or]: [
          { requesterId: req.user.id, accepterId: friendId },
          { requesterId: friendId, accepterId: req.user.id }
        ]
      }
    });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

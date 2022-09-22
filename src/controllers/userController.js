const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const { User, Friend } = require('../models');
const AppError = require('../utils/appError');
const friendService = require('../services/friendService');

exports.updateUser = async (req, res, next) => {
  try {
    const { password, ...updateValue } = req.body;

    if (req.files.profileImage) {
      const profileImage = req.user.profileImage;

      const secureUrl = await cloudinary.upload(
        req.files.profileImage[0].path,
        profileImage ? cloudinary.getPublicId(profileImage) : undefined
      );

      updateValue.profileImage = secureUrl;
      fs.unlinkSync(req.files.profileImage[0].path);
    }

    if (req.files.coverImage) {
      const coverImage = req.user.coverImage;
      const secureUrl = await cloudinary.upload(
        req.files.coverImage[0].path,
        coverImage ? cloudinary.getPublicId(coverImage) : undefined
      );
      updateValue.coverImage = secureUrl;
      fs.unlinkSync(req.files.coverImage[0].path);
    }

    await User.update(updateValue, { where: { id: req.user.id } });

    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: 'password' }
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUserFriends = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: 'password' }
    });

    if (!user) {
      throw new AppError('user not found', 400);
    }

    const friends = await friendService.findUserFriendsByUserId(id);
    const statusWithMe = await friendService.findStatusWithMe(req.user.id, id);
    res.status(200).json({ user, friends, statusWithMe });
  } catch (err) {
    next(err);
  }
};

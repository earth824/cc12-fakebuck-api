module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING
    },
    { underscored: true }
  );

  return Post;
};

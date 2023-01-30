module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(20),
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdDate: {
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.Lecture);
    db.Post.hasMany(db.Image);
  };

  return Post;
};

module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define(
    "Professor",
    {
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      idNum: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      userJob: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Professor.associate = (db) => {
    db.Professor.hasMany(db.Lecture);
  };

  return Professor;
};

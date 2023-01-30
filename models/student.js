module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
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
      studentId: {
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
      collate: "utf_general_ci",
    }
  );

  Student.associate = (db) => {
    db.Student.belongsToMany(db.Lecture, { through: "Takes" });
  };

  return Student;
};

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      userID: {
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
    { sequelize, timestamps: true },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Student.associate = (db) => {
    db.Student.belongsToMany(db.Lecture, {
      through: "Takes",
      as: "Attendees",
      foreignKey: "studentID",
    });
  };

  return Student;
};

module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define(
    "Lecture",
    {
      id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Lecture.associate = (db) => {
    db.Lecture.belongsToMany(db.Student, {
      through: "Takes",
      as: "Lectures",
      foreignKey: "lectureID",
    });
    db.Lecture.hasMany(db.Post);
    db.Lecture.belongsTo(db.Professor, {
      foreignKey: "professorID",
    });
  };

  return Lecture;
};

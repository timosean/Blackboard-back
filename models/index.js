const { crossOriginEmbedderPolicy } = require("helmet");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Image = require("./image")(sequelize, Sequelize);
db.Lecture = require("./lecture")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Student = require("./student")(sequelize, Sequelize);
db.Professor = require("./professor")(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

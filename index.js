const express = require("express");
const db = require("./models/index");

const app = express();
db.sequelize.sync();

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(8080, () => {
  console.log("Listening on 8080!");
});

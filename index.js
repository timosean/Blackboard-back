const express = require("express");
const db = require("./models/index");

const userAPIRouter = require("./routes/user");
const oneLectureAPIRouter = require("./routes/lecture");
const multiLectureAPIRouter = require("./routes/lectures");

const app = express();
db.sequelize.sync();

// routes
app.use("/api/user", userAPIRouter);
app.use("/api/lecture", oneLectureAPIRouter);
app.use("/api/lectures", multiLectureAPIRouter);

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(8080, () => {
  console.log("Listening on 8080!");
});

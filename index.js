const express = require("express");
const morgan = require("morgan");

const db = require("./models/index");
const userAPIRouter = require("./routes/user");
const lectureAPIRouter = require("./routes/lecture");
const lecturesAPIRouter = require("./routes/lectures");
const postAPIRouter = require("./routes/post");

const app = express();
db.sequelize.sync();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", userAPIRouter);
app.use("/api/lecture", lectureAPIRouter);
app.use("/api/lectures", lecturesAPIRouter);
app.use("/api/post", postAPIRouter);

app.get("/", (req, res) => {
  res.send("Hello Server!");
});

app.listen(8080, () => {
  console.log("Listening on 8080!");
});

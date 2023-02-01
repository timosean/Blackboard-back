const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");

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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser("blackboardcookie"));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "blackboardcookie",
    cookie: {
      httpOnly: true, //JavaScript로 cookie에 접근하지 못 하게 만듦
      secure: false, // https를 쓸 때 true
    },
  })
);

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

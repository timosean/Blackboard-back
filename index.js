const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

const passportConfig = require("./passport");
const db = require("./models/index");
const userAPIRouter = require("./routes/user");
const lectureAPIRouter = require("./routes/lecture");
const lecturesAPIRouter = require("./routes/lectures");
const postAPIRouter = require("./routes/post");

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, //JavaScript로 cookie에 접근하지 못 하게 만듦
      secure: false, // https를 쓸 때 true
    },
  })
);

// Passport 같은 경우 express-session 아래에 적는다.
// (미들웨어간에 서로 의존관계가 있는 경우 순서가 중요)
app.use(passport.initialize());
app.use(passport.session());

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

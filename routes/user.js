const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

// 내 정보 불러오기
router.get("/", (req, res) => {
  // passport index의 deserializeUser을 통과했다면 유저 정보가 req.user에 저장되어 있을 것임
  if (!req.user) {
    res.status(401).send("로그인이 필요합니다!");
  }
  // req.user가 있다면 해당 유저의 정보를 비밀번호 빼고 반환해줌
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

// 회원가입
router.post("/", async (req, res) => {
  const userJob = req.body.userJob === "student" ? "student" : "professor";

  try {
    const exUser =
      userJob === "student"
        ? await db.Student.findOne({
            where: {
              userID: req.body.userID,
            },
          })
        : await db.Professor.findOne({
            where: {
              userID: req.body.userID,
            },
          });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newData = {
      userID: req.body.userID,
      password: hashedPassword,
      idNum: req.body.idNum,
      userName: req.body.userName,
      userJob: req.body.userJob,
    };
    const newUser =
      userJob === "student"
        ? await db.Student.create(newData)
        : await db.Professor.create(newData);

    console.log(newUser);

    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return res.status(403).send(e);
  }
});

// 로그인
// 여기서 passport 전략을 실행해주어야 한다.
router.post("/login", (req, res, next) => {
  // (err, user, info)는 각 strategy의 done 함수의 각 인자와 매핑된다.
  passport.authenticate(
    ["localStudent", "localProfessor"],
    (err, user, info) => {
      // err는 서버의 에러
      if (err) {
        console.error(err);
        return next(err);
      }
      // info는 로직상의 에러
      if (info) {
        return res.status(401).send(info);
      }
      // 위의 에러가 없다면 로그인을 시킨다.
      // req.login을 하면 서버쪽에 세션과 쿠키로 저장이 된다.
      return req.login(user, (loginErr) => {
        // loginErr가 터지면 next로 보내버리고
        if (loginErr) return next(loginErr);

        // 정상적이라면 비밀번호를 제외하고 응답해준다.
        // 일단 Object.assign을 통해서 원래의 user 객체를 얕은 복사해준다.
        // delete 연산자는 객체의 속성을 제거해준다.
        const filteredUser = Object.assign({}, user.toJSON());
        delete filteredUser.password;
        return res.json(filteredUser);
      });
    }
  )(req, res, next);
});

// 로그아웃
router.post("/logout", (req, res) => {
  try {
    req.logOut();
    req.session.destroy();
    res.send("로그아웃 성공");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;

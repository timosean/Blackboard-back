const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();

// 학생 회원가입
router.post("/", async (req, res) => {
  try {
    const exUser = await db.Student.findOne({
      where: {
        userID: req.body.userID,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.Student.create({
      userID: req.body.userID,
      password: hashedPassword,
      idNum: req.body.idNum,
      userName: req.body.userName,
      userJob: req.body.userJob,
    });

    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return res.status(403).send(e);
  }
});

// 로그인
router.post("/login", (req, res) => {});

// 로그아웃
router.post("logout", (req, res) => {});

module.exports = router;

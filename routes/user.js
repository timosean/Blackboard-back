const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();

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
router.post("/login", (req, res) => {});

// 로그아웃
router.post("logout", (req, res) => {});

module.exports = router;

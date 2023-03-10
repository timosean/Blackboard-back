const express = require("express");
const router = express.Router();
const db = require("../models");

// 존재하는 모든 강의 목록 조회 (공통)
router.get("/", async (req, res) => {
  try {
    const allLectures = await db.Lecture.findAll();
    return res.json(allLectures);
  } catch (e) {
    console.error(e);
  }
});

// 자신의 강의 조회 (교수)
router.get("/professor", (req, res) => {});

// 수강신청한 강의 조회 (학생)
router.get("/student", (req, res) => {});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../models");

// 강의 등록(교수)
router.post("/professor", async (req, res) => {
  try {
    const exLecture = await db.Lecture.findOne({
      where: {
        id: req.body.id,
      },
    });
    if (exLecture) {
      return res.status(403).send("이미 등록된 코스번호입니다.");
    }

    const newLecture = {
      id: req.body.lectureID,
      name: req.body.name,
      professorID: req.body.profID,
    };

    await db.Lecture.create(newLecture);
    return res.status(200).json(newLecture);
  } catch (e) {
    console.error(e);
  }
});

// 수강 신청(학생)
router.post("/student", (req, res) => {});

module.exports = router;

const passport = require("passport");
const db = require("../models");
const localStudent = require("./localStudent");
const localProfessor = require("./localProfessor");

// 서버쪽의 부담을 최소화하려고 최소한의 데이터만 저장하려는 목적이다.
// 사용자가 로그인을 하면 정보를 세션(서버 쪽 메모리)에 저장한다.

module.exports = () => {
  // Serialize
  // 서버쪽에 [{id: 3, cookie: 'asdfasdf'}]와 같은 정보 저장.
  // 여기서 cookie는 프론트 단으로 보내준다.
  passport.serializeUser((user, done) => {
    return done(null, user.userID);
  });

  // 프론트에서 'asdfasdf'라는 cookie를 보내줬을 때, id가 3이라는 정보 밖에 모른다.
  // 따라서, id가 3이라는 정보로 해당 유저의 정보를 되찾는 과정을 deserialize라고 한다.
  // 되찾은 유저 정보는 req.user에 저장된다.
  passport.deserializeUser(async (userID, done) => {
    try {
      const user = await db.Student.findOne({
        where: { userID },
      });
      if (user) return done(null, user);
      else
        return done(
          null,
          await db.Professor.findOne({
            where: { userID },
          })
        );
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  // 전략을 연결한다
  localStudent();
  localProfessor();
};

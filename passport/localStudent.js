const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    "localStudent",
    new LocalStrategy(
      {
        usernameField: "userID",
        passwordField: "password",
      },
      async (userID, password, done) => {
        try {
          const user = await db.Student.findOne({
            where: { userID },
          });
          if (!user) {
            return done(null, false, {
              reason: "존재하지 않는 학생 계정입니다.",
            });
          }

          // 프론트에서 보낸 패스워드와 DB에 저장된 패스워드를 비교
          const result = await bcrypt.compare(password, user.password);
          console.log("비밀번호 비교 결과: ", result);
          if (result) return done(null, user);
          return done(null, false, { reason: "비밀번호가 틀립니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
